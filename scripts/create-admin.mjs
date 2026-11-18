import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

try {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Arkyl Administrator";

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file first.");
  }
  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`An administrator account already exists for ${email}. No changes were made.`);
  } else {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.adminUser.create({
      data: { name, email, passwordHash, role: "SUPER_ADMIN", active: true },
    });
    console.log(`Super administrator created for ${email}. Remove ADMIN_PASSWORD from .env after this step.`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "Administrator bootstrap failed.");
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
