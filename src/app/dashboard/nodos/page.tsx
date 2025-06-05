"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { NodesTable } from "@/components/nodos-table";
import { SiteHeader } from "@/components/site-header";
import { NodosService } from "@/lib/NodoService";
import { Nodes } from "@/interfaces/Nodes";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import InviteNodeForm from "@/components/Forms/register/InviteNodeForm";
import InvitationService from "@/lib/InvitationService";
import { toast } from "sonner"; // Si usas alguna librería de notificaciones

export default function Page() {
  const nodoService = useMemo(() => new NodosService(), []);
  const invitationService = useMemo(() => new InvitationService(), []);
  const [nodes, setNodes] = useState<Nodes[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);

  const fetchNodes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await nodoService.getPublicNodes();
      setNodes(res?.data || []);
    } catch {
      setNodes([]);
    }
    setLoading(false);
  }, [nodoService]);

  const handleToggleStatus = async (id: number) => {
    // Aquí podrías implementar la lógica para activar/desactivar el nodo si tu API lo permite
    // Por ahora solo recargamos la lista
    fetchNodes();
  };

  const handleDelete = async (id: number) => {
    await nodoService.deleteNode(id);
    fetchNodes();
  };

  const handleAdd = () => {
    setShowModal(true);
    // Aquí puedes abrir tu modal
  };

  const handleInviteSubmit = async (data: any) => {
    setInviteLoading(true);
    try {
      await invitationService.createInvitationToNodeLeader(data);
      toast.success("Invitación enviada correctamente");
      fetchNodes();
    } catch (error) {
      toast.error("Error al enviar la invitación");
    }
    setInviteLoading(false);
  };

  useEffect(() => {
    fetchNodes();
  }, [fetchNodes]);

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex justify-start px-4 lg:px-6 mt-4">
          <Button variant="outline" size="sm" onClick={handleAdd}>
            <IconPlus />
            <span className="hidden lg:inline">Añadir nodo</span>
          </Button>
        </div>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-2 md:py-6">
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
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
      <InviteNodeForm
        open={showModal}
        onOpenChange={setShowModal}
        onSubmit={handleInviteSubmit}
        loading={inviteLoading}
      />
    </>
  );
}