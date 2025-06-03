"use client";
import { useCallback, useEffect, useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { ContentController } from "@/lib/ContentController";
import { Projects } from "@/interfaces/Content";
import { ProyectoCard } from "@/components/Cards/Proyectos";
import { EditProyectoModal } from "@/components/Forms/proyectos/EditProyecto";
import { CreateProyectoModal } from "@/components/Forms/proyectos/CreateProyecto";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { EditCoverImageModal, EditAttachmentFileModal } from "@/components/Forms/publicaciones/EditFiles";

export default function Page() {
  const content = useMemo(() => new ContentController(), []);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [editProject, setEditProject] = useState<Projects | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados para los modales de imagen y archivo
  const [showImageModal, setShowImageModal] = useState<Projects | null>(null);
  const [showFileModal, setShowFileModal] = useState<Projects | null>(null);

  const handleEdit = (project: Projects) => {
    setEditProject(project);
    setShowEdit(true);
  };

  const handleDelete = async (project: Projects) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")) return;
    try {
      await content.deleteContent("project", project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch (err) {
      console.error("Error al eliminar el proyecto", err);
    }
  };

  const handleSave = async (updated: Projects) => {
    const payload = {
      title: updated.title,
      description: updated.description,
      date: updated.date,
      location: updated.location,
      link: updated.link,
      cover_image_url: updated.cover_image_url,
      file_url: updated.file_url,
      participants: updated.participants,
    };
    try {
      const res = await content.updateContent("project", updated.id, payload);
      if (res?.data) {
        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? res.data : p))
        );
      }
    } catch (err) {
      console.error("Error al actualizar el proyecto", err);
    }
    setShowEdit(false);
  };

  const handleCreate = async (formData: FormData) => {
    try {
      const res = await content.createContent("project", formData);
      if (res?.data) {
        setProjects((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      console.error("Error al crear el proyecto", err);
    }
    setShowCreate(false);
  };

  // Handler para subir imagen de portada
  const handleUploadImage = async (project: Projects, file: File) => {
    try {
      await content.uploadImage("project", project.id, file);
      await fetchProjects();
    } catch (err) {
      console.error("Error al subir la imagen de portada", err);
    }
    setShowImageModal(null);
  };

  // Handler para subir archivo adjunto
  const handleUploadFile = async (project: Projects, file: File) => {
    try {
      await content.uploadFile("project", project.id, file);
      await fetchProjects();
    } catch (err) {
      console.error("Error al subir el archivo adjunto", err);
    }
    setShowFileModal(null);
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const res = await content.getContentAuthor("projects");
    setProjects(res?.data || []);
    setLoading(false);
  }, [content]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <>
      <SiteHeader />
      <div className="flex justify-end px-4 mt-4">
        <Button onClick={() => setShowCreate(true)}>+ Crear proyecto</Button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
            <span className="text-gray-500 dark:text-gray-400">Cargando proyectos...</span>
          </div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <ProyectoCard
              key={project.id}
              proyecto={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onChangeImage={() => setShowImageModal(project)}
              onChangeFile={() => setShowFileModal(project)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay proyectos registrados.
          </div>
        )}
      </div>
      <EditProyectoModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        proyecto={editProject}
        onSave={handleSave}
      />
      <CreateProyectoModal
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