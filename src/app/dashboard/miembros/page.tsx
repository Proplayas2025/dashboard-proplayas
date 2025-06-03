"use client";

import { useCallback, useEffect, useState, useMemo } from "react";

import { DataTable } from "@/components/members-table";
import { SiteHeader } from "@/components/site-header";
import { NodosService } from "@/lib/NodoService";
import { NodeMembers } from "@/interfaces/Nodes";
import { getCookie } from "@/lib/cookies";

export default function Page() {
  const nodo = useMemo(() => new NodosService(), []);
  const [members, setMembers] = useState<NodeMembers[]>([]);

  const fetchMembers = useCallback(async () => {
    const nodeId = getCookie("node_id");
    if (nodeId) {
      const res = await nodo.getNodoMembers(nodeId);
      setMembers(res?.data || []);
    }
  }, [nodo]);

  const handleToggleStatus = async (id: number) => {
    await nodo.toggleMemberStatus(id);
    fetchMembers();
  };

  const handleDelete = async (id: number) => {
    await nodo.deleteMember(id);
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable
              data={members}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}