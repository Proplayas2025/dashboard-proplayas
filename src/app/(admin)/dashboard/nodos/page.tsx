"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { NodesTable } from "@/components/nodos-table";
import { SiteHeader } from "@/components/site-header";
import { NodosService } from "@/lib/NodoService";
import { Nodes } from "@/interfaces/Nodes";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import InviteNodeForm from "@/components/Forms/invitations/InviteNodeLeaderForm";
import InvitationService from "@/lib/InvitationService";
import {InviteNodeLeader} from "@/interfaces/Invitations";
import InvitationLinkDialog from "@/components/Forms/invitations/InvitationLinkDialog";
import { toast } from "sonner";

export default function Page() {
  const nodoService = useMemo(() => new NodosService(), []);
  const invitationService = useMemo(() => new InvitationService(), []);
  const [nodes, setNodes] = useState<Nodes[]>([]);
  const [pagination, setPagination] = useState({ current_page: 1, per_page: 50, total: 0, last_page: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [invitationToken, setInvitationToken] = useState<string | null>(null);
  const [invitedInfo, setInvitedInfo] = useState({ name: "", email: "" });

  const [search, setSearch] = useState("");


  const fetchNodes = useCallback(async (page: number = 1, searchTerm?: string) => {
    setLoading(true);
    try {
      const res = await nodoService.getPublicNodes(page, searchTerm ?? search);
      setNodes(res.data || []);
      setPagination(res.meta || { current_page: 1, per_page: 50, total: 0, last_page: 1 });
      setCurrentPage(page);
    } catch {
      setNodes([]);
      setPagination({ current_page: 1, per_page: 50, total: 0, last_page: 1 });
    }
    setLoading(false);
  }, [nodoService, search]);


  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    fetchNodes(1, value);
  }, [fetchNodes]);

  const handleToggleStatus = async (id: number) => {
    console.log(`usuario con id ${id} desactivado`);
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
  };

  const handleInviteSubmit = async (data: InviteNodeLeader) => {
    setInviteLoading(true);
    try {
      const res = await invitationService.createInvitationToNodeLeader(data);
      toast.success("Invitación enviada correctamente");
      // Show invitation link dialog for manual sharing
      const token = res?.data?.token;
      if (token) {
        setInvitationToken(token);
        setInvitedInfo({ name: data.name, email: data.email });
        setShowLinkDialog(true);
      }
      fetchNodes();
    } catch {
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
                page={currentPage}
                pageSize={pagination.per_page}
                total={pagination.total}
                onPageChange={fetchNodes}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                onSearch={handleSearch}
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
      <InvitationLinkDialog
        open={showLinkDialog}
        onOpenChange={setShowLinkDialog}
        invitationToken={invitationToken}
        invitedName={invitedInfo.name}
        invitedEmail={invitedInfo.email}
      />
    </>
  );
}