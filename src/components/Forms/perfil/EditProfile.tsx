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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { User } from "@/interfaces/Profile";
import Image from "next/image";

interface EditProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: User;
  onSave: (updated: Partial<User>) => void;
}

const availableSocialPlatforms = () => [
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "research_gate", label: "ResearchGate" },
  { value: "website", label: "Sitio Web" },
  { value: "phone", label: "Teléfono" },
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

export function EditProfileFormModal({
  isOpen,
  onClose,
  defaultValues,
  onSave,
}: EditProfileFormModalProps) {
  const [formData, setFormData] = useState<Omit<User, "profile_picture">>({
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

  const handleSave = () => {
    // No se envía profile_picture aquí
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
          />
          {/* <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Usuario"
          /> */}
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />
          <Input
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Grado académico"
          />
          <Input
            name="postgraduate"
            value={formData.postgraduate}
            onChange={handleChange}
            placeholder="Posgrado"
          />
          <Input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="País"
          />
          <Input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ciudad"
          />
          <Textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Sobre mí"
          />
          <Input
            name="expertise_area"
            value={formData.expertise_area}
            onChange={handleChange}
            placeholder="Área de experiencia"
          />
          <Input
            name="research_work"
            value={formData.research_work}
            onChange={handleChange}
            placeholder="Trabajo de investigación"
          />

          {/* Redes sociales */}
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
                  type="button"
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

          <Button onClick={handleSave}>Guardar cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface EditProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  user?: User;
}

export function EditProfileImageModal({
  isOpen,
  onClose,
  onUpload,
}: EditProfileImageModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    onUpload(file);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar Foto de Perfil</DialogTitle>
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
