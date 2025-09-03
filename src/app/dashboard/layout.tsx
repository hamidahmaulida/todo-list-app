import NavbarDashboard from "@/components/navbars/NavbarDashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDashboard/>
      <main className="flex-1">{children}</main>
    </div>
  );
}