"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Authentication } from "@/lib/Auth/Authentication";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
    confirmPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof formSchema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  if (!token) {
    return (
      <div className="w-full max-w-md mx-auto mt-16 bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Enlace inválido</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          El enlace de recuperación es inválido o ha expirado. Solicita uno
          nuevo.
        </p>
        <Link
          href="/recuperar-contrasena"
          className="text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
        >
          Solicitar nuevo enlace
        </Link>
      </div>
    );
  }

  const onSubmit = async (values: ResetFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const auth = new Authentication();
      const res = await auth.setNewPassword(token, values.password);
      if (res.status === 200) {
        toast.success("Contraseña actualizada correctamente.");
        router.push("/login");
      } else {
        setError(res.message || "Ocurrió un error.");
      }
    } catch {
      setError("Ocurrió un error al restablecer la contraseña.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Restablecer contraseña
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">
        Ingresa tu nueva contraseña.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-400 dark:text-gray-500"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-400 dark:text-gray-500"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={
                        showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"
                      }
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Restableciendo..." : "Restablecer contraseña"}
          </Button>
          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function RestablecerContrasenaPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md mx-auto mt-16 bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">Cargando...</p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
