"use client";

//este es el layout del dashboard, que se renderiza en la ruta /dashboard

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { useDashboardAccess } from "@/hooks/use-dashboard-access"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { isAuthorized, loading, role } = useDashboardAccess();

  if (loading) return null;
  if (!isAuthorized) return null; // Aunque el router.replace() ya lo mandó

  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-20 relative md:pl-64">
        <AppHeader />
      </header>
      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar role={role ?? ""} />
          <main className="flex-1 p-4 md:pl-4">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  );
}
