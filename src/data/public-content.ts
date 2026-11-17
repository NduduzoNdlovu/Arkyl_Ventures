import { Code2, Headphones, Laptop, Network, Smartphone, Wrench, Globe2, Mail, Database, BriefcaseBusiness, FileText, Building2, ClipboardList, Users, BadgeHelp, Palette, Workflow, ShieldCheck, MonitorCog } from "lucide-react";

export const technologyServices = [
  { slug: "it-support", title: "IT Support", description: "Practical technical assistance for workstations, software, user accounts and everyday technology challenges.", icon: Headphones },
  { slug: "computer-repairs", title: "Computer Repairs", description: "Troubleshooting, diagnosis, maintenance and repair support for desktop computers and related equipment.", icon: Wrench },
  { slug: "laptop-repairs", title: "Laptop Repairs", description: "Support for laptop faults, performance issues, upgrades and hardware-related problems.", icon: Laptop },
  { slug: "phone-repairs", title: "Phone Repairs", description: "Device assessment and repair coordination for common smartphone faults and damage.", icon: Smartphone },
  { slug: "hardware-software-installation", title: "Hardware & Software Installation", description: "Installation, configuration and setup of business and personal hardware and software.", icon: MonitorCog },
  { slug: "networking-connectivity", title: "Networking & Connectivity", description: "Network setup, connectivity troubleshooting and practical support for connected environments.", icon: Network },
  { slug: "website-development", title: "Website Development", description: "Responsive websites that communicate your offering and give customers a clear way to engage.", icon: Globe2 },
  { slug: "ecommerce-development", title: "Ecommerce Development", description: "Online store experiences designed around your products, customers and operating needs.", icon: Code2 },
  { slug: "custom-software-development", title: "Custom Software Development", description: "Purpose-built applications and digital tools for specific business processes.", icon: Code2 },
  { slug: "business-management-systems", title: "Business Management Systems", description: "Systems that help organise information, workflows and day-to-day business operations.", icon: Workflow },
  { slug: "domain-hosting", title: "Domain Registration & Hosting", description: "Guidance with domain names, hosting arrangements and getting your online presence set up.", icon: Globe2 },
  { slug: "professional-email", title: "Professional Email Setup", description: "Business email setup using your domain and the tools your team already works with.", icon: Mail },
  { slug: "microsoft-365", title: "Microsoft 365 Setup", description: "Setup assistance for Microsoft 365 accounts, collaboration tools and productivity services.", icon: MonitorCog },
  { slug: "google-workspace", title: "Google Workspace Setup", description: "Configuration guidance for business email, collaboration and Google Workspace tools.", icon: Users },
  { slug: "database-api-development", title: "Database & API Development", description: "Structured data solutions and integrations that help applications exchange information.", icon: Database },
  { slug: "it-consulting-procurement", title: "IT Consulting & Procurement", description: "Practical technology guidance to help assess requirements and make informed purchasing decisions.", icon: BadgeHelp },
];

export const businessServices = [
  { slug: "business-registration-assistance", title: "Business Registration Assistance", description: "Guidance through the information and administrative steps involved in establishing a business.", icon: Building2 },
  { slug: "business-startup-assistance", title: "Business Startup Assistance", description: "Practical support to help organise early business requirements and plan the next steps.", icon: BriefcaseBusiness },
  { slug: "business-documentation", title: "Business Documentation", description: "Help preparing and organising business documents for day-to-day operations.", icon: FileText },
  { slug: "company-profiles", title: "Company Profiles", description: "Clear, professional company profiles that introduce your business, services and capabilities.", icon: ClipboardList },
  { slug: "business-administration-support", title: "Business Administration Support", description: "Administrative assistance to help keep business information and routine processes organised.", icon: Users },
  { slug: "business-consulting", title: "Business Consulting", description: "A structured conversation about your business needs, challenges and possible next steps.", icon: BadgeHelp },
  { slug: "business-support", title: "Business Support", description: "Flexible support for practical business tasks, planning and operational requirements.", icon: Workflow },
  { slug: "micro-loan-enquiries", title: "Micro Loan Enquiries", description: "An enquiry pathway for people interested in exploring potential financing options, subject to eligibility and assessment.", icon: ShieldCheck },
  { slug: "graphic-design-branding", title: "Graphic Design & Branding", description: "Visual identity and communication materials that help present your business consistently.", icon: Palette },
  { slug: "business-automation", title: "Business Automation", description: "Identify repeatable tasks and explore digital workflows that can reduce manual effort.", icon: Workflow },
];

export const shopCategories = [
  { slug: "technology", title: "Technology & IT", description: "Computers, smartphones, accessories, components and connected technology for work and everyday life.", icon: MonitorCog, detail: "A dedicated technology destination for devices, computing equipment and accessories." },
  { slug: "smartphones-iphones", title: "Smartphones & iPhones", description: "Explore smartphone options, including new and pre-owned devices as stock becomes available.", icon: Smartphone, detail: "Device information will clearly identify model, storage, condition and relevant warranty details." },
  { slug: "home-appliances", title: "Home Appliances", description: "A growing range of practical appliances for the home, subject to availability.", icon: Workflow, detail: "Product listings will provide the key specifications customers need to compare appliances." },
  { slug: "furniture-lifestyle", title: "Furniture & Lifestyle", description: "Furniture and useful household products for workspaces and everyday living.", icon: BriefcaseBusiness, detail: "Category information and product specifications will be provided as products are added." },
];
