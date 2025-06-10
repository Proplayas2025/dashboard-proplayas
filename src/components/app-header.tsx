"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function AppHeader() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Busca el email en la cookie (ajusta el nombre si es diferente)
    const email = localStorage.getItem("email");
    setUserEmail(email ?? null);
  }, []);

  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b shadow-sm">
      <nav className="container mx-auto flex items-center h-16 px-4 gap-6 relative">
        {/* Logo a la izquierda */}
        <Link href="/" className="flex items-center gap-2 z-20">
          <Image
            src="/proplayas_logo.svg"
            alt="Proplayas Logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="font-bold text-lg text-gray-700 dark:text-white">
            Proplayas
          </span>
        </Link>
        <div className="flex-1" />
        {/* Menú de navegación en desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition font-medium"
          >
            Inicio
          </Link>
          <Link
            href="/quienes-somos"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition font-medium"
          >
            Quienes Somos
          </Link>
          <Link
            href="/actividades"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition font-medium"
          >
            Actividades
          </Link>
          <Link
            href="/nodos"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition font-medium"
          >
            Nodos
          </Link>
          {userEmail ? (
            <Button asChild variant="outline">
              <Link href="/dashboard/perfil">{userEmail}</Link>
            </Button>
          ) : (
            <Button
              asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </nav>
        {/* Dropdown menú en mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                aria-label="Abrir menú"
              >
                <Menu size={28} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-2">
              <DropdownMenuItem asChild>
                <Link href="/">Inicio</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/quienes-somos">Quienes Somos</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/actividades">Actividades</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/nodos">Nodos</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                {userEmail ? (
                  <Button asChild variant={"outline"}>
                    <Link href="/dashboard/perfil">{userEmail}</Link>
                  </Button>
                ) : (
                  <Button asChild variant={"outline"}>
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
