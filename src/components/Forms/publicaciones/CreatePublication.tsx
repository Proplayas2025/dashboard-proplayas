"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const publicationTypes = ["boletin", "guia", "articulo"] as const;

interface CreatePublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
}

export const CreatePublicationModal: React.FC<CreatePublicationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    link: "",
    doi: "",
    issn: "",
    cover_image_file: null as File | null,
    cover_image_url: "",
    file_file: null as File | null,
    file_url: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("type", formData.type);
    data.append("description", formData.description);
    if (formData.link) data.append("link", formData.link);
    if (formData.doi) data.append("doi", formData.doi);
    if (formData.issn) data.append("issn", formData.issn);
    if (formData.cover_image_file) data.append("cover_image_file", formData.cover_image_file);
    if (formData.cover_image_url) data.append("cover_image_url", formData.cover_image_url);
    if (formData.file_file) data.append("file_file", formData.file_file);
    if (formData.file_url) data.append("file_url", formData.file_url);

    onSave(data);
    onClose();
    setFormData({
      title: "",
      type: "",
      description: "",
      link: "",
      doi: "",
      issn: "",
      cover_image_file: null,
      cover_image_url: "",
      file_file: null,
      file_url: "",
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
          <DialogTitle>Crear Publicación</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
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
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Tipo de publicación</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
              required
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
              value={formData.link}
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
              value={formData.doi}
              onChange={handleChange}
              placeholder="DOI"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="issn">ISSN</Label>
            <Input
              id="issn"
              name="issn"
              value={formData.issn}
              onChange={handleChange}
              placeholder="ISSN"
            />
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
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md mt-2"
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