import DashboardShell from "@layout/DashboardShell";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}