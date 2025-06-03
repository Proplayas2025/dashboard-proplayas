"use client";
import React, { useState, useEffect } from "react";
import { Projects } from "@/interfaces/Content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EditProyectoModalProps {
  isOpen: boolean;
  onClose: () => void;
  proyecto: Projects | null;
  onSave: (updated: Projects) => void;
}

export const EditProyectoModal: React.FC<EditProyectoModalProps> = ({
  isOpen,
  onClose,
  proyecto,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Projects>>({});

  useEffect(() => {
    if (proyecto) {
      setFormData({
        ...proyecto,
        participants: Array.isArray(proyecto.participants)
          ? proyecto.participants
          : typeof proyecto.participants === "string"
            ? [proyecto.participants]
            : [""],
      });
    }
  }, [proyecto]);

  // PARTICIPANTS HANDLERS (igual que en CreateProyectoModal)
  const handleParticipantChange = (index: number, value: string) => {
    const updated = Array.isArray(formData.participants) ? [...formData.participants] : [""];
    updated[index] = value;
    setFormData((prev) => ({
      ...prev,
      participants: updated,
    }));
  };

  const addParticipant = () => {
    setFormData((prev) => ({
      ...prev,
      participants: Array.isArray(prev.participants)
        ? [...prev.participants, ""]
        : [""],
    }));
  };

  const removeParticipant = (index: number) => {
    const updated = Array.isArray(formData.participants) ? [...formData.participants] : [];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      participants: updated,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && proyecto) {
      onSave({
        ...proyecto,
        ...formData,
        participants: Array.isArray(formData.participants)
          ? formData.participants.filter(Boolean)
          : [],
      } as Projects);
      onClose();
    }
  };

  if (!proyecto) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Proyecto</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              value={formData.title || ""}
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
              value={formData.description || ""}
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
              value={formData.date ? String(formData.date).substring(0, 10) : ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Ubicación"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="link">Enlace</Label>
            <Input
              id="link"
              name="link"
              value={formData.link || ""}
              onChange={handleChange}
              placeholder="https://..."
              type="url"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="cover_image_url">URL de imagen de portada</Label>
            <Input
              id="cover_image_url"
              name="cover_image_url"
              value={formData.cover_image_url || ""}
              onChange={handleChange}
              placeholder="https://..."
              type="url"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="file_url">URL de archivo adjunto</Label>
            <Input
              id="file_url"
              name="file_url"
              value={formData.file_url || ""}
              onChange={handleChange}
              placeholder="https://..."
              type="url"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Participantes</Label>
            {(formData.participants ?? []).map((p, idx) => (
              <div key={idx} className="flex gap-2 mb-1">
                <Input
                  value={p}
                  onChange={e => handleParticipantChange(idx, e.target.value)}
                  placeholder={`Participante ${idx + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeParticipant(idx)}
                  disabled={(formData.participants ?? []).length === 1}
                >
                  ✕
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addParticipant} size="sm">
              + Agregar participante
            </Button>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};