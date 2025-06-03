"use client";
import React, { useState, useEffect } from "react";
import { Books } from "@/interfaces/Content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Books | null;
  onSave: (updated: Books) => void;
}

export const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
  book,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Books>>({});

  useEffect(() => {
    if (book) setFormData(book);
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && book) {
      onSave({ ...book, ...formData } as Books);
      onClose();
    }
  };

  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Libro</DialogTitle>
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
            <Label htmlFor="book_author">Autor</Label>
            <Input
              id="book_author"
              name="book_author"
              value={formData.book_author || ""}
              onChange={handleChange}
              placeholder="Autor"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="publication_date">Fecha de publicación</Label>
            <Input
              id="publication_date"
              name="publication_date"
              type="date"
              value={formData.publication_date || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              name="isbn"
              value={formData.isbn || ""}
              onChange={handleChange}
              placeholder="ISBN"
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