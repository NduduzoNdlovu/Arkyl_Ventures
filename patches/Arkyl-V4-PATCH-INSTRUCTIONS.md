# Arkyl Ventures — V4 Patch Installation

## Release

**V4 — Motion & Experience System**

This patch is built against the supplied `Arkyl Ventures-v3(2).zip` project. It assumes V1, V2 and V3 are already present. Do not apply it to an earlier project snapshot.

## Design direction

V4 follows the agreed hybrid direction: premium, experimental and subtly futuristic, with a high level of motion that does not compromise usability.

The existing visual identity is retained:
- Dark teal background and existing surface colours.
- Existing mint accent and typography.
- Existing logo, navigation, footer, page layouts and content.
- Existing services, authentication, Prisma models and database behaviour.

## Included

- Motion for React as the reusable animation engine.
- Global route transitions across public and administrator routes.
- A reusable `ScrollReveal` component with reduced-motion support.
- An automatically scrolling technology/skills marquee and a published-services marquee directly below the homepage hero.
- A layered hero showcase that automatically selects and rotates through published, visible services from active categories.
- The existing robot illustration remains as a subdued atmospheric background behind the cards.
- Cards link to their actual service pages. The active card pauses its rotation while hovered or keyboard-focused.
- Responsive layouts and reduced-motion handling.
- No database schema changes and no migrations.

## Important portfolio note

The V3 database does not contain a Project/Portfolio model, and the current portfolio page intentionally does not claim that sample projects are completed client work. Therefore, the V4 hero cards use real published services and present them as capability previews. They are not labelled as completed client projects. A proper project-management/portfolio module can later populate the same visual treatment with approved case studies.

## 1. Back up V3

Open Command Prompt in your existing Arkyl project directory.

If the project uses Git:

```cmd
git status
git add .
git commit -m "Backup before Arkyl V4"
```

Otherwise, create a complete copy of the project folder.

## 2. Check and apply the patch

Copy `Arkyl-V4-Motion-Experience.patch` into the project's `patches` folder, then run:

```cmd
git apply --check .\patches\Arkyl-V4-Motion-Experience.patch
```

Only if the check succeeds, apply it:

```cmd
git apply .\patches\Arkyl-V4-Motion-Experience.patch
```

Do not use `git apply --reject` or force a partial application.

## 3. Install the Motion dependency

The patch adds Motion to `package.json`. Run:

```cmd
npm install
```

This installs Motion and synchronises the existing `package-lock.json`. Use `npm install`, not `npm ci`, for this first install because the lockfile is refreshed by npm.

## 4. Verify the application

No Prisma migration or database reset is required.

Run:

```cmd
npx prisma generate
npx tsc --noEmit
npm run build
```

Then start the application:

```cmd
npm run dev
```

Review the homepage on desktop and mobile, then test:
- Hero cards rotate automatically and link to their actual service pages.
- The technology and services marquees scroll continuously.
- Marquees pause when hovered or keyboard-focused.
- Navigation and admin pages remain usable.
- Forms, links and buttons still work.
- Reduced-motion preference disables continuous marquee movement and non-essential motion.

## 5. Rollback

If you use Git, revert the V4 commit or restore the backup. V4 does not modify the database, so there is no database rollback or migration reversal.
