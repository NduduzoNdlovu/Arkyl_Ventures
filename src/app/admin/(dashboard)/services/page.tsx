import Link from "next/link";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { archiveService, toggleServiceVisibility } from "./actions";
import { ConfirmAction } from "@/components/admin/confirm-action";

export const metadata = { title: "Manage services | Arkyl Ventures" };

export default async function ServicesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    archived?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const status = ["DRAFT", "PUBLISHED", "ARCHIVED"].includes(
    params.status ?? "",
  )
    ? (params.status as "DRAFT" | "PUBLISHED" | "ARCHIVED")
    : undefined;
  const services = await prisma.service.findMany({
    where: {
      deletedAt: null,
      ...(status ? { status } : {}),
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { slug: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { category: true },
    orderBy: [
      { category: { sortOrder: "asc" } },
      { sortOrder: "asc" },
      { name: "asc" },
    ],
  });

  return (
    <>
      <header className="admin-page-header">
        <div>
          <span className="admin-eyebrow">SERVICE CATALOGUE</span>
          <h1>Services</h1>
          <p>
            Create and control the services shown across your public website.
          </p>
        </div>
        <Link
          className="admin-primary-button admin-header-action"
          href="/admin/services/new"
        >
          <Plus size={16} /> Add service
        </Link>
      </header>
      {params.archived ? (
        <p className="admin-success-alert">
          The service has been archived and is no longer public.
        </p>
      ) : null}
      {params.error ? (
        <p className="admin-alert">The requested service could not be found.</p>
      ) : null}
      <section className="admin-panel">
        <form className="admin-filter-bar" method="get">
          <label className="admin-search-field">
            <Search size={16} />
            <input
              name="q"
              defaultValue={query}
              placeholder="Search services by name or slug"
            />
          </label>
          <select name="status" defaultValue={status ?? "ALL"}>
            <option value="ALL">All statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <button className="admin-secondary-button" type="submit">
            Filter
          </button>
        </form>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Category</th>
                <th>Publication</th>
                <th>Website visibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>
                    <strong>{service.name}</strong>
                    <small>/{service.slug}</small>
                  </td>
                  <td>{service.category.name}</td>
                  <td>
                    <span
                      className={`admin-status status-${service.status.toLowerCase()}`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`admin-status ${service.status === "PUBLISHED" && service.isVisible && service.category.active ? "status-visible" : "status-hidden"}`}
                    >
                      {service.status === "PUBLISHED" &&
                      service.isVisible &&
                      service.category.active
                        ? "Visible"
                        : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <Link href={`/admin/services/${service.id}`}>
                        Edit <ArrowUpRight size={13} />
                      </Link>
                      {service.status === "PUBLISHED" ? (
                        <form action={toggleServiceVisibility}>
                          <input type="hidden" name="id" value={service.id} />
                          <button type="submit">
                            {service.isVisible ? "Hide" : "Show"}
                          </button>
                        </form>
                      ) : null}
                      {service.status !== "ARCHIVED" ? (
                        <ConfirmAction action={archiveService} id={service.id}>
                          Archive
                        </ConfirmAction>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-empty-cell">
                    No services match your filters. Create a service or change
                    the search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="admin-table-footer">
          Showing {services.length} service{services.length === 1 ? "" : "s"}.
          Archived records are retained and can be restored by editing their
          status.
        </div>
      </section>
    </>
  );
}
