-- Additive V3 migration: separate service catalogue from product categories.
CREATE TYPE "ServiceStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

CREATE TABLE "ServiceCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'BriefcaseBusiness',
    "heroImageUrl" TEXT,
    "status" "ServiceStatus" NOT NULL DEFAULT 'DRAFT',
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "requiresQuote" BOOLEAN NOT NULL DEFAULT true,
    "acceptsApplications" BOOLEAN NOT NULL DEFAULT false,
    "startingPrice" DECIMAL(12,2),
    "priceLabel" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ServiceCategory_name_key" ON "ServiceCategory"("name");
CREATE UNIQUE INDEX "ServiceCategory_slug_key" ON "ServiceCategory"("slug");
CREATE INDEX "ServiceCategory_active_sortOrder_idx" ON "ServiceCategory"("active", "sortOrder");
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
CREATE INDEX "Service_status_isVisible_categoryId_idx" ON "Service"("status", "isVisible", "categoryId");
CREATE INDEX "Service_featured_sortOrder_idx" ON "Service"("featured", "sortOrder");
CREATE INDEX "Service_name_idx" ON "Service"("name");

ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey"
FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed the existing V2 public catalogue so the public site remains populated after migration.
INSERT INTO "ServiceCategory" ("id", "name", "slug", "description", "active", "sortOrder", "updatedAt") VALUES
('svc_cat_technology', 'Technology & IT', 'technology-it', 'Technology, IT support and digital solutions.', true, 1, CURRENT_TIMESTAMP),
('svc_cat_business', 'Business Services', 'business-services', 'Practical business setup, administration and support.', true, 2, CURRENT_TIMESTAMP);

