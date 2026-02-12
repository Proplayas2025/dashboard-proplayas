"use client";
import React, { useState, useEffect } from "react";
import { Events } from "@/interfaces/Content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Events | null;
  onSave: (updated: Events) => void;
}

const eventTypes = [
  "event", "taller", "clase", "curso", "seminario", "foro", "conferencia", "congreso", "webinar"
] as const;

const formats = ["presencial", "online"] as const;

export const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Events>>({});

  useEffect(() => {
    if (event) setFormData(event);
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof Events, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && event) {
      onSave({ ...event, ...formData } as Events);
      onClose();
    }
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Evento</DialogTitle>
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
            <Label htmlFor="event_date">Fecha y hora</Label>
            <Input
              id="event_date"
              name="event_date"
              type="datetime-local"
              value={
                formData.event_date
                  ? formData.event_date.toString().slice(0, 16)
                  : ""
              }
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Tipo de evento</Label>
            <Select
              value={formData.event_type || ""}
              onValueChange={(value) => handleSelectChange("event_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de evento" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Formato</Label>
            <Select
              value={formData.event_format || ""}
              onValueChange={(value) => handleSelectChange("event_format", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format.charAt(0).toUpperCase() + format.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="location">Lugar</Label>
            <Input
              id="location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Lugar"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="link">Enlace</Label>
            <Input
              id="link"
              name="link"
              value={formData.link || ""}
              onChange={handleChange}
              placeholder="Enlace"
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