"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const panels = [
  { href: "/actividades/eventos", label: "Eventos" },
  { href: "/actividades/proyectos", label: "Proyectos" },
  { href: "/actividades/libros", label: "Libros" },
  { href: "/actividades/publicaciones", label: "Publicaciones" },
];

export default function ActividadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col p-4">
      <NavigationMenu className=" flex flex-row justify-center align-center">
        <NavigationMenuList>
          {panels.map((panel) => (
            <NavigationMenuItem key={panel.href}>
              <NavigationMenuLink asChild active={pathname === panel.href}>
                <Link
                  href={panel.href}
                  className={
                    pathname === panel.href
                      ? "bg-blue-200 dark:bg-zinc-800 text-cyan-900 dark:text-white font-semibold"
                      : ""
                  }
                >
                  {panel.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}