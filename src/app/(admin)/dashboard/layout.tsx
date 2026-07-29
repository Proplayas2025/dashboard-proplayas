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
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar role={role ?? ""} />
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <header className="z-20 flex-shrink-0 border-b bg-white dark:bg-zinc-900 overflow-hidden">
            <AppHeader />
          </header>
          <main className="flex-1 overflow-auto w-full p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
