"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import RegisterNodeLeaderForm from "@/components/Forms/register/RegisterNodeLeaderForm";
import RegisterNodeMemberForm from "@/components/Forms/register/RegisterNodeMemberForm";

import {
  RegisterNodeLeaderRequest,
  RegisterNodeMemberRequest,
} from "@/interfaces/Invitations";

import { toast } from "sonner";
import InvitationService from "@/lib/InvitationService";

interface DecodedToken {
  name: string;
  email: string;
  role_type: string;
  node_type?: string;
  [key: string]: unknown;
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-[60vh]"><p className="text-lg font-semibold">Cargando...</p></div>}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(false);
  const invitationService = new InvitationService();
  const router = useRouter();
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setDecoded(decodedToken);
      } catch {
        toast.error("Token inválido o expirado");
      }
    }
  }, [token]);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      // Codifica las contraseñas en base64 antes de enviar
      const password = formData.get("password");
      if (typeof password === "string") {
        formData.set("password", btoa(password));
      }
      const confirmPassword = formData.get("confirm_password");
      if (typeof confirmPassword === "string") {
        formData.set("confirm_password", btoa(confirmPassword));
      }
      const plainObject = Object.fromEntries(formData.entries());
      const response = await invitationService.registerNewUser(
        plainObject as unknown as
          | RegisterNodeLeaderRequest
          | RegisterNodeMemberRequest
      );
      const { status, message, data } = response;

      if (status === 201 && data) {
        toast.success("Registro exitoso. ¡Bienvenido!");
        router.push("/login");
        return;
      }

      if (status === 400) {
        toast.error(
          "El token ya fue utilizado o ha expirado. Solicita una nueva invitación."
        );
        return;
      }

      if (status === 500) {
        toast.error("Error del servidor. Intenta más tarde.");
        return;
      }

      // Otros errores
      toast.error(message || "Error al registrar. Intenta de nuevo.");
    } catch {
      toast.error("Error inesperado al registrar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-lg font-semibold">
          No se encontró un token de invitación.
        </p>
      </div>
    );
  }

  if (!decoded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-lg font-semibold">Validando invitación...</p>
      </div>
    );
  }

  if (decoded.role_type === "node_leader") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-muted/50 py-8">
        <RegisterNodeLeaderForm
          loading={loading}
          onSubmit={handleSubmit}
          initialValues={{
            email: decoded.email,
            name: decoded.name,
            node_type: decoded.node_type,
            token: token,
          }}
        />
      </div>
    );
  }

  if (decoded.role_type === "member") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-muted/50 py-8">
        <RegisterNodeMemberForm
          loading={loading}
          onSubmit={handleSubmit}
          initialValues={{
            email: decoded.email,
            name: decoded.name,
            token: token,
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <p className="text-lg font-semibold">
        El tipo de invitación no es soportado aún:{" "}
        <span className="font-mono">{decoded.role_type}</span>
      </p>
    </div>
  );
}
