"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        redirectTo: "/admin",
      });
      if (!result || result.error) {
        setError("The email address or password is incorrect, or this account is inactive.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("We could not sign you in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <label htmlFor="admin-email">Email address</label>
      <input id="admin-email" type="email" autoComplete="username" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} />
      <label htmlFor="admin-password">Password</label>
      <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
      {error ? <p className="admin-form-error" role="alert">{error}</p> : null}
      <button className="admin-primary-button" type="submit" disabled={submitting}>
        <LockKeyhole size={16} /> {submitting ? "Signing in…" : "Sign in securely"} <ArrowRight size={16} />
      </button>
    </form>
  );
}
