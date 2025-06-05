"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation'
import { jwtDecode } from "jwt-decode";
import RegisterNodeLeaderForm from "@/components/Forms/register/RegisterNodeLeaderForm";
import { toast } from "sonner";
import InvitationService from "@/lib/InvitationService";

interface DecodedToken {
  name: string;
  email: string;
  role_type: string;
  node_type?: string;
  [key: string]: any;
}

export default function RegisterPage() {
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
      } catch (err) {
        toast.error("Token inválido o expirado");
      }
    }
  }, [token]);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      // Extrae y codifica la contraseña (y confirm_password si lo agregas)
      const password = formData.get("password");
      if (typeof password === "string") {
        formData.set("password", btoa(password));
      }
      const confirmPassword = formData.get("confirm_password");
      if (typeof confirmPassword === "string") {
        formData.set("confirm_password", btoa(confirmPassword));
      }

      console.log("Datos del formulario:", Object.fromEntries(formData.entries()));
      
      const response = await invitationService.registerNewUser(formData);
      const {status, message, data } = response.data;
      if(status !== 201) {
        toast.error(`Error al registrar: ${message}`)
        return;
      } else if (status === 201 && data) {
        toast.success("Registro exitoso. ¡Bienvenido!");
        router.push('/login');
      }
    } catch (error: any) {
      toast('Event has been created', {
        description: error,
      })
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-lg font-semibold">No se encontró un token de invitación.</p>
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <p className="text-lg font-semibold">
        El tipo de invitación no es soportado aún: <span className="font-mono">{decoded.role_type}</span>
      </p>
    </div>
  );
}