"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { InvitationsTable, Invitation } from "@/components/invitations-table";
import { SiteHeader } from "@/components/site-header";
import InvitationService from "@/lib/InvitationService";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDashboardAccess } from "@/hooks/use-dashboard-access";

export default function Page() {
  useDashboardAccess();
  
  const invitationService = useMemo(() => new InvitationService(), []);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvitations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await invitationService.getPendingInvitations();
      const transformedData = (res.data || []).map((item) => ({
        ...item,
        name: item.name || "",
      }));
      setInvitations(transformedData);
    } catch (error) {
      console.error("Error al cargar invitaciones:", error);
      toast.error("Error al cargar invitaciones");
      setInvitations([]);
    }
    setLoading(false);
  }, [invitationService]);

  const handleCancel = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta invitación?")) {
      return;
    }

    try {
      await invitationService.cancelInvitation(id);
      toast.success("Invitación cancelada exitosamente");
      fetchInvitations();
    } catch (error) {
      console.error("Error al cancelar invitación:", error);
      toast.error("Error al cancelar la invitación");
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-2 md:py-6">
            <h2 className="text-2xl font-bold mb-2">
              Invitaciones Pendientes
            </h2>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
                <span className="text-gray-500 dark:text-gray-400">
                  Cargando invitaciones...
                </span>
              </div>
            ) : (
              <InvitationsTable
                data={invitations}
                onCancel={handleCancel}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
