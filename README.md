# ARKYL VENTURES

A Next.js + TypeScript business website and commerce platform foundation for ARKYL VENTURES.

## Requirements
- Node.js 20.9 or newer
- PostgreSQL 15 or newer
- npm

## Setup (Windows PowerShell)
1. Install Node.js LTS and PostgreSQL.
2. Open this folder in VS Code.
3. Copy `.env.example` to `.env` and update `DATABASE_URL`, `AUTH_SECRET`, and the initial admin credentials.
4. Open the VS Code terminal and run:

```powershell
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed-admin
npm run dev
```

5. Open http://localhost:3000. The initial administrator is created by the bootstrap script; remove `ADMIN_PASSWORD` from `.env` afterwards.

## Current foundation
- ARKYL dark technology visual identity and responsive homepage.
- PostgreSQL Prisma schema for administrators, customers, products, categories, images, service requests, attachments, notes, quotations, orders, payments, inventory movements and audit logs.
- Database health endpoint at `/api/health`.
- Public website pages, a database-driven service directory and a protected service-management area at `/admin`.

## Important before production
The service-management phase is implemented, but the overall platform is not yet a production-ready store. Do not accept real payments or public uploads until the relevant customer workflows, validated APIs, secure object storage, payment-provider verification, email delivery, rate limiting, backups and end-to-end tests have been implemented. Keep secrets out of source control.

## V3 — Dynamic service management
V3 adds a separate database-backed service catalogue (`ServiceCategory` and `Service`) without changing the existing product `Category` model. The public Technology & IT, Business Services, homepage and individual service pages now read published and visible services from PostgreSQL.

The focused administration area is available at `/admin`. It includes credentials-based administrator sign-in, service creation/editing, publication and visibility controls, safe archiving, service category creation/activation and audit-log entries. The first administrator is created using the one-time bootstrap script described in `patches/Arkyl-V3-PATCH-INSTRUCTIONS.md`.


## V4 — Motion & Experience System

V4 introduces a reusable Motion-powered interaction layer while retaining the existing Arkyl brand, colour palette, typography, navigation, page layouts, business logic and database structure.

- Global, restrained route transitions across public and administrator pages.
- Reusable scroll-reveal component with reduced-motion support.
- Automatically moving technology and published-service marquees below the homepage hero. Marquees pause on hover/focus and become static for reduced-motion preferences.
- A layered, automatically rotating hero capability showcase populated only from published, visible services in active categories. It does not invent portfolio case studies or change the portfolio database.
- Responsive styling for desktop, tablet and mobile.
- No Prisma schema changes or database migrations.

Install the Motion dependency with `npm install` after applying the V4 patch so npm updates the existing lockfile.
