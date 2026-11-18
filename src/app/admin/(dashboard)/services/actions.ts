"use server";

import { Prisma } from "@prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const serviceSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().max(140),
  shortDescription: z.string().trim().min(10).max(240),
  description: z.string().trim().min(20).max(6000),
  categoryId: z.string().trim().min(1),
  icon: z.string().trim().max(60),
  heroImageUrl: z.string().trim().max(500).refine((value) => !value || /^https?:\/\//i.test(value), "Use an http or https image URL."),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  startingPrice: z.string().trim().refine((value) => !value || /^\d{1,10}(\.\d{1,2})?$/.test(value), "Enter a valid amount with up to two decimal places."),
  priceLabel: z.string().trim().max(80),
  sortOrder: z.string().trim().refine((value) => /^\d{1,4}$/.test(value), "Display order must be a whole number."),
  seoTitle: z.string().trim().max(160),
  seoDescription: z.string().trim().max(320),
});

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function slugify(input: string) {
  return input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 140);
}

function readServiceForm(formData: FormData) {
  return serviceSchema.safeParse({
    name: value(formData, "name"),
    slug: value(formData, "slug"),
    shortDescription: value(formData, "shortDescription"),
    description: value(formData, "description"),
    categoryId: value(formData, "categoryId"),
    icon: value(formData, "icon") || "BriefcaseBusiness",
    heroImageUrl: value(formData, "heroImageUrl"),
    status: value(formData, "status") || "DRAFT",
    startingPrice: value(formData, "startingPrice"),
    priceLabel: value(formData, "priceLabel"),
    sortOrder: value(formData, "sortOrder") || "0",
    seoTitle: value(formData, "seoTitle"),
    seoDescription: value(formData, "seoDescription"),
  });
}

function revalidateServicePages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/technology-it");
  revalidatePath("/business-services");
  revalidatePath("/admin");
  revalidatePath("/admin/services");
  if (slug) revalidatePath(`/services/${slug}`);
}

export async function createService(formData: FormData) {
  const admin = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  const parsed = readServiceForm(formData);
  if (!parsed.success) redirect("/admin/services/new?error=validation");
  const data = parsed.data;
  const slug = slugify(data.slug || data.name);
  if (!slug) redirect("/admin/services/new?error=validation");
  const category = await prisma.serviceCategory.findUnique({ where: { id: data.categoryId } });
  if (!category) redirect("/admin/services/new?error=category");
  const status = data.status;
  const visible = formData.get("isVisible") === "on" && status === "PUBLISHED";

  try {
    const service = await prisma.$transaction(async (tx) => {
      const created = await tx.service.create({
        data: {
          name: data.name,
          slug,
          shortDescription: data.shortDescription,
          description: data.description,
          categoryId: data.categoryId,
          icon: data.icon,
          heroImageUrl: data.heroImageUrl || null,
          status,
          isVisible: visible,
          featured: formData.get("featured") === "on",
          requiresQuote: formData.get("requiresQuote") === "on",
          acceptsApplications: formData.get("acceptsApplications") === "on",
          startingPrice: data.startingPrice ? new Prisma.Decimal(data.startingPrice) : null,
          priceLabel: data.priceLabel || null,
          sortOrder: Number(data.sortOrder),
          seoTitle: data.seoTitle || null,
          seoDescription: data.seoDescription || null,
        },
      });
      await tx.auditLog.create({ data: { adminId: admin.id, action: "SERVICE_CREATED", entityType: "Service", entityId: created.id, metadata: { name: created.name, slug: created.slug } } });
      return created;
    });
    revalidateServicePages(service.slug);
    redirect(`/admin/services/${service.id}?saved=1`);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    redirect("/admin/services/new?error=slug");
  }
}

