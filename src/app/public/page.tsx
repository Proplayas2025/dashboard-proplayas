// filepath: /app/public/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/public/inicio");
  }, [router]);
  return null;
}