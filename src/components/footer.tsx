import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/proplayas_logo.svg" alt="Proplayas Logo" className="h-8 w-auto" />
          <span className="font-semibold text-neutral-700 dark:text-neutral-200 text-lg">proplayas.org</span>
        </div>
        <Separator className="md:hidden my-4" />
        <nav className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <Link href="/public/inicio" className="hover:text-primary transition">Inicio</Link>
          <Link href="/public/quienes-somos" className="hover:text-primary transition">Quiénes somos</Link>
          <Link href="/public/nodos" className="hover:text-primary transition">Nodos</Link>
          <Link href="/public/actividades" className="hover:text-primary transition">Actividades</Link>
        </nav>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center md:text-right">
          © {new Date().getFullYear()} Proplayas. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
