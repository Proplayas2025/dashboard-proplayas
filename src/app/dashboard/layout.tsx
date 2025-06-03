"use client";

//este es el layout del dashboard, que se renderiza en la ruta /dashboard
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
      <SidebarProvider>
        <AppSidebar role={role ?? ""} />
        <main className="flex-1 p-4">{children}</main>
      </SidebarProvider>
  );
}
