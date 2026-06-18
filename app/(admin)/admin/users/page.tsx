import type { Metadata } from "next";
import { UsersManager } from "@/components/admin/UsersManager";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Users",
};

export default function UsersPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="User Management"
        description="View users, change roles (User / Admin / Super Admin) and activate or deactivate accounts."
      />
      <UsersManager />
    </div>
  );
}
