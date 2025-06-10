"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { DataTable } from "@/components/members-table";
import { SiteHeader } from "@/components/site-header";
import { NodosService } from "@/lib/NodoService";
import { NodeMembers } from "@/interfaces/Nodes";
import { getCookie } from "@/lib/cookies";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import InviteNodeMemberForm from "@/components/Forms/invitations/InviteNodeMember";
import InvitationService from "@/lib/InvitationService";
import type { InviteNodeMember } from "@/interfaces/Invitations";

import { toast } from "sonner";

export default function Page() {
  const nodo = useMemo(() => new NodosService(), []);
  const invitationService = useMemo(() => new InvitationService(), []);
  const [members, setMembers] = useState<NodeMembers[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const nodeId = getCookie("node_id");
      if (nodeId) {
        const res = await nodo.getNodoMembers(nodeId);
        setMembers(res?.data || []);
      }
    } catch {
      setMembers([]);
    }
    setLoading(false);
  }, [nodo]);

  const handleToggleStatus = async (id: number) => {
    await nodo.toggleMemberStatus(id);
    fetchMembers();
  };

  const handleDelete = async (id: number) => {
    await nodo.deleteMember(id);
    fetchMembers();
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleInviteSubmit = async (data: InviteNodeMember) => {
    setInviteLoading(true);
    try {
      await invitationService.createInvitationToNodeMember(data);
      toast.success("Invitación enviada correctamente");
      fetchMembers();
    } catch {
      toast.error("Error al enviar la invitación");
    }
    setInviteLoading(false);
    setShowModal(false);
  };

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex justify-start px-4 lg:px-6 mt-4">
          <Button variant="outline" size="sm" onClick={handleAdd}>
            <IconPlus />
            <span className="hidden lg:inline">Añadir miembro</span>
          </Button>
        </div>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
                <span className="text-gray-500 dark:text-gray-400">
                  Cargando miembros...
                </span>
              </div>
            ) : (
              <DataTable
                data={members}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
      <InviteNodeMemberForm
        open={showModal}
        onOpenChange={setShowModal}
        onSubmit={handleInviteSubmit}
        loading={inviteLoading}
      />
    </>
  );
}