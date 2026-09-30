import DashboardShell from "@layout/DashboardShell";

export default function AdvanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}