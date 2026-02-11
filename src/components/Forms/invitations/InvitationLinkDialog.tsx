"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitationToken: string | null;
  invitedName: string;
  invitedEmail: string;
}

export default function InvitationLinkDialog({
  open,
  onOpenChange,
  invitationToken,
  invitedName,
  invitedEmail,
}: Props) {
  const [copied, setCopied] = useState(false);

  const frontendUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const registrationUrl = invitationToken
    ? `${frontendUrl}/validate-invitation?token=${invitationToken}`
    : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(registrationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = registrationUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Enlace de registro</DialogTitle>
          <DialogDescription>
            Comparte este enlace con <strong>{invitedName}</strong> (
            {invitedEmail}) para que pueda completar su registro manualmente si
            no recibió el correo electrónico.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Enlace de registro</Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={registrationUrl}
                className="text-xs font-mono"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                title="Copiar enlace"
              >
                {copied ? (
                  <IconCheck className="h-4 w-4 text-green-500" />
                ) : (
                  <IconCopy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Este enlace es válido por 7 días. El usuario podrá registrarse con
            su correo electrónico y crear su contraseña.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
