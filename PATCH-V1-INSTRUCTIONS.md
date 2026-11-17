# Arkyl Ventures V1 — Foundation and Public Homepage

## Scope

This release replaces the unrelated Framer portfolio homepage with the first Arkyl Ventures public-facing experience. It introduces a route-group layout, reusable site header and footer, a shared background-effects component, a responsive homepage, the existing Arkyl dark/green visual identity, and an original local SVG human-robot hero illustration.

## Files changed

- `src/app/page.tsx` — removed; homepage moved into the `(site)` route group.
- `src/app/(site)/layout.tsx` — shared public-site layout.
- `src/app/(site)/page.tsx` — Arkyl Ventures homepage.
- `src/app/globals.css` — replaced template-specific styles with the Arkyl design system and responsive layouts. The original dark background and radial-ring treatment are retained.
- `src/app/layout.tsx` — root metadata and document language.
- `src/components/layout/site-header.tsx` — fixed desktop/mobile navigation.
- `src/components/layout/site-footer.tsx` — shared footer.
- `src/components/site/arkyl-mark.tsx` — reusable AV brand mark.
- `src/components/site/background-effects.tsx` — shared background treatment.
- `public/images/arkyl-human-robot.svg` — original vector hero illustration.

## Apply on Windows PowerShell

1. Back up the entire existing project folder.
2. Extract the patch file into the project root or save it as `Arkyl-V1-Foundation.patch`.
3. Open PowerShell in the folder containing `package.json`.
4. Run:

```powershell
git apply --check .\Arkyl-V1-Foundation.patch
```

5. If the check succeeds, apply it:

```powershell
git apply .\Arkyl-V1-Foundation.patch
```

6. Run the project checks:

```powershell
npm install
npx prisma generate
npx tsc --noEmit
npm run build
```

No database migration is included in V1. Do not reset or recreate the PostgreSQL database.

## Current release boundary

V1 implements the homepage and reusable public layout. Header and footer navigation currently points to homepage sections so those links work in this release. Dedicated pages and database-driven services are introduced in later releases. The Shop feature is a catalogue introduction only; no checkout or payment is enabled in V1.

## Verification status

The archive was inspected and the patch was generated against the uploaded source tree. The archive did not include `node_modules`, and this environment did not have the project's dependencies installed. Therefore a Next.js production build, TypeScript compiler run, browser test and database integration test have **not** been completed. Run the checks above after applying the patch before proceeding to V2.
