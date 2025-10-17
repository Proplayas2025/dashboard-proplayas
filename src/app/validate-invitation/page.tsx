"use client"
import InvitationService  from "@/lib/InvitationService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ValidateInvitationPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const validarToken = async () => {
      const validateToken = new InvitationService();
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        setError("No se proporcionó un token de invitación válido.");
        setLoading(false);
        return;
      }

      try {
        const response = await validateToken.validateInvitationToken(token);
        if (response.status === 200) {
          // Redirigir al register pasando el token como query parameter
          router.push(`/register?token=${token}`);
        } else {
          setError(response.message || "Token de invitación inválido o expirado.");
          setLoading(false);
        }
      } catch (error: unknown) {
        console.error("Error al validar invitación:", error);
        const errorMessage = error && typeof error === 'object' && 'response' in error &&
          error.response && typeof error.response === 'object' && 'data' in error.response &&
          error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data
          ? (error.response.data.message as string)
          : "Error al validar la invitación. Por favor, verifica que el enlace sea correcto.";
        setError(errorMessage);
        setLoading(false);
      }
    };
    validarToken();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {loading ? (
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">Validando invitación...</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Por favor espera mientras verificamos tu invitación
          </p>
        </div>
      ) : (
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            Invitación no válida
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            {error}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Si crees que esto es un error, contacta al administrador que te envió la invitación.
          </p>
        </div>
      )}
    </div>
  );
}