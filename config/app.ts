import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  FileStack,
  HelpCircle,
} from "lucide-react";
import type { NavItem } from "@/types";

export const APP_NAME = "Admin";
export const APP_DESCRIPTION = "Donation platform admin";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/admin",
  PAGES: "/admin/pages",
  CMS: "/admin/cms",
  SEO: "/admin/seo",
  GALLERY: "/admin/gallery",
  USERS: "/admin/users",
  SETTINGS: "/admin/settings",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

export const SIDEBAR_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Pages",
    href: ROUTES.PAGES,
    icon: FileStack,
  },
  {
    label: "CMS Pages",
    href: ROUTES.CMS,
    icon: FileText,
  },
  {
    label: "Users",
    href: ROUTES.USERS,
    icon: Users,
  },
];

export const SIDEBAR_BOTTOM_NAV: NavItem[] = [
  {
    label: "Settings",
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
  {
    label: "Help",
    href: "/admin/help",
    icon: HelpCircle,
  },
];
