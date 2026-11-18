import Link from "next/link";
import { ArrowUpRight, Eye, Layers3, Plus, Settings2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Administration | Arkyl Ventures" };

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ access?: string }>;
}) {
  const params = await searchParams;
  const [total, published, hidden, drafts, categories] = await Promise.all([
    prisma.service.count({ where: { deletedAt: null } }),
    prisma.service.count({
      where: { status: "PUBLISHED", isVisible: true, deletedAt: null },
    }),
    prisma.service.count({
      where: { status: "PUBLISHED", isVisible: false, deletedAt: null },
    }),
    prisma.service.count({ where: { status: "DRAFT", deletedAt: null } }),
    prisma.serviceCategory.count({ where: { active: true } }),
  ]);

  return (
    <>
      <header className="admin-page-header">
        <div>
          <span className="admin-eyebrow">OVERVIEW</span>
          <h1>Services workspace</h1>
          <p>
            Manage the services customers can discover on the Arkyl Ventures
            website.
          </p>
        </div>
        <Link
          className="admin-primary-button admin-header-action"
          href="/admin/services/new"
        >
          <Plus size={16} /> Add service
        </Link>
      </header>
      {params.access === "denied" ? (
        <p className="admin-alert" role="alert">
          Your account does not have permission to perform that action.
        </p>
      ) : null}
      <section className="admin-stat-grid" aria-label="Service overview">
        <article className="admin-stat-card">
          <span>Total services</span>
          <strong>{total}</strong>
          <small>Across all service categories</small>
        </article>
        <article className="admin-stat-card">
          <span>Published & visible</span>
          <strong>{published}</strong>
          <small>Currently displayed publicly</small>
        </article>
        <article className="admin-stat-card">
          <span>Published but hidden</span>
          <strong>{hidden}</strong>
          <small>Not displayed on the website</small>
        </article>
        <article className="admin-stat-card">
          <span>Draft services</span>
          <strong>{drafts}</strong>
          <small>Not yet published</small>
        </article>
      </section>
      <section className="admin-panel admin-quick-panel">
        <div className="admin-panel-heading">
          <div>
            <span className="admin-eyebrow">MANAGEMENT</span>
            <h2>Manage your service catalogue</h2>
          </div>
          <span className="admin-panel-icon">
            <Layers3 size={19} />
          </span>
        </div>
        <div className="admin-quick-links">
          <Link href="/admin/services">
            <Settings2 size={19} />
            <span>
              <strong>Manage services</strong>
              <small>Create, edit, publish, hide or archive services</small>
            </span>
            <ArrowUpRight size={17} />
          </Link>
          <Link href="/admin/service-categories">
            <Layers3 size={19} />
            <span>
              <strong>Manage categories</strong>
              <small>
                {categories} active categories · Add or deactivate categories
              </small>
            </span>
            <ArrowUpRight size={17} />
          </Link>
          <Link href="/admin/services/new">
            <Plus size={19} />
            <span>
              <strong>Create a service</strong>
              <small>Add a new service without changing application code</small>
            </span>
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="admin-note">
          <Eye size={15} /> A service appears publicly only when its status is
          Published, its visibility is enabled and its category is active.
        </p>
      </section>
    </>
  );
}
