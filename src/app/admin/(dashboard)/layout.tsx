import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <span>AV</span>
          <strong>
            ARKYL <em>VENTURES</em>
          </strong>
        </Link>
        <div className="admin-sidebar-label">WORKSPACE</div>
        <nav className="admin-sidebar-nav" aria-label="Administration">
          <Link href="/admin">Overview</Link>
          <Link href="/admin/services">Services</Link>
          <Link href="/admin/service-categories">Service categories</Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="admin-user-initial">
            {admin.name.slice(0, 1).toUpperCase()}
          </span>
          <span className="admin-user-details">
            <strong>{admin.name}</strong>
            <small>{admin.role.replace("_", " ")}</small>
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button className="admin-signout" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="admin-main">
        <ScrollReveal className="admin-motion-content">{children}</ScrollReveal>
      </main>
    </div>
  );
}
