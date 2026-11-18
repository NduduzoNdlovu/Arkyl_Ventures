import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata = { title: "Edit service | Arkyl Ventures" };

export default async function EditServicePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string; saved?: string }> }) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const [service, categories] = await Promise.all([
    prisma.service.findUnique({ where: { id } }),
    prisma.serviceCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!service || service.deletedAt) notFound();
  return <>
    <div className="admin-breadcrumb"><Link href="/admin/services"><ArrowLeft size={14} /> Services</Link><span>/</span><span>Edit service</span></div>
    <header className="admin-page-header admin-page-header-compact"><div><span className="admin-eyebrow">SERVICE CATALOGUE</span><h1>Edit {service.name}</h1><p>Update the service details, publication status and public visibility.</p></div></header>
    {query.saved ? <p className="admin-success-alert">Your service changes have been saved.</p> : null}
    {query.error === "publish-first" ? <p className="admin-alert">Set the publication status to Published before making this service visible.</p> : null}
    <ServiceForm service={service} categories={categories} error={query.error === "publish-first" ? undefined : query.error} />
  </>;
}
