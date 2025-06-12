"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm, LoginFormValues } from "@/components/Forms/login/LoginForm";
import { Authentication } from "@/lib/Auth/Authentication";
import { toast } from "sonner";
import { ArrowLeftCircle } from "lucide-react"
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950 relative">
      <button
      type="button"
      className="absolute top-6 left-6 flex items-center gap-2 text-zinc-700 dark:text-zinc-200 hover:text-blue-600 transition-colors"
      onClick={() => router.push("/")}
      aria-label="Volver al inicio"
      >
      <ArrowLeftCircle size={28} />
      <span className="hidden sm:inline">Volver al inicio</span>
      </button>
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </div>
  );
}