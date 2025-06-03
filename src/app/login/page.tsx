"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm, LoginFormValues } from "@/components/Forms/login/LoginForm";
import { Authentication } from "@/lib/Auth/Authentication";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    const auth = new Authentication();
    const res = await auth.loginTwo(values);
    setLoading(false);

    if (res.status === 200 && res.data?.token) {
      router.push("/dashboard");
    } else {
      setError(res.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950">
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </div>
  );
}