"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { ContentController } from "@/lib/ContentController";
import { Publications } from "@/interfaces/Content";
import { PublicationCard } from "@/components/Cards/Publications";
import { EditPublicationModal } from "@/components/Forms/publicaciones/EditPublication";
import { CreatePublicationModal } from "@/components/Forms/publicaciones/CreatePublication";
import { EditCoverImageModal, EditAttachmentFileModal } from "@/components/Forms/Acomposables/EditFiles";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getCookie } from "@/lib/cookies";


export default function Page() {
  const content = useMemo(() => new ContentController(), []);
  const [publications, setPublications] = useState<Publications[]>([]);
  const [editPublication, setEditPublication] = useState<Publications | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
      toast.success("La publicación se ha eliminado con éxito");
    } catch (err) {
      console.error("Error al eliminar la publicación", err);
      toast.error("Ocurrió un error al eliminar la publicación");
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
        toast.success("La publicación se ha actualizado con éxito");
      }
    } catch (err) {
      console.error("Error al actualizar la publicación", err);
      toast.error("Ocurrió un error al actualizar la publicación");
    }
    setShowEdit(false);
  };

  const handleCreate = async (data: Record<string, unknown>, coverImage?: File, attachmentFile?: File) => {
    try {
      const res = await content.createContent("publication", data);
      if (res?.data) {
        // Si hay archivos, subirlos después de crear el contenido
        if (coverImage) {
          await content.uploadImage("publication", res.data.id, coverImage);
        }
        if (attachmentFile) {
          await content.uploadFile("publication", res.data.id, attachmentFile);
        }
        await fetchPublications(); // Refrescar la lista para mostrar los archivos subidos
        toast.success("La publicación se ha creado con éxito");
      }
    } catch{
      toast.error("Ocurrió un error al crear la publicación");
    }
    setShowCreate(false);
  };

  // Handler para subir imagen de portada
  const handleUploadImage = async (publication: Publications, file: File) => {
    try {
      await content.uploadImage("publication", publication.id, file);
      await fetchPublications();
      toast.success("La imagen de portada se ha actualizado con éxito");
    } catch {
      toast.error("Ocurrió un error al subir la imagen de portada");
    }
    setShowImageModal(null);
  };

  // Handler para subir archivo adjunto
  const handleUploadFile = async (publication: Publications, file: File) => {
    try {
      await content.uploadFile("publication", publication.id, file);
      await fetchPublications();
      toast.success("El archivo adjunto se ha actualizado con éxito");
    } catch {
      toast.error("Ocurrió un error al subir el archivo adjunto");
    }
    setShowFileModal(null);
  };

  const fetchPublications = useCallback(async () => {
    setLoading(true);
    try {
      const role = getCookie("role");
      const res = role === "admin"
        ? await content.getContentAll("publications", page, 20)
        : await content.getContentAuthor("publications", page, 20);
      setPublications(res?.data || []);
      setTotalPages(res?.meta?.last_page || 1);
    } catch {
      toast.error("Ocurrió un error al cargar las publicaciones");
    }
    setLoading(false);
  }, [content, page]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  return (
    <>
      <SiteHeader />
      <div className="flex justify-end px-4 mt-4">
        <Button onClick={() => setShowCreate(true)}>+ Crear publicación</Button>
      </div>
      <div className="grid gap-4 p-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", }}>
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
      {!loading && publications.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 p-4">
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Siguiente
          </Button>
        </div>
      )}
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
