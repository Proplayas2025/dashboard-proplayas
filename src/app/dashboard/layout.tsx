"use client";

//este es el layout del dashboard, que se renderiza en la ruta /dashboard
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = document.cookie
      .split("; ")
      .find((c) => c.startsWith("role="))
      ?.split("=")[1];
    setRole(storedRole ?? null);
  }, []);

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
