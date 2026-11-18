import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "Administrator sign in | Arkyl Ventures" };

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin");

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <Link href="/" className="admin-auth-brand">
          <span>AV</span>
          <strong>
            ARKYL <em>VENTURES</em>
          </strong>
        </Link>
        <div className="admin-auth-heading">
          <span className="admin-eyebrow">SECURE ADMINISTRATION</span>
          <h1>Welcome back.</h1>
          <p>
            Sign in to manage Arkyl Ventures services and website visibility.
          </p>
        </div>
        <LoginForm />
        <Link href="/" className="admin-auth-back">
          <ArrowLeft size={14} /> Return to the public website
        </Link>
      </section>
    </main>
  );
}
