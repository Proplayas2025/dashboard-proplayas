"use client";

import { useEffect, useState } from "react";
import { PublicationCard } from "@/components/Act-ui/Publication";
import { Publications } from "@/interfaces/Content";
import { ContentController } from "@/lib/ContentController";
import { Loader2 } from "lucide-react";

export default function PublicacionesPage() {
  const [publications, setPublications] = useState<Publications[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      try {
        const content = new ContentController();
        const res = await content.getContent("publications");
        setPublications(res.data || []);
      } catch {
        setPublications([]);
      }
      setLoading(false);
    };
    fetchPublications();
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
            <span className="text-gray-500 dark:text-gray-400">Cargando publicaciones...</span>
          </div>
        ) : publications.length > 0 ? (
          publications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay publicaciones registradas.
          </div>
        )}
      </div>
    </div>
  );
}