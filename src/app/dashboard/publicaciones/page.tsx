"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { ContentController } from "@/lib/ContentController";
import { Publications } from "@/interfaces/Content";
import { PublicationCard } from "@/components/Cards/Publications";
import { EditPublicationModal } from "@/components/Forms/publicaciones/EditPublication";
import { CreatePublicationModal } from "@/components/Forms/publicaciones/CreatePublication";
import { EditCoverImageModal, EditAttachmentFileModal } from "@/components/Forms/publicaciones/EditFiles";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


export default function Page() {
  // Usar useMemo para la instancia de ContentController
  const content = useMemo(() => new ContentController(), []);
  const [publications, setPublications] = useState<Publications[]>([]);
  const [editPublication, setEditPublication] = useState<Publications | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showImageModal, setShowImageModal] = useState<Publications | null>(null);
  const [showFileModal, setShowFileModal] = useState<Publications | null>(null);

  const handleEdit = (publication: Publications) => {
    setEditPublication(publication);
    setShowEdit(true);
  };

  const handleDelete = async (publication: Publications) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) return;
    try {
      await content.deleteContent("publication", publication.id);
      setPublications((prev) => prev.filter((pub) => pub.id !== publication.id));
    } catch (err) {
      console.error("Error al eliminar la publicación", err);
    }
  };

  const handleSave = async (updated: Publications) => {
    const payload = {
      type: updated.type,
      title: updated.title,
      description: updated.description,
      link: updated.link,
      doi: updated.doi,
      issn: updated.issn,
      cover_image_url: updated.cover_image_url,
      file_url: updated.file_url,
    };
    try {
      const res = await content.updateContent("publication", updated.id, payload);
      if (res?.data) {
        setPublications((prev) =>
          prev.map((pub) => (pub.id === updated.id ? res.data : pub))
        );
      }
    } catch (err) {
      console.error("Error al actualizar la publicación", err);
    }
    setShowEdit(false);
  };

  const handleCreate = async (formData: FormData) => {
    try {
      const res = await content.createContent("publication", formData);
      if (res?.data) {
        setPublications((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      console.error("Error al crear la publicación", err);
    }
    setShowCreate(false);
  };

  // Nuevo: handler para subir imagen de portada
  const handleUploadImage = async (publication: Publications, file: File) => {
    try {
      await content.uploadImage("publication", publication.id, file);
      await fetchPublications();
    } catch (err) {
      console.error("Error al subir la imagen de portada", err);
    }
    setShowImageModal(null);
  };

  // Nuevo: handler para subir archivo adjunto
  const handleUploadFile = async (publication: Publications, file: File) => {
    try {
      await content.uploadFile("publication", publication.id, file);
      await fetchPublications();
    } catch (err) {
      console.error("Error al subir el archivo adjunto", err);
    }
    setShowFileModal(null);
  };

  // Envolver fetchPublications en useCallback y agregar content como dependencia
  const fetchPublications = useCallback(async () => {
    setLoading(true);
    const res = await content.getContentAuthor("publications");
    setPublications(res?.data || []);
    setLoading(false);
  }, [content]);

  // Agregar fetchPublications al array de dependencias
  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  return (
    <>
      <SiteHeader />
      <div className="flex justify-end px-4 mt-4">
        <Button onClick={() => setShowCreate(true)}>+ Crear publicación</Button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
            <span className="text-gray-500 dark:text-gray-400">Cargando publicaciones...</span>
          </div>
        ) : publications.length > 0 ? (
          publications.map((publication) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onChangeImage={() => setShowImageModal(publication)}
              onChangeFile={() => setShowFileModal(publication)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay publicaciones registradas.
          </div>
        )}
      </div>
      <EditPublicationModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        publication={editPublication}
        onSave={handleSave}
      />
      <CreatePublicationModal
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