INSERT INTO "Service" ("id", "name", "slug", "shortDescription", "description", "icon", "status", "isVisible", "featured", "requiresQuote", "acceptsApplications", "sortOrder", "categoryId", "updatedAt") VALUES
('svc_it_support', 'IT Support', 'it-support', 'Practical technical assistance for workstations, software, user accounts and everyday technology challenges.', 'Practical technical assistance for workstations, software, user accounts and everyday technology challenges.', 'Headphones', 'PUBLISHED', true, true, true, false, 1, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_computer_repairs', 'Computer Repairs', 'computer-repairs', 'Troubleshooting, diagnosis, maintenance and repair support for desktop computers and related equipment.', 'Troubleshooting, diagnosis, maintenance and repair support for desktop computers and related equipment.', 'Wrench', 'PUBLISHED', true, false, true, false, 2, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_laptop_repairs', 'Laptop Repairs', 'laptop-repairs', 'Support for laptop faults, performance issues, upgrades and hardware-related problems.', 'Support for laptop faults, performance issues, upgrades and hardware-related problems.', 'Laptop', 'PUBLISHED', true, false, true, false, 3, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_phone_repairs', 'Phone Repairs', 'phone-repairs', 'Device assessment and repair coordination for common smartphone faults and damage.', 'Device assessment and repair coordination for common smartphone faults and damage.', 'Smartphone', 'PUBLISHED', true, false, true, false, 4, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_hardware_software', 'Hardware & Software Installation', 'hardware-software-installation', 'Installation, configuration and setup of business and personal hardware and software.', 'Installation, configuration and setup of business and personal hardware and software.', 'MonitorCog', 'PUBLISHED', true, false, true, false, 5, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_networking', 'Networking & Connectivity', 'networking-connectivity', 'Network setup, connectivity troubleshooting and practical support for connected environments.', 'Network setup, connectivity troubleshooting and practical support for connected environments.', 'Network', 'PUBLISHED', true, false, true, false, 6, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_website_development', 'Website Development', 'website-development', 'Responsive websites that communicate your offering and give customers a clear way to engage.', 'Responsive websites that communicate your offering and give customers a clear way to engage.', 'Globe2', 'PUBLISHED', true, true, true, false, 7, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_ecommerce', 'Ecommerce Development', 'ecommerce-development', 'Online store experiences designed around your products, customers and operating needs.', 'Online store experiences designed around your products, customers and operating needs.', 'Code2', 'PUBLISHED', true, false, true, false, 8, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_custom_software', 'Custom Software Development', 'custom-software-development', 'Purpose-built applications and digital tools for specific business processes.', 'Purpose-built applications and digital tools for specific business processes.', 'Code2', 'PUBLISHED', true, false, true, false, 9, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_business_systems', 'Business Management Systems', 'business-management-systems', 'Systems that help organise information, workflows and day-to-day business operations.', 'Systems that help organise information, workflows and day-to-day business operations.', 'Workflow', 'PUBLISHED', true, false, true, false, 10, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_domain_hosting', 'Domain Registration & Hosting', 'domain-hosting', 'Guidance with domain names, hosting arrangements and getting your online presence set up.', 'Guidance with domain names, hosting arrangements and getting your online presence set up.', 'Globe2', 'PUBLISHED', true, false, true, false, 11, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_professional_email', 'Professional Email Setup', 'professional-email', 'Business email setup using your domain and the tools your team already works with.', 'Business email setup using your domain and the tools your team already works with.', 'Mail', 'PUBLISHED', true, false, true, false, 12, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_microsoft_365', 'Microsoft 365 Setup', 'microsoft-365', 'Setup assistance for Microsoft 365 accounts, collaboration tools and productivity services.', 'Setup assistance for Microsoft 365 accounts, collaboration tools and productivity services.', 'MonitorCog', 'PUBLISHED', true, false, true, false, 13, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_google_workspace', 'Google Workspace Setup', 'google-workspace', 'Configuration guidance for business email, collaboration and Google Workspace tools.', 'Configuration guidance for business email, collaboration and Google Workspace tools.', 'Users', 'PUBLISHED', true, false, true, false, 14, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_database_api', 'Database & API Development', 'database-api-development', 'Structured data solutions and integrations that help applications exchange information.', 'Structured data solutions and integrations that help applications exchange information.', 'Database', 'PUBLISHED', true, false, true, false, 15, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_it_consulting', 'IT Consulting & Procurement', 'it-consulting-procurement', 'Practical technology guidance to help assess requirements and make informed purchasing decisions.', 'Practical technology guidance to help assess requirements and make informed purchasing decisions.', 'BadgeHelp', 'PUBLISHED', true, false, true, false, 16, 'svc_cat_technology', CURRENT_TIMESTAMP),
('svc_business_registration', 'Business Registration Assistance', 'business-registration-assistance', 'Guidance through the information and administrative steps involved in establishing a business.', 'Guidance through the information and administrative steps involved in establishing a business.', 'Building2', 'PUBLISHED', true, false, true, true, 1, 'svc_cat_business', CURRENT_TIMESTAMP),
('svc_business_startup', 'Business Startup Assistance', 'business-startup-assistance', 'Practical support to help organise early business requirements and plan the next steps.', 'Practical support to help organise early business requirements and plan the next steps.', 'BriefcaseBusiness', 'PUBLISHED', true, false, true, false, 2, 'svc_cat_business', CURRENT_TIMESTAMP),
('svc_business_docs', 'Business Documentation', 'business-documentation', 'Help preparing and organising business documents for day-to-day operations.', 'Help preparing and organising business documents for day-to-day operations.', 'FileText', 'PUBLISHED', true, false, true, false, 3, 'svc_cat_business', CURRENT_TIMESTAMP),
('svc_company_profiles', 'Company Profiles', 'company-profiles', 'Clear, professional company profiles that introduce your business, services and capabilities.', 'Clear, professional company profiles that introduce your business, services and capabilities.', 'ClipboardList', 'PUBLISHED', true, false, true, false, 4, 'svc_cat_business', CURRENT_TIMESTAMP),
('svc_business_admin', 'Business Administration Support', 'business-administration-support', 'Administrative assistance to help keep business information and routine processes organised.', 'Administrative assistance to help keep business information and routine processes organised.', 'Users', 'PUBLISHED', true, false, true, false, 5, 'svc_cat_business', CURRENT_TIMESTAMP),
('svc_business_consulting', 'Business Consulting', 'business-consulting', 'A structured conversation about your business needs, challenges and possible next steps.', 'A structured conversation about your business needs, challenges and possible next steps.', 'BadgeHelp', 'PUBLISHED', true, false, true, false, 6, 'svc_cat_business', CURRENT_TIMESTAMP),
('svc_business_support', 'Business Support', 'business-support', 'Flexible support for practical business tasks, planning and operational requirements.', 'Flexible support for practical business tasks, planning and operational requirements.', 'Workflow', 'PUBLISHED', true, false, true, false, 7, 'svc_cat_business', CURRENT_TIMESTAMP),
('svc_micro_loans', 'Micro Loan Enquiries', 'micro-loan-enquiries', 'An enquiry pathway for people interested in exploring potential financing options, subject to eligibility and assessment.', 'An enquiry pathway for people interested in exploring potential financing options, subject to eligibility and assessment.', 'ShieldCheck', 'PUBLISHED', true, false, true, true, 8, 'svc_cat_business', CURRENT_TIMESTAMP),
('svc_graphic_design', 'Graphic Design & Branding', 'graphic-design-branding', 'Visual identity and communication materials that help present your business consistently.', 'Visual identity and communication materials that help present your business consistently.', 'Palette', 'PUBLISHED', true, false, true, false, 9, 'svc_cat_business', CURRENT_TIMESTAMP),
('svc_business_automation', 'Business Automation', 'business-automation', 'Identify repeatable tasks and explore digital workflows that can reduce manual effort.', 'Identify repeatable tasks and explore digital workflows that can reduce manual effort.', 'Workflow', 'PUBLISHED', true, false, true, false, 10, 'svc_cat_business', CURRENT_TIMESTAMP);
