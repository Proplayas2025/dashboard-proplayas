"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { NodesTable } from "@/components/nodos-public-table";
import { NodosService } from "@/lib/NodoService";
import { Nodes } from "@/interfaces/Nodes";
import { Loader2 } from "lucide-react";

export default function Page() {
  const nodoService = useMemo(() => new NodosService(), []);
  const [nodes, setNodes] = useState<Nodes[]>([]);
  const [pagination, setPagination] = useState({ current_page: 1, per_page: 50, total: 0, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNodes = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await nodoService.getPublicNodes(page);
      setNodes(res.data || []);
      setPagination(res.meta || { current_page: 1, per_page: 50, total: 0, last_page: 1 });
      setCurrentPage(page);
    } catch {
      setNodes([]);
      setPagination({ current_page: 1, per_page: 50, total: 0, last_page: 1 });
    }
    setLoading(false);
  }, [nodoService]);

  useEffect(() => {
    fetchNodes();
  }, [fetchNodes]);

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-2 md:py-6 px-4 lg:px-6">
            <h2 className="text-2xl font-bold mb-2 text-cyan-800 dark:text-white">
              Nodos de la Red
            </h2>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
                <span className="text-gray-500 dark:text-gray-400">
                  Cargando nodos...
                </span>
              </div>
            ) : (
              <NodesTable 
                data={nodes} 
                page={currentPage}
                pageSize={pagination.per_page}
                total={pagination.total}
                onPageChange={fetchNodes}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
