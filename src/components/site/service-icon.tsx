import {
  BadgeHelp,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  Code2,
  Database,
  FileText,
  Globe2,
  Headphones,
  Laptop,
  Mail,
  MonitorCog,
  Network,
  Palette,
  ShieldCheck,
  Smartphone,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  BadgeHelp, BriefcaseBusiness, Building2, ClipboardList, Code2, Database,
  FileText, Globe2, Headphones, Laptop, Mail, MonitorCog, Network, Palette,
  ShieldCheck, Smartphone, Users, Workflow, Wrench,
};

export function ServiceIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = serviceIcons[name] ?? BriefcaseBusiness;
  return <Icon size={size} aria-hidden="true" />;
}

export function getServiceIcon(name: string): LucideIcon {
  return serviceIcons[name] ?? BriefcaseBusiness;
}
