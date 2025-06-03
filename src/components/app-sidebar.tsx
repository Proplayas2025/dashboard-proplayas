"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconUser,
  IconSquare,
  IconPencil,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
const data = {
  user: {
    name: "Nombre del Usuario",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  content: [
    {
      title: "Eventos",
      url: "/dashboard/eventos",
      icon: IconDatabase,
    },
    {
      title: "Publicaciones",
      url: "/dashboard/publicaciones",
      icon: IconFileWord,
    },
    {
      title: "Libros",
      url: "/dashboard/libros",
      icon: IconFileAi,
    },
    {
      title: "Proyectos",
      url: "/dashboard/proyectos",
      icon: IconChartBar,
    },
    {
      title: "WebSeries",
      url: "/dashboard/series",
      icon: IconReport,
    },
  ],
};

export function AppSidebar({
  role,
  ...props
}: React.ComponentProps<typeof Sidebar> & { role: string | null }) {
  // Construir los ítems de navegación principales según el rol
  let navMainFiltered: Array<{ title: string; url: string; icon: any }> = [];
  if (role === "node_leader") {
    navMainFiltered = [
      {
        title: "Mi Perfil",
        url: "/dashboard/perfil",
        icon: IconUser,
      },
      {
        title: "Nodo",
        url: "/dashboard/nodo",
        icon: IconListDetails,
      },
      {
        title: "Miembros",
        url: "/dashboard/miembros",
        icon: IconUsers,
      },
    ];
  } else if (role === "admin") {
    navMainFiltered = [
      {
        title: "Nodos",
        url: "/dashboard/nodos",
        icon: IconListDetails,
      },
      {
        title: "Usuarios",
        url: "/dashboard/users",
        icon: IconUsers,
      },
      {
        title: "Mi Perfil",
        url: "/dashboard/perfil",
        icon: IconFolder,
      },
    ];
  } else if (role === "member") {
    navMainFiltered = [
      {
        title: "Mi Perfil",
        url: "/dashboard/perfil",
        icon: IconUser,
      },
    ];
  } else {
    // Si no hay rol, mostrar solo "Mi Perfil"
    navMainFiltered = [
      {
        title: "Mi Perfil",
        url: "/dashboard/perfil",
        icon: IconFolder,
      },
    ];
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a
                href="https://proplayas.org/dashboard"
                className="flex items-center gap-2"
              >
                <span className="text-base font-semibold">
                  Panel de Control
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainFiltered} />
        <NavSecondary items={data.content} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
