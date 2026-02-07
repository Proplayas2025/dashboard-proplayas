"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NodosService } from "@/lib/NodoService";
import { Node } from "@/interfaces/Nodes";
import Image from "next/image";
import { useRef } from "react";

interface EditNodeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: Node;
  onSave: (updated: Node) => void;
}
// Redes sociales disponibles
const availableSocialPlatforms = () => [
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "research_gate", label: "ResearchGate" },
  { value: "website", label: "Sitio Web" }, // Se agregó website correctamente
];
const allowedPlatforms = [
  "linkedin",
  "github",
  "twitter",
  "website",
  "facebook",
  "instagram",
  "youtube",
  "research_gate",
  "phone",
] as const;

type Platform = (typeof allowedPlatforms)[number];

export function EditNodeFormModal({
  isOpen,
  onClose,
  defaultValues,
  onSave,
}: EditNodeFormModalProps) {
  const [formData, setFormData] = useState<Node>({
    ...defaultValues,
    social_media: Array.isArray(defaultValues.social_media)
      ? defaultValues.social_media
      : [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // For social_media, could add more advanced logic here if needed

  const handleSubmit = async () => {
    const nodoService = new NodosService();
    // Solo los campos permitidos
    const payload = {
      name: formData.name,
      about: formData.about,
      country: formData.country,
      city: formData.city,
      social_media: formData.social_media,
    };
    const updated = await nodoService.editNodeBio(formData.id, payload);
    if (updated?.data) {
      onSave(updated.data);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Información del Nodo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del nodo"
          />
          <Input
            name="city"
            value={formData.city ?? ""}
            onChange={handleChange}
            placeholder="Ciudad"
          />
          <Input
            name="country"
            value={formData.country ?? ""}
            onChange={handleChange}
            placeholder="País"
          />
          <Textarea
            name="about"
            value={formData.about ?? ""}
            onChange={handleChange}
            placeholder="Descripción"
          />

          {/* redes sociales para agregar */}
          <div className="space-y-2">
            <label className="font-medium">Redes Sociales</label>
            {formData.social_media?.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Select
                  value={item.platform}
                  onValueChange={(value) => {
                    const updated = [...(formData.social_media || [])];
                    if (allowedPlatforms.includes(value as Platform)) {
                      updated[index].platform = value as Platform;
                    }
                    setFormData({ ...formData, social_media: updated });
                  }}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSocialPlatforms().map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="URL"
                  value={item.url}
                  onChange={(e) => {
                    const updated = [...(formData.social_media || [])];
                    updated[index].url = e.target.value;
                    setFormData({ ...formData, social_media: updated });
                  }}
                />
                <Button
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => {
                    const updated =
                      formData.social_media?.filter((_, i) => i !== index) ||
                      [];
                    setFormData({ ...formData, social_media: updated });
                  }}
                >
                  ✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="link"
              onClick={() => {
                const updated = [
                  ...(formData.social_media || []),
                  { platform: allowedPlatforms[0], url: "" },
                ];
                setFormData({ ...formData, social_media: updated });
              }}
            >
              + Agregar
            </Button>
          </div>

          <Button onClick={handleSubmit}>Guardar cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface EditNodeImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newFileName: string) => void;
  nodeCode: string; // código del nodo para la imagen
}

export function EditNodeImageModal({
  isOpen,
  onClose,
  onUpload,
}: EditNodeImageModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // guardar como File
      const previewUrl = URL.createObjectURL(selectedFile); // solo para mostrar imagen
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    const nodoService = new NodosService();
    const response = await nodoService.uploadNodeProfilePicture(formData);
    if (response?.data?.profile_picture) {
      onUpload(response.data.profile_picture);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar Foto del Nodo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={128}
              height={128}
              className="w-32 h-32 object-cover rounded-md mt-2"
              unoptimized
            />
          )}
          <Button onClick={handleSubmit} disabled={!file}>
            Subir Imagen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface EditNodeMemorandumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (fileName: string) => void;
  nodeCode: string;
}

export function EditNodeMemorandumModal({
  isOpen,
  onClose,
  onUpload,
}: EditNodeMemorandumModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Solo se permiten archivos PDF.");
        setFile(null);
        setFileName(null);
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const nodoService = new NodosService();
    const response = await nodoService.uploadNodeMemorandum(formData);
    if (response?.data?.memorandum) {
      onUpload(response.data.memorandum);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subir Memorándum (PDF)</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          {fileName && (
            <div className="text-sm text-gray-700">
              Archivo seleccionado: <span className="font-medium">{fileName}</span>
            </div>
          )}
          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}
          <Button onClick={handleSubmit} disabled={!file}>
            Subir Memorándum
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
