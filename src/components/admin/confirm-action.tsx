"use client";

import type { ReactNode } from "react";

export function ConfirmAction({ action, id, children, className }: { action: (formData: FormData) => void | Promise<void>; id: string; children: ReactNode; className?: string }) {
  return <form action={action} onSubmit={(event) => { if (!window.confirm("Archive this service? It will be removed from the public website, but its record will be kept.")) event.preventDefault(); }}>
    <input type="hidden" name="id" value={id} />
    <button className={className ?? "admin-text-button admin-danger-text"} type="submit">{children}</button>
  </form>;
}
