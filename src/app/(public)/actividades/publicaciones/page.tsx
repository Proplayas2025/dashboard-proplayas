"use client";

import { useEffect, useState, useCallback } from "react";
import { PublicationCard } from "@/components/Act-ui/Publication";
import { Publications } from "@/interfaces/Content";
import { ContentController } from "@/lib/ContentController";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicacionesPage() {
  const [publications, setPublications] = useState<Publications[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPublications = useCallback(async () => {
    setLoading(true);
    try {
      const content = new ContentController();
      const res = await content.getContent("publications", page, 20);
      setPublications(res?.data || []);
      setTotalPages(res?.meta?.last_page || 1);
    } catch {
      setPublications([]);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

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
      {!loading && publications.length > 0 && totalPages > 1 && (
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