export async function updateService(formData: FormData) {
  const admin = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  const id = value(formData, "id");
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing || existing.deletedAt) redirect("/admin/services?error=not-found");
  const parsed = readServiceForm(formData);
  if (!parsed.success) redirect(`/admin/services/${id}?error=validation`);
  const data = parsed.data;
  const slug = slugify(data.slug || data.name);
  if (!slug) redirect(`/admin/services/${id}?error=validation`);
  const category = await prisma.serviceCategory.findUnique({ where: { id: data.categoryId } });
  if (!category) redirect(`/admin/services/${id}?error=category`);
  const status = data.status;
  const visible = formData.get("isVisible") === "on" && status === "PUBLISHED";

  try {
    const service = await prisma.$transaction(async (tx) => {
      const updated = await tx.service.update({
        where: { id },
        data: {
          name: data.name,
          slug,
          shortDescription: data.shortDescription,
          description: data.description,
          categoryId: data.categoryId,
          icon: data.icon,
          heroImageUrl: data.heroImageUrl || null,
          status,
          isVisible: visible,
          featured: formData.get("featured") === "on",
          requiresQuote: formData.get("requiresQuote") === "on",
          acceptsApplications: formData.get("acceptsApplications") === "on",
          startingPrice: data.startingPrice ? new Prisma.Decimal(data.startingPrice) : null,
          priceLabel: data.priceLabel || null,
          sortOrder: Number(data.sortOrder),
          seoTitle: data.seoTitle || null,
          seoDescription: data.seoDescription || null,
        },
      });
      await tx.auditLog.create({ data: { adminId: admin.id, action: "SERVICE_UPDATED", entityType: "Service", entityId: updated.id, metadata: { name: updated.name, slug: updated.slug } } });
      return updated;
    });
    revalidateServicePages(existing.slug);
    revalidateServicePages(service.slug);
    redirect(`/admin/services/${service.id}?saved=1`);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    redirect(`/admin/services/${id}?error=slug`);
  }
}

export async function toggleServiceVisibility(formData: FormData) {
  const admin = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  const id = value(formData, "id");
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service || service.deletedAt) redirect("/admin/services?error=not-found");
  if (service.status !== "PUBLISHED" && !service.isVisible) redirect(`/admin/services/${id}?error=publish-first`);
  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.service.update({ where: { id }, data: { isVisible: !service.isVisible } });
    await tx.auditLog.create({ data: { adminId: admin.id, action: result.isVisible ? "SERVICE_SHOWN" : "SERVICE_HIDDEN", entityType: "Service", entityId: id, metadata: { name: service.name } } });
    return result;
  });
  revalidateServicePages(updated.slug);
}

export async function archiveService(formData: FormData) {
  const admin = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  const id = value(formData, "id");
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service || service.deletedAt) redirect("/admin/services?error=not-found");
  await prisma.$transaction(async (tx) => {
    await tx.service.update({ where: { id }, data: { status: "ARCHIVED", isVisible: false } });
    await tx.auditLog.create({ data: { adminId: admin.id, action: "SERVICE_ARCHIVED", entityType: "Service", entityId: id, metadata: { name: service.name } } });
  });
  revalidateServicePages(service.slug);
  redirect("/admin/services?archived=1");
}

export async function createServiceCategory(formData: FormData) {
  const admin = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  const name = value(formData, "name");
  const description = value(formData, "description");
  const slug = slugify(value(formData, "slug") || name);
  if (name.length < 2 || name.length > 100 || !slug || description.length > 500) redirect("/admin/service-categories?error=validation");
  try {
    const category = await prisma.$transaction(async (tx) => {
      const created = await tx.serviceCategory.create({ data: { name, slug, description: description || null } });
      await tx.auditLog.create({ data: { adminId: admin.id, action: "SERVICE_CATEGORY_CREATED", entityType: "ServiceCategory", entityId: created.id, metadata: { name: created.name, slug: created.slug } } });
      return created;
    });
    revalidatePath("/admin/service-categories");
    redirect(`/admin/service-categories?created=${encodeURIComponent(category.name)}`);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    redirect("/admin/service-categories?error=duplicate");
  }
}

export async function toggleServiceCategory(formData: FormData) {
  const admin = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  const id = value(formData, "id");
  const category = await prisma.serviceCategory.findUnique({ where: { id } });
  if (!category) redirect("/admin/service-categories?error=not-found");
  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.serviceCategory.update({ where: { id }, data: { active: !category.active } });
    await tx.auditLog.create({ data: { adminId: admin.id, action: result.active ? "SERVICE_CATEGORY_ACTIVATED" : "SERVICE_CATEGORY_DEACTIVATED", entityType: "ServiceCategory", entityId: id, metadata: { name: category.name } } });
    return result;
  });
  revalidatePath("/admin/service-categories");
  revalidatePath("/technology-it");
  revalidatePath("/business-services");
}
