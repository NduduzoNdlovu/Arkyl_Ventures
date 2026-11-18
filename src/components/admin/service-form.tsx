import type { Service, ServiceCategory } from "@prisma/client";
import { createService, updateService } from "@/app/admin/(dashboard)/services/actions";

type ServiceFormProps = {
  service?: Service;
  categories: ServiceCategory[];
  error?: string;
};

export function ServiceForm({ service, categories, error }: ServiceFormProps) {
  const action = service ? updateService : createService;
  return <form action={action} className="admin-form-panel">
    {service ? <input type="hidden" name="id" value={service.id} /> : null}
    {error ? <p className="admin-alert" role="alert">{error === "slug" ? "That URL slug is already in use. Choose a different one." : error === "category" ? "Choose an available service category." : "Please check the required fields and try again."}</p> : null}
    <div className="admin-form-section"><div><span className="admin-eyebrow">SERVICE DETAILS</span><h2>Basic information</h2></div>
      <div className="admin-form-grid">
        <label className="admin-field admin-field-wide">Service name <input name="name" required minLength={2} maxLength={120} defaultValue={service?.name ?? ""} placeholder="e.g. Website Development" /></label>
        <label className="admin-field">URL slug <input name="slug" maxLength={140} defaultValue={service?.slug ?? ""} placeholder="Automatically generated if blank" /></label>
        <label className="admin-field">Service category <select name="categoryId" required defaultValue={service?.categoryId ?? ""}><option value="" disabled>Select a category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}{category.active ? "" : " (inactive)"}</option>)}</select></label>
        <label className="admin-field admin-field-wide">Short description <textarea name="shortDescription" required minLength={10} maxLength={240} rows={2} defaultValue={service?.shortDescription ?? ""} placeholder="A concise description for service cards." /></label>
        <label className="admin-field admin-field-wide">Full description <textarea name="description" required minLength={20} maxLength={6000} rows={6} defaultValue={service?.description ?? ""} placeholder="Explain the service, what it includes and what customers can expect." /></label>
      </div>
    </div>
    <div className="admin-form-section"><div><span className="admin-eyebrow">PRESENTATION</span><h2>Appearance and display</h2></div>
      <div className="admin-form-grid">
        <label className="admin-field">Service icon <select name="icon" defaultValue={service?.icon ?? "BriefcaseBusiness"}>{["BriefcaseBusiness", "Headphones", "Wrench", "Laptop", "Smartphone", "MonitorCog", "Network", "Globe2", "Code2", "Workflow", "Mail", "Users", "Database", "BadgeHelp", "Building2", "FileText", "ClipboardList", "ShieldCheck", "Palette"].map((icon) => <option key={icon} value={icon}>{icon}</option>)}</select></label>
        <label className="admin-field">Service image URL <input name="heroImageUrl" type="url" defaultValue={service?.heroImageUrl ?? ""} placeholder="https://…" /></label>
        <label className="admin-field">Display order <input name="sortOrder" type="number" min="0" max="9999" step="1" defaultValue={service?.sortOrder ?? 0} /></label>
        <label className="admin-field">Starting price (ZAR) <input name="startingPrice" type="number" min="0" step="0.01" defaultValue={service?.startingPrice?.toString() ?? ""} placeholder="Leave blank if quote-based" /></label>
        <label className="admin-field">Price label <input name="priceLabel" maxLength={80} defaultValue={service?.priceLabel ?? ""} placeholder="e.g. From R500" /></label>
      </div>
      <p className="admin-form-hint">The image field accepts an existing image URL. Secure image uploads and managed media storage will be handled as a separate storage capability; this release does not write uploaded files to the server.</p>
    </div>
    <div className="admin-form-section"><div><span className="admin-eyebrow">PUBLICATION</span><h2>Publishing and visibility</h2><p>Publication and visibility are separate controls. Both must be enabled for customers to see this service.</p></div>
      <div className="admin-form-grid">
        <label className="admin-field">Publication status <select name="status" defaultValue={service?.status ?? "DRAFT"}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option><option value="ARCHIVED">Archived</option></select></label>
        <label className="admin-field">SEO title <input name="seoTitle" maxLength={160} defaultValue={service?.seoTitle ?? ""} placeholder="Optional search title" /></label>
        <label className="admin-field admin-field-wide">SEO description <textarea name="seoDescription" rows={2} maxLength={320} defaultValue={service?.seoDescription ?? ""} placeholder="Optional search description" /></label>
      </div>
      <div className="admin-check-grid">
        <label><input type="checkbox" name="isVisible" defaultChecked={service?.isVisible ?? false} /> Visible on the public website</label>
        <label><input type="checkbox" name="featured" defaultChecked={service?.featured ?? false} /> Feature this service</label>
        <label><input type="checkbox" name="requiresQuote" defaultChecked={service?.requiresQuote ?? true} /> Requires a quotation</label>
        <label><input type="checkbox" name="acceptsApplications" defaultChecked={service?.acceptsApplications ?? false} /> Accepts direct applications</label>
      </div>
    </div>
    <div className="admin-form-actions"><a className="admin-secondary-button" href="/admin/services">Cancel</a><button className="admin-primary-button" type="submit">{service ? "Save service changes" : "Create service"}</button></div>
  </form>;
}
