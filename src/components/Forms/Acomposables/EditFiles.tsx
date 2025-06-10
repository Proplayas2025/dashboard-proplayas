"use client";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Props genéricos para reutilizar en cualquier tipo de contenido
interface EditFileModalProps<T> {
  isOpen: boolean;
  item: T | null;
  onClose: () => void;
  onSave: (item: T, file: File) => void;
  accept: string;
  label: string;
  title: string;
}

// Modal genérico para archivos (imagen o archivo adjunto)
export function EditFileModal<T>({
  isOpen,
  item,
  onClose,
  onSave,
  accept,
  label,
  title,
}: EditFileModalProps<T>) {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && item) {
      onSave(item, file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="file_input">{label}</Label>
            <Input
              id="file_input"
              type="file"
              accept={accept}
              ref={inputRef}
              onChange={handleFileChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!file}>
              Guardar
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Alias para imagen de portada
export function EditCoverImageModal<T>(props: Omit<EditFileModalProps<T>, "accept" | "label" | "title">) {
  return (
    <EditFileModal
      {...props}
      accept="image/*"
      label="Selecciona una nueva imagen"
      title="Cambiar imagen de portada"
    />
  );
}

// Alias para archivo adjunto
export function EditAttachmentFileModal<T>(props: Omit<EditFileModalProps<T>, "accept" | "label" | "title">) {
  return (
    <EditFileModal
      {...props}
      accept=".pdf,.doc,.docx,.xls,.xlsx"
      label="Selecciona un nuevo archivo"
      title="Cambiar archivo adjunto"
    />
  );
}