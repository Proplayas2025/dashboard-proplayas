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
import { Authentication } from "@/lib/Auth/Authentication";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo válido." }),
});

type RecoverFormValues = z.infer<typeof formSchema>;

export default function RecuperarContrasenaPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RecoverFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: RecoverFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const auth = new Authentication();
      const res = await auth.recoverPassword(values.email);
      if (res.status === 200) {
        setSent(true);
      } else {
        setError(res.message || "Ocurrió un error.");
      }
    } catch {
      setError("Ocurrió un error al enviar la solicitud.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Recuperar contraseña
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer
        tu contraseña.
      </p>

      {sent ? (
        <div className="text-center">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
            <p className="text-green-700 dark:text-green-300 text-sm">
              Si el correo está registrado, recibirás un enlace para restablecer
              tu contraseña. Revisa tu bandeja de entrada.
            </p>
          </div>
          <Link
            href="/login"
            className="text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar enlace de recuperación"}
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
      )}
    </div>
  );
}
