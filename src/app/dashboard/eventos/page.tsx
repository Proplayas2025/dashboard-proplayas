"use client";
import { useCallback, useEffect, useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { ContentController } from "@/lib/ContentController";
import { Events } from "@/interfaces/Content";
import { EventCard } from "@/components/Cards/Events";
import { EditEventModal } from "@/components/Forms/eventos/EditEvent";
import { CreateEventModal } from "@/components/Forms/eventos/CreateEvent";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { EditCoverImageModal, EditAttachmentFileModal } from "@/components/Forms/publicaciones/EditFiles";
import { toast } from "sonner";

export default function Page() {
  const content = useMemo(() => new ContentController(), []);
  const [events, setEvents] = useState<Events[]>([]);
  const [editEvent, setEditEvent] = useState<Events | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados para los modales de imagen y archivo
  const [showImageModal, setShowImageModal] = useState<Events | null>(null);
  const [showFileModal, setShowFileModal] = useState<Events | null>(null);

  const handleEdit = (event: Events) => {
    setEditEvent(event);
    setShowEdit(true);
  };

  const handleDelete = async (event: Events) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este evento?")) return;
    try {
      await content.deleteContent("event", event.id);
      setEvents((prev) => prev.filter((ev) => ev.id !== event.id));
      toast.success("El evento se ha eliminado con éxito");
    } catch (err) {
      console.error("Error al eliminar el evento", err);
      toast.error("Ocurrió un error al eliminar el evento");
    }
  };

  const handleSave = async (updated: Events) => {
    const payload = {
      title: updated.title,
      description: updated.description,
      date: updated.date,
      type: updated.type,
      format: updated.format,
      location: updated.location,
      link: updated.link,
    };
    try {
      const res = await content.updateContent("event", updated.id, payload);
      if (res?.data) {
        setEvents((prev) =>
          prev.map((ev) => (ev.id === updated.id ? res.data : ev))
        );
        toast.success("El evento se ha actualizado con éxito");
      }
    } catch (err) {
      console.error("Error al actualizar el evento", err);
      toast.error("Ocurrió un error al actualizar el evento");
    }
    setShowEdit(false);
  };

  const handleCreate = async (formData: FormData) => {
    try {
      const res = await content.createContent("event", formData);
      if (res?.data) {
        setEvents((prev) => [res.data, ...prev]);
        toast.success("El evento se ha creado con éxito");
      }
    } catch (err) {
      console.error("Error al crear el evento", err);
      toast.error("Ocurrió un error al crear el evento");
    }
    setShowCreate(false);
  };

  // Handler para subir imagen de portada
  const handleUploadImage = async (event: Events, file: File) => {
    try {
      await content.uploadImage("event", event.id, file);
      await fetchEvents();
      toast.success("La imagen de portada se ha actualizado con éxito");
    } catch (err) {
      console.error("Error al subir la imagen de portada", err);
      toast.error("Ocurrió un error al subir la imagen de portada");
    }
    setShowImageModal(null);
  };

  // Handler para subir archivo adjunto
  const handleUploadFile = async (event: Events, file: File) => {
    try {
      await content.uploadFile("event", event.id, file);
      await fetchEvents();
      toast.success("El archivo adjunto se ha actualizado con éxito");
    } catch (err) {
      console.error("Error al subir el archivo adjunto", err);
      toast.error("Ocurrió un error al subir el archivo adjunto");
    }
    setShowFileModal(null);
  };

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await content.getContentAuthor("events");
      setEvents(res?.data || []);
    } catch  {
      toast.error("Ocurrió un error al cargar los eventos");
    }
    setLoading(false);
  }, [content]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <>
      <SiteHeader />
      <div className="flex justify-end px-4 mt-4">
        <Button onClick={() => setShowCreate(true)}>+ Crear evento</Button>
      </div>
      <div className="grid gap-4 p-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", }}>
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
            <span className="text-gray-500 dark:text-gray-400">Cargando eventos...</span>
          </div>
        ) : events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onChangeImage={() => setShowImageModal(event)}
              onChangeFile={() => setShowFileModal(event)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay eventos registrados.
          </div>
        )}
      </div>
      <EditEventModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        event={editEvent}
        onSave={handleSave}
      />
      <CreateEventModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSave={handleCreate}
      />
      <EditCoverImageModal
        isOpen={!!showImageModal}
        item={showImageModal}
        onClose={() => setShowImageModal(null)}
        onSave={handleUploadImage}
      />
      <EditAttachmentFileModal
        isOpen={!!showFileModal}
        item={showFileModal}
        onClose={() => setShowFileModal(null)}
        onSave={handleUploadFile}
      />
    </>
  );
}
