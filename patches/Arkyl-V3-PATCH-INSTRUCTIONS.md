# Arkyl Ventures — V3 Patch Installation

## Release

**V3 — Dynamic Services Management**

This patch is built against the supplied latest project ZIP, with V1 and V2 already applied. Do not apply it to the untouched V1 project.

## Included

- New `ServiceCategory` and `Service` Prisma models. The existing product `Category` model is unchanged.
- Additive PostgreSQL migration that creates service tables and seeds the existing 26 V2 services into two service categories, preserving the current public catalogue after migration.
- Database-driven Technology & IT, Business Services, homepage service previews and individual service detail pages.
- Public pages show a service only when its status is `PUBLISHED`, its `isVisible` flag is enabled, and its category is active.
- Administrator sign-in using the existing `AdminUser` table, bcrypt password hashes and NextAuth Credentials.
- A one-time first-super-admin bootstrap script. Existing administrator accounts are never overwritten by the script.
- Service administration: create, edit, draft, publish, show, hide and archive. Archiving keeps the database record; it does not hard-delete it.
- Service category administration: create, activate and deactivate.
- Audit log records for service and category management actions.
- Responsive administration screens using the existing Arkyl dark teal and mint design system.

## Scope notes

- The ZIP supplied for V3 did **not** contain an implemented admin login or dashboard, despite the master prompt describing those as existing. V3 therefore adds the minimum secure sign-in and admin shell required to protect service management. It does not attempt to build the complete Phase 7 administration dashboard.
- Service image support in this release is an optional HTTP/HTTPS image URL. It does not upload files or introduce local disk storage. A secure media-storage provider should be selected before adding uploads, especially for production hosting.
- `acceptsApplications` and `requiresQuote` are service configuration flags. Application submission workflows and configurable enquiry forms belong to the later business application phase.
- Existing service records are seeded as published and visible to preserve the V2 public experience. You can hide or archive any service from the admin area after migration.
- No product, order, payment, inventory or customer tables are dropped or reset. No new npm dependency is introduced.

## 1. Back up the current V2 project

Open Command Prompt in:

```cmd
C:\Users\Nduduzo_Ndlovu\Documents\My Sites\Arkyl Ventures
```

If using Git, commit the current working version first:

```cmd
git status
git add .
git commit -m "Backup before Arkyl V3"
```

Otherwise, make a full copy of the project folder.

## 2. Copy and check the patch

Place `Arkyl-V3-Dynamic-Services.patch` inside the project's `patches` folder. Then run:

```cmd
git apply --check .\patches\Arkyl-V3-Dynamic-Services.patch
```

Only if there are no errors, apply it:

```cmd
git apply .\patches\Arkyl-V3-Dynamic-Services.patch
```

Do not use `git apply --reject` or force a partial application.

## 3. Configure the existing `.env`

**Do not replace your existing `.env` file and do not change its working `DATABASE_URL`.** Add the following values if they are missing:

```env
AUTH_SECRET="paste-a-long-random-secret-of-at-least-32-characters"
AUTH_URL="http://localhost:3000"
ADMIN_NAME="Arkyl Administrator"
ADMIN_EMAIL="your-admin-email@example.com"
ADMIN_PASSWORD="use-a-unique-password-at-least-12-characters-long"
```

Keep the bootstrap password private. Do not commit `.env` to Git.

## 4. Generate Prisma Client and apply the migration

Run these commands in order:

```cmd
npx prisma format
npx prisma generate
npx prisma migrate dev
```

The migration is additive. It creates the service tables and inserts the existing public service catalogue. It does not reset the database. Do not run `prisma migrate reset`.

For a production deployment, apply the committed migration with:

```cmd
npx prisma migrate deploy
```

## 5. Create the first super administrator

Run:

```cmd
npm run db:seed-admin
```

The script creates a `SUPER_ADMIN` only if the configured email does not already exist. If an account already exists, it leaves that account unchanged. Once the account has been created, remove `ADMIN_PASSWORD` from `.env` (keep `AUTH_SECRET`).

## 6. Validate the project

Run:

```cmd
npx tsc --noEmit
npm run build
```

Then start the application:

```cmd
npm run dev
```

## 7. Test the functionality

Public pages:

- `http://localhost:3000/`
- `http://localhost:3000/technology-it`
- `http://localhost:3000/business-services`
- `http://localhost:3000/services`
- `http://localhost:3000/services/category/technology-it`
- `http://localhost:3000/services/it-support`
- `http://localhost:3000/services/website-development`

Administration:

- `http://localhost:3000/admin/login`
- `http://localhost:3000/admin`
- `http://localhost:3000/admin/services`
- `http://localhost:3000/admin/services/new`
- `http://localhost:3000/admin/service-categories`

Check the following:

1. Sign in using the first super administrator account.
2. Create a new service under an active category and save it as a draft. Confirm it does not appear publicly.
3. Change the status to Published but leave public visibility unchecked. Confirm it remains hidden.
4. Enable public visibility. Confirm it appears in its category page and its individual `/services/<slug>` page.
5. Hide it again. Confirm the public listing and direct service URL no longer expose it.
6. Deactivate its category. Confirm all services in that category are hidden publicly.
7. Archive a service and confirm its record remains in the admin list but is not public.
8. Confirm service/category changes create audit log entries.
9. Sign out and confirm `/admin` redirects to `/admin/login`.

## 8. Send back the results

Please send the complete output of:

- `npx tsc --noEmit`
- `npm run build`

Also send any browser or migration errors. Do not run `npm audit fix --force` as part of this patch.
