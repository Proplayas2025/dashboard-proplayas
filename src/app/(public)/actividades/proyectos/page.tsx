"use client";

import { useEffect, useState } from "react";
import { ProyectoCard } from "@/components/Act-ui/Proyectos";
import { Projects } from "@/interfaces/Content";
import { ContentController } from "@/lib/ContentController";
import { Loader2 } from "lucide-react";

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const content = new ContentController();
        const res = await content.getContent("projects");
        setProjects(res || []);
      } catch {
        setProjects([]);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

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
    </div>
  );
}