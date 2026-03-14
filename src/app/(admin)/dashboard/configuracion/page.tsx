"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
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
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Authentication } from "@/lib/Auth/Authentication";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Ingresa tu contraseña actual." }),
    newPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
    confirmNewPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmNewPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export default function ConfiguracionPage() {
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordValues) => {
    setLoading(true);
    try {
      const auth = new Authentication();
      const res = await auth.changePassword(
        values.currentPassword,
        values.newPassword,
        values.confirmNewPassword
      );
      if (res.status === 200) {
        toast.success(res.message);
        form.reset();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Ocurrió un error al cambiar la contraseña.");
    }
    setLoading(false);
  };

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 mb-3">
          <Card className="p-6 max-w-lg">
            <CardContent className="p-0">
              <CardTitle className="text-2xl font-semibold text-gray-500 dark:text-white mb-6">
                Cambiar contraseña
              </CardTitle>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña actual</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showCurrent ? "text" : "password"}
                              placeholder="••••••••"
                              autoComplete="current-password"
                              {...field}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              className="absolute inset-y-0 right-2 flex items-center text-gray-400 dark:text-gray-500"
                              onClick={() => setShowCurrent((v) => !v)}
                              aria-label={
                                showCurrent
                                  ? "Ocultar contraseña"
                                  : "Mostrar contraseña"
                              }
                            >
                              {showCurrent ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nueva contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showNew ? "text" : "password"}
                              placeholder="••••••••"
                              autoComplete="new-password"
                              {...field}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              className="absolute inset-y-0 right-2 flex items-center text-gray-400 dark:text-gray-500"
                              onClick={() => setShowNew((v) => !v)}
                              aria-label={
                                showNew
                                  ? "Ocultar contraseña"
                                  : "Mostrar contraseña"
                              }
                            >
                              {showNew ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar nueva contraseña</FormLabel>
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
                                showConfirm
                                  ? "Ocultar contraseña"
                                  : "Mostrar contraseña"
                              }
                            >
                              {showConfirm ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Cambiar contraseña"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
