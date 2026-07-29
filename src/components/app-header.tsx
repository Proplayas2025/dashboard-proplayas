"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggler";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Authentication } from "@/lib/Auth/Authentication";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export function AppHeader() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // Busca el email en localStorage
    const email = localStorage.getItem("email");
    setUserEmail(email ?? null);

    // Listener para detectar cambios en localStorage (cuando el usuario hace login)
    const handleStorageChange = () => {
      const updatedEmail = localStorage.getItem("email");
      setUserEmail(updatedEmail ?? null);
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event para cambios en la misma pestaña
    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);
  const handleLogout = async () => {
    const auth = new Authentication();
    const { status, message } = await auth.logout();
    if (status !== 200) {
      toast.error(`Error al cerrar sesión: ${message}`);
      router.push("/login");
      return;
    }
    toast.success("Sesión cerrada correctamente");
    router.push("/login");
  };
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b shadow-sm overflow-hidden">
      <nav className="w-full flex items-center h-16 px-2 sm:px-4 gap-2 sm:gap-4 relative">
        {/* Logo a la izquierda */}
        <Link href="/" className="flex items-center gap-1 sm:gap-2 z-20 flex-shrink-0">
          <Image
            src="/proplayas_logo.svg"
            alt="Proplayas Logo"
            width={32}
            height={32}
            className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
            priority
          />
          <span className="hidden sm:block font-bold text-sm sm:text-lg text-gray-700 dark:text-white">
            Proplayas
          </span>
        </Link>
        <div className="flex-1" />
        {/* Menú de navegación en desktop */}
        <nav className="hidden xl:flex gap-3 lg:gap-4 items-center flex-nowrap text-sm lg:text-base">
          <Link
            href="/"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition font-medium whitespace-nowrap"
          >
            Inicio
          </Link>
          <Link
            href="/quienes-somos"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition font-medium whitespace-nowrap"
          >
            Quiénes Somos
          </Link>
          <Link
            href="/actividades/eventos"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition font-medium whitespace-nowrap"
          >
            Actividades
          </Link>
          <Link
            href="/nodos"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition font-medium whitespace-nowrap"
          >
            Nodos
          </Link>
          {isMounted && (userEmail ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                  <span className="hidden sm:inline truncate">{userEmail}</span>
                  <span className="sm:hidden">{userEmail.split('@')[0]}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          ))}
        </nav>
        <div className="flex-shrink-0">
          <ModeToggle />
        </div>
        {/* Dropdown menú en mobile - solo para pantallas muy pequeñas */}
        <div className="xl:hidden ml-auto flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                aria-label="Abrir menú"
              >
                <Menu size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuItem asChild>
                <Link href="/">Inicio</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/quienes-somos">Quiénes Somos</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/actividades/eventos">Actividades</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/nodos">Nodos</Link>
              </DropdownMenuItem>
              {isMounted && (
                <DropdownMenuItem asChild>
                  {userEmail ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex items-center gap-2"
                        >
                          {userEmail}
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/perfil">Perfil</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          Cerrar sesión
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button asChild variant="outline">
                      <Link href="/login">Login</Link>
                    </Button>
                  )}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
