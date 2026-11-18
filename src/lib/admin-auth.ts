import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentAdmin() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.adminUser.findFirst({
    where: { id: session.user.id, active: true },
    select: { id: true, name: true, email: true, role: true },
  });
}

export async function requireAdmin(allowedRoles?: UserRole[]) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  if (allowedRoles && !allowedRoles.includes(admin.role)) redirect("/admin?access=denied");
  return admin;
}
