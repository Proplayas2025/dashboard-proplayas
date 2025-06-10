"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface CreateProyectoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
}

export const CreateProyectoModal: React.FC<CreateProyectoModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    link: "",
    file_file: null as File | null,
    file_url: "",
    cover_image_file: null as File | null,
    cover_image_url: "",
    participants: [""],
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      if (name === "cover_image_file" && file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // PARTICIPANTS HANDLERS (como en CreateEventModal)
  const handleParticipantChange = (index: number, value: string) => {
    const updated = [...formData.participants];
    updated[index] = value;
    setFormData((prev) => ({
      ...prev,
      participants: updated,
    }));
  };

  const addParticipant = () => {
    setFormData((prev) => ({
      ...prev,
      participants: [...(prev.participants || []), ""],
    }));
  };

  const removeParticipant = (index: number) => {
    const updated = [...formData.participants];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      participants: updated,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("date", formData.date);
    if (formData.location) data.append("location", formData.location);
    if (formData.link) data.append("link", formData.link);
    if (formData.file_file) data.append("file_file", formData.file_file);
    if (formData.file_url) data.append("file_url", formData.file_url);
    if (formData.cover_image_file)
      data.append("cover_image_file", formData.cover_image_file);
    if (formData.cover_image_url)
      data.append("cover_image_url", formData.cover_image_url);
    if (
      formData.participants &&
      formData.participants.filter(Boolean).length > 0
    ) {
      data.append(
        "participants",
        JSON.stringify(formData.participants.filter(Boolean))
      );
    }

    onSave(data);
    onClose();
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      link: "",
      file_file: null,
      file_url: "",
      cover_image_file: null,
      cover_image_url: "",
      participants: [""],
    });
    setPreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <DialogHeader>
          <DialogTitle>Crear Proyecto</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ubicación"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="link">Enlace</Label>
            <Input
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://..."
              type="url"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Participantes</Label>
            {formData.participants.map((p, idx) => (
              <div key={idx} className="flex gap-2 mb-1">
                <Input
                  value={p}
                  onChange={(e) => handleParticipantChange(idx, e.target.value)}
                  placeholder={`Participante ${idx + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeParticipant(idx)}
                  disabled={formData.participants.length === 1}
                >
                  ✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addParticipant}
              size="sm"
            >
              + Agregar participante
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="cover_image_file">Imagen de portada</Label>
            <Input
              id="cover_image_file"
              name="cover_image_file"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
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
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="cover_image_url">URL de imagen de portada</Label>
            <Input
              id="cover_image_url"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleChange}
              placeholder="https://..."
              type="url"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="file_file">Archivo adjunto (PDF, DOCX, XLSX)</Label>
            <Input
              id="file_file"
              name="file_file"
              type="file"
              accept=".pdf,.docx,.xlsx"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="file_url">URL de archivo adjunto</Label>
            <Input
              id="file_url"
              name="file_url"
              value={formData.file_url}
              onChange={handleChange}
              placeholder="https://..."
              type="url"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Crear</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
