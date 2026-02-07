"use client";

import { useEffect, useState, useCallback } from "react";
import { ProyectoCard } from "@/components/Act-ui/Proyectos";
import { Projects } from "@/interfaces/Content";
import { ContentController } from "@/lib/ContentController";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const content = new ContentController();
      const res = await content.getContent("projects", page, 20);
      setProjects(res?.data || []);
      setTotalPages(res?.meta?.last_page || 1);
    } catch {
      setProjects([]);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))" }}
      >
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
            <span className="text-gray-500 dark:text-gray-400">Cargando proyectos...</span>
          </div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <ProyectoCard key={project.id} proyecto={project} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay proyectos registrados.
          </div>
        )}
      </div>
      {!loading && projects.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 p-4 mt-4">
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
    </div>
  );
}