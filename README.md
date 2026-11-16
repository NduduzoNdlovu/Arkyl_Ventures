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
npx prisma migrate dev --name initial_schema
npm run dev
```

5. Open http://localhost:3000.

## Current foundation
- ARKYL dark technology visual identity and responsive homepage.
- PostgreSQL Prisma schema for administrators, customers, products, categories, images, service requests, attachments, notes, quotations, orders, payments, inventory movements and audit logs.
- Database health endpoint at `/api/health`.
- Public route and admin route structure reserved for phased implementation.

## Important before production
This is the initial foundation, not a production-ready store yet. Do not accept real payments or public uploads until authentication, server-side authorization, validated request/product APIs, secure object storage, payment-provider verification, email delivery, rate limiting, backups and end-to-end tests have been implemented. Keep secrets out of source control.
