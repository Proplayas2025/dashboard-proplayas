// src/hooks/useDashboardAccess.ts
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/cookies";

export function useDashboardAccess() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const role = getCookie("role");
    setRole(role);
    if (role === "admin" || role === "node_leader" || role === "member") {
      setIsAuthorized(true);
    } else {
      router.replace("/login");
    }
    setLoading(false);
  }, [router]);

  return { isAuthorized, loading, role };
}