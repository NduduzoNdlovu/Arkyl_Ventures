import { Layers3 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  createServiceCategory,
  toggleServiceCategory,
} from "../services/actions";

export const metadata = { title: "Service categories | Arkyl Ventures" };

export default async function ServiceCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; created?: string }>;
}) {
  const params = await searchParams;
  const categories = await prisma.serviceCategory.findMany({
    include: { _count: { select: { services: true } } },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return (
    <>
      <header className="admin-page-header">
        <div>
          <span className="admin-eyebrow">SERVICE STRUCTURE</span>
          <h1>Service categories</h1>
          <p>
            Group related services and control whether a category is available
            on the public website.
          </p>
        </div>
      </header>
      {params.created ? (
        <p className="admin-success-alert">
          Category “{params.created}” was created.
        </p>
      ) : null}
      {params.error ? (
        <p className="admin-alert">
          {params.error === "duplicate"
            ? "A category with that name or URL slug already exists."
            : "Please enter a valid category name and description."}
        </p>
      ) : null}
      <div className="admin-category-layout">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-eyebrow">EXISTING CATEGORIES</span>
              <h2>Categories</h2>
            </div>
            <span className="admin-panel-icon">
              <Layers3 size={19} />
            </span>
          </div>
          <div className="admin-category-list">
            {categories.map((category) => (
              <article key={category.id} className="admin-category-row">
                <div>
                  <strong>{category.name}</strong>
                  <small>
                    /{category.slug} · {category._count.services} services
                  </small>
                  {category.description ? <p>{category.description}</p> : null}
                </div>
                <div className="admin-category-actions">
                  <span
                    className={`admin-status ${category.active ? "status-visible" : "status-hidden"}`}
                  >
                    {category.active ? "Active" : "Inactive"}
                  </span>
                  <form action={toggleServiceCategory}>
                    <input type="hidden" name="id" value={category.id} />
                    <button className="admin-secondary-button" type="submit">
                      {category.active ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                </div>
              </article>
            ))}
            {categories.length === 0 ? (
              <p className="admin-empty-cell">No service categories yet.</p>
            ) : null}
          </div>
        </section>
        <section className="admin-panel admin-category-create">
          <span className="admin-eyebrow">ADD CATEGORY</span>
          <h2>Create a category</h2>
          <form action={createServiceCategory} className="admin-stacked-form">
            <label className="admin-field">
              Category name
              <input
                name="name"
                required
                minLength={2}
                maxLength={100}
                placeholder="e.g. Financial & Credit Solutions"
              />
            </label>
            <label className="admin-field">
              URL slug
              <input
                name="slug"
                maxLength={140}
                placeholder="Generated from category name if blank"
              />
            </label>
            <label className="admin-field">
              Description
              <textarea
                name="description"
                rows={4}
                maxLength={500}
                placeholder="Briefly describe this service category."
              />
            </label>
            <button className="admin-primary-button" type="submit">
              Create category
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
