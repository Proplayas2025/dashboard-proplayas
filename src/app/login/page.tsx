"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm, LoginFormValues } from "@/components/Forms/login/LoginForm";
import { Authentication } from "@/lib/Auth/Authentication";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    const auth = new Authentication();
    try {
      const res = await auth.login(values);
      if (res.status === 200 && res.data?.token) {
        toast.success("Inicio de sesión exitoso");
        router.push("/dashboard/perfil");
      } else if (res.status === 401) {
        setError("Credenciales incorrectas");
        toast.error("Credenciales incorrectas");
      } else {
        setError(res.message || "Error al iniciar sesión");
        toast.error(res.message || "Error al iniciar sesión");
      }
    } catch {
      setError("Error al iniciar sesión");
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950">
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </div>
  );
}