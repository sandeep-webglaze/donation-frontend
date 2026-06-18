import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { AuthGuard } from "@/components/admin/AuthGuard";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
