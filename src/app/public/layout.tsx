// filepath: /app/public/layout.tsx
"use client";
import { AppHeader } from "@/components/app-header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <AppHeader />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}