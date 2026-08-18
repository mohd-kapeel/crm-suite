import { Cloud, FileText, Gauge, Network, ShieldCheck, Users } from "lucide-react";

export const asset = (name: string) => `/assets/${name}`;

export const LIVE_CRM = "https://inventmodel-hirepro.replit.app/crm";

export const tourSlides = [
  {
    name: "CRM Dashboard",
    shortName: "Dashboard",
    image: "live/dashboard.png",
    eyebrow: "Live CRM interface",
    title: "See your entire sales operation at a glance.",
    copy:
      "Lead volume, conversions, contacts, recent activity and lead status come together in one clear command center.",
  },

  {
    name: "All Leads",
    shortName: "All Leads",
    image: "live/all-leads.png",
    eyebrow: "Lead management",
    title: "Manage every lead from one organized view.",
    copy:
      "Search, review and update lead ownership, phone numbers, products, status, sources and activity from one workspace.",
  },

  {
    name: "Pipeline Overview",
    shortName: "Pipeline",
    image: "live/pipeline.png",
    eyebrow: "Sales pipeline",
    title:
      "Visualize every deal stage and move opportunities forward.",
    copy:
      "Keep New, Contacted, Qualified, Proposal, Negotiation, Converted and Lost stages visible for the whole team.",
  },

  {
    name: "My Team",
    shortName: "My Team",
    image: "live/my-team.png",
    eyebrow: "Team performance",
    title:
      "Turn team activity into a clear performance view.",
    copy:
      "Track team size, leads updated, hot leads, conversion rate and individual lead activity without losing context.",
  },

  {
    name: "Team Management",
    shortName: "Team Manage",
    image: "live/team-manage.png",
    eyebrow: "Roles & access",
    title:
      "Manage people, roles and permissions in one place.",
    copy:
      "Review members, assign Owner, Admin, Sales Lead, Sales Executive or Viewer roles, and manage access cleanly.",
  },

  {
    name: "Bulk Upload Leads",
    shortName: "Bulk Upload",
    image: "live/bulk-upload.png",
    eyebrow: "Data import",
    title:
      "Bring lead data into CRM Suite in a few simple steps.",
    copy:
      "Download the template, prepare your data, upload XLSX or CSV files and review the import before creating leads.",
  },

  {
    name: "All Candidates",
    shortName: "Candidates",
    image: "live/all-candidates.png",
    eyebrow: "ATS integration",
    title:
      "Turn the ATS talent pool into a lead-generation source.",
    copy:
      "Browse candidate profiles, skills, contact details and call history, then create CRM leads directly from the candidate pool.",
  },

  {
    name: "ATS Sync",
    shortName: "ATS Sync",
    image: "live/ats-sync.png",
    eyebrow: "Recruitment integration",
    title:
      "Keep ATS candidate data synchronized with CRM.",
    copy:
      "Review sync health, total candidates, recent updates and sync results, or trigger a manual refresh when needed.",
  },
] as const;

/* =========================================================
   FEATURE TABS
   ========================================================= */

export const featureTabs = [
  {
    name: "Dashboard",
    icon: Gauge,
    image: "live/dashboard.png",
    copy:
      "Business analytics at a glance with live lead, conversion, contact and activity metrics.",
  },

  {
    name: "All Leads",
    icon: Users,
    image: "live/all-leads.png",
    copy:
      "Capture, search and track leads with status, source, product, ownership and update history visible together.",
  },

  {
    name: "Pipeline",
    icon: Network,
    image: "live/pipeline.png",
    copy:
      "Visualize movement across every lead stage and keep the sales team aligned on opportunities.",
  },

  {
    name: "My Team",
    icon: Users,
    image: "live/my-team.png",
    copy:
      "Monitor team activity, lead updates, hot leads and conversion performance from one view.",
  },

  {
    name: "Team Manage",
    icon: ShieldCheck,
    image: "live/team-manage.png",
    copy:
      "Control members, roles and access levels across the organization.",
  },

  {
    name: "Bulk Upload",
    icon: FileText,
    image: "live/bulk-upload.png",
    copy:
      "Import multiple leads through the guided Excel or CSV upload workflow.",
  },

  {
    name: "Candidates",
    icon: Users,
    image: "live/all-candidates.png",
    copy:
      "Browse the ATS talent pool and turn candidate records into CRM leads when appropriate.",
  },

  {
    name: "ATS Sync",
    icon: Cloud,
    image: "live/ats-sync.png",
    copy:
      "Review synchronization health and manually refresh ATS candidate data into the CRM.",
  },
] as const;

/* =========================================================
   PRICING
   ========================================================= */

export const pricingPlans: {
  name: string;
  copy: string;
  items: string[];
}[] = [
  {
    name: "Basic",
    copy: "For small teams getting started",
    items: [
      "Core lead tracking",
      "Contact management",
      "Basic reporting",
    ],
  },

  {
    name: "Professional",
    copy: "For growing sales teams",
    items: [
      "Full pipeline management",
      "Team collaboration",
      "Bulk data upload",
      "Advanced analytics",
    ],
  },

  {
    name: "Enterprise",
    copy: "For large scale operations",
    items: [
      "Everything in Professional",
      "ATS synchronization",
      "Custom workflows",
      "Dedicated support",
    ],
  },
];

/* =========================================================
   REVEAL
   ========================================================= */


