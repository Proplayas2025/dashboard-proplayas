// filepath: /app/layout.tsx esta es la envoltura de todas las paginas publicas
"use client";
import { AppHeader } from "@/components/app-header";
import { ReactLenis } from "lenis/react";
import Footer from "@/components/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16">
        <AppHeader />
      </header>
      <ReactLenis root />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
