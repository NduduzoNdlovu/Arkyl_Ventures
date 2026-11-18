import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata = { title: "Create a service | Arkyl Ventures" };

export default async function NewServicePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const categories = await prisma.serviceCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  return (
    <>
      <div className="admin-breadcrumb">
        <Link href="/admin/services">
          <ArrowLeft size={14} /> Services
        </Link>
        <span>/</span>
        <span>New service</span>
      </div>
      <header className="admin-page-header admin-page-header-compact">
        <div>
          <span className="admin-eyebrow">SERVICE CATALOGUE</span>
          <h1>Create a service</h1>
          <p>
            Add a service to the database. It will not appear publicly unless
            you publish and show it.
          </p>
        </div>
      </header>
      {categories.length ? (
        <ServiceForm categories={categories} error={params.error} />
      ) : (
        <section className="admin-panel admin-empty-state">
          <h2>Create a service category first</h2>
          <p>
            Services must belong to a category. Add a category before creating
            your first service.
          </p>
          <Link
            className="admin-primary-button"
            href="/admin/service-categories"
          >
            Manage service categories
          </Link>
        </section>
      )}
    </>
  );
}
