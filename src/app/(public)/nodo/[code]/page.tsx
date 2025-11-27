"use client";

import { useEffect, useState } from "react";
import { NodosService } from "@/lib/NodoService";
import { Node, NodeMembers } from "@/interfaces/Nodes";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { NodoBio } from "@/components/Nodo/nodo-bio";
import { DataTable } from "@/components/Nodo/members-public-table";

export default function Page() {
  const { code } = useParams();
  const [nodo, setNodo] = useState<Node>();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<NodeMembers[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const fetchNode = async () => {
      setLoading(true);
      const nodoService = new NodosService();
      const res = await nodoService.getNodeBio(code as string);
      setNodo(res?.data || undefined);
      setLoading(false);
    };
    fetchNode();
  }, [code]);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoadingMembers(true);
      const nodoService = new NodosService();
      const res = await nodoService.getNodoMembers(code as string);
      setMembers(res?.data || []);
      setLoadingMembers(false);
    };
    fetchMembers();
  }, [code]);

  return (
    <div className="flex flex-1 flex-col p-5">
      <div className="@container/main flex flex-1 flex-col gap-2 mb-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
            <span className="text-gray-500 dark:text-gray-400">
              Cargando nodo...
            </span>
          </div>
        ) : nodo ? (
          <>
            <NodoBio nodo={nodo} />
            <h2 className="text-xl font-bold mt-8 mb-4">Miembros del nodo</h2>
            {loadingMembers ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="animate-spin h-6 w-6 text-gray-400 mb-2" />
                <span className="text-gray-500 dark:text-gray-400">
                  Cargando miembros...
                </span>
              </div>
            ) : (
              <DataTable data={members} />
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Nodo no encontrado.
          </div>
        )}
      </div>
    </div>
  );
}
