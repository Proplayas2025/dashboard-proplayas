"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/public/inicio"); // o alguna pantalla pública o de error
  }, [router]);

  return null;
}
