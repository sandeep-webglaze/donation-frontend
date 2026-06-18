import type { Metadata } from "next";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { DashboardChart } from "@/components/admin/DashboardChart";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { QuickActions } from "@/components/admin/QuickActions";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening today."
        actions={<QuickActions />}
      />
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
