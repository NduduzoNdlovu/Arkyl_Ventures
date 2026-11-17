# Arkyl Ventures — V2 Patch Installation

## Release

**V2 — Dedicated Public Pages & Service Experiences**

This patch is built against the original project with `Arkyl-V1-Foundation.patch` already applied. Apply V1 first, then V2. Do not apply V2 directly to the untouched original project.

## Included

- Dedicated About, Portfolio, Technology & IT, Business Services and Contact pages.
- Individual service detail routes for the initial technology and business service catalogue.
- Shop landing page and dedicated category experiences for Technology & IT, Smartphones & iPhones, Home Appliances, and Furniture & Lifestyle.
- Privacy Information and Terms & Conditions interim notice pages, so the existing footer links resolve.
- Shared page-hero and content-card components using the existing Arkyl design system.
- Updated header, footer and homepage links to use the dedicated routes.
- Responsive layouts using the existing dark teal / mint brand palette and existing background effects.

## Important scope notes

- This is the public-experience phase. It does not yet implement the database-driven service administration described in the master prompt; that is a later phase.
- Shop category pages intentionally show an empty catalogue state until real products are published. No sample products, prices, stock or customer reviews are fabricated.
- The Contact page is currently an information and navigation page. A working enquiry submission workflow will be connected when the request/API workflow is implemented.
- Privacy and terms pages are clearly marked as interim notices, not final legal policies. They must be reviewed and completed before enabling customer accounts, personal-data collection, checkout or online payments.
- No Prisma schema, migration, database table, dependency or environment file is changed by this patch.

## 1. Back up the project

Open Command Prompt in:

```cmd
C:\Users\Nduduzo_Ndlovu\Documents\My Sites\Arkyl Ventures
```

If the project uses Git, commit the working V1 state first:

```cmd
git status
git add .
git commit -m "Backup before Arkyl V2"
```

If you are not using Git, make a full copy of the project folder before continuing.

## 2. Put the patch in the project

Create a `patches` folder if it does not already exist, then copy `Arkyl-V2-Public-Experiences.patch` into it.

```cmd
mkdir patches
```

If Command Prompt says the folder already exists, continue.

## 3. Check and apply V2

```cmd
git apply --check .\patches\Arkyl-V2-Public-Experiences.patch
```

Only if that command completes without errors, apply it:

```cmd
git apply .\patches\Arkyl-V2-Public-Experiences.patch
```

Do not use `git apply --reject` or manually force a partially applied patch. If the check fails, stop and send the full error output.

## 4. Validate the application

Run:

```cmd
npx tsc --noEmit
npm run build
```

The production build runs `prisma generate` as part of the existing project script. No database migration is required for V2.

## 5. Test these routes locally

Start the site:

```cmd
npm run dev
```

Open each route in the browser:

- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/portfolio`
- `http://localhost:3000/technology-it`
- `http://localhost:3000/business-services`
- `http://localhost:3000/services/it-support`
- `http://localhost:3000/services/website-development`
- `http://localhost:3000/services/business-registration-assistance`
- `http://localhost:3000/shop`
- `http://localhost:3000/shop/technology`
- `http://localhost:3000/shop/smartphones-iphones`
- `http://localhost:3000/shop/home-appliances`
- `http://localhost:3000/shop/furniture-lifestyle`
- `http://localhost:3000/contact`
- `http://localhost:3000/privacy`
- `http://localhost:3000/terms`

Also test the desktop navigation, mobile menu, footer links, page links, and responsive layouts.

## 6. Send back the results

Please send:

1. The complete output of `npx tsc --noEmit`.
2. The complete output of `npm run build`.
3. Any browser errors or screenshots of layout problems.

Do not run `npm audit fix --force`. The current audit endpoint has been intermittently failing due to DNS resolution, and this patch intentionally avoids dependency upgrades.
