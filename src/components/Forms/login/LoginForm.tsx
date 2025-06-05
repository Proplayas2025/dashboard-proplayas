"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo válido." }),
  password: z.string().min(4, { message: "La contraseña debe tener al menos 4 caracteres." }),
});

export type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
  error?: string | null;
}

export function LoginForm({ onSubmit, loading = false, error }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  // Detecta si el error es de contraseña olvidada
  const forgotPasswordError =
    error &&
    (error.toLowerCase().includes("contraseña") ||
      error.toLowerCase().includes("password") ||
      error.toLowerCase().includes("olvid"));

  return (
    <div className="w-full max-w-md mx-auto mt-16 bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="usuario@correo.com"
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-400 dark:text-gray-500"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
          {forgotPasswordError && (
            <Button
              type="button"
              variant="link"
              className="w-full text-center mt-2"
              onClick={() => {
                // Aquí podrías redirigir a la página de recuperación de contraseña
                window.location.href = "/recuperar-contrasena";
              }}
            >
              ¿Olvidaste tu contraseña?
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}