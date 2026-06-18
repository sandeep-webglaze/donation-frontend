import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Search,
  HelpCircle,
} from "lucide-react";
import type { NavItem } from "@/types";

export const APP_NAME = "Admin";
export const APP_DESCRIPTION = "Donation platform admin";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/admin",
  CMS: "/admin/cms",
  SEO: "/admin/seo",
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
    label: "CMS Pages",
    href: ROUTES.CMS,
    icon: FileText,
  },
  {
    label: "SEO Manager",
    href: ROUTES.SEO,
    icon: Search,
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
