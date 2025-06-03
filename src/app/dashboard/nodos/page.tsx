"use client";

import { useEffect, useState } from "react";
import { NodesTable } from "@/components/nodos-table";
import { SiteHeader } from "@/components/site-header";
import { NodosService } from "@/lib/NodoService";
import { Nodes } from "@/interfaces/Nodes";

export default function Page() {
  const nodoService = new NodosService();
  const [nodes, setNodes] = useState<Nodes[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNodes = async () => {
    setLoading(true);
    try {
      const res = await nodoService.getPublicNodes();
      setNodes(res?.data || []);
    } catch (e) {
      setNodes([]);
    }
    setLoading(false);
  };

  const handleToggleStatus = async (id: number) => {
    // Aquí podrías implementar la lógica para activar/desactivar el nodo si tu API lo permite
    // Por ahora solo recargamos la lista
    fetchNodes();
  };

  const handleDelete = async (id: number) => {
    await nodoService.deleteNode(id);
    fetchNodes();
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <NodesTable
              data={nodes}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}