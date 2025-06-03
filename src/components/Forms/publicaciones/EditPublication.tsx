"use client";
import React, { useState, useEffect } from "react";
import { Publications } from "@/interfaces/Content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const publicationTypes = ["boletin", "guia", "articulo"] as const;

interface EditPublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  publication: Publications | null;
  onSave: (updated: Publications) => void;
}

export const EditPublicationModal: React.FC<EditPublicationModalProps> = ({
  isOpen,
  onClose,
  publication,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Publications>>({});

  useEffect(() => {
    if (publication) setFormData(publication);
  }, [publication]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof Publications, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && publication) {
      onSave({ ...publication, ...formData } as Publications);
      onClose();
    }
  };

  if (!publication) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Publicación</DialogTitle>
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
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Tipo de publicación</Label>
            <Select
              value={formData.type || ""}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de publicación" />
              </SelectTrigger>
              <SelectContent>
                {publicationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="doi">DOI</Label>
            <Input
              id="doi"
              name="doi"
              value={formData.doi || ""}
              onChange={handleChange}
              placeholder="DOI"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="issn">ISSN</Label>
            <Input
              id="issn"
              name="issn"
              value={formData.issn || ""}
              onChange={handleChange}
              placeholder="ISSN"
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