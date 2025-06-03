"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { NodosService } from "@/lib/NodoService";
import { Node } from "@/interfaces/Nodes";
import { getCookie } from "@/lib/cookies";
import Image from "next/image";

import { EditNodeFormModal, EditNodeImageModal } from "@/components/Forms/NodeForm";
import { IconPencil } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";

export default function Page() {
  const nodoService = useMemo(() => new NodosService(), []);
  const [nodo, setNodo] = useState<Node>();
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showEditImage, setShowEditImage] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNodeBio = useCallback(async () => {
    setLoading(true);
    const code = getCookie("node_id");
    if (!code) {
      console.error("No node code found in cookies");
      setLoading(false);
      return;
    }
    const res = await nodoService.getNodeBio(code);
    setNodo(res?.data || undefined);
    setLoading(false);
  }, [nodoService]);

  useEffect(() => {
    fetchNodeBio();
  }, [fetchNodeBio]);

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 mb-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
              <span className="text-gray-500 dark:text-gray-400">Cargando nodo...</span>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(600px,_1fr)] gap-6 relative">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative w-32 h-32 md:w-48 md:h-48 group">
                  {process.env.NEXT_PUBLIC_PROFILE_COVER_URL && nodo?.profile_picture ? (
                    <Image
                      width={192}
                      height={192}
                      src={`${process.env.NEXT_PUBLIC_PROFILE_COVER_URL}${nodo.profile_picture}`}
                      alt="Foto de perfil"
                      className="w-full h-full rounded-full border-2 border-gray-300 object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full border-2 border-gray-300">
                      <span className="text-gray-400">Sin foto</span>
                    </div>
                  )}
                  <button
                    onClick={() => setShowEditImage(true)}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
                  >
                    <IconPencil size={18} />
                  </button>
                </div>
                <div className="my-3 text-center md:text-left">
                  <h1 className="text-2xl font-semibold text-gray-500 dark:text-white">
                    {nodo?.name}
                  </h1>
                </div>
                <div className="flex gap-2 text-gray-500 dark:text-white">
                  <p>
                    {nodo?.city}, {nodo?.country}
                  </p>
                </div>
                <p className="text-gray-400 dark:text-white text-center md:text-left">
                  Se unió a proplayas en {nodo?.joined_in}
                </p>
              </div>

              <div className="flex flex-col justify-between relative">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setShowEditInfo(true)}
                    className="bg-white p-1 rounded-full shadow hover:bg-gray-100"
                  >
                    <IconPencil size={18} />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-500 dark:text-white">
                    Sobre el nodo
                  </h1>
                  <p className="text-gray-600 dark:text-white mt-2">
                    {nodo?.about}
                  </p>
                </div>

                {nodo?.social_media && nodo.social_media.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-500 dark:text-white">
                      Redes Sociales:
                    </h2>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {nodo.social_media.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition"
                        >
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {nodo && (
        <>
          <EditNodeFormModal
            isOpen={showEditInfo}
            onClose={() => setShowEditInfo(false)}
            defaultValues={nodo}
            onSave={(updated) => setNodo(updated)}
          />
          <EditNodeImageModal
            isOpen={showEditImage}
            onClose={() => setShowEditImage(false)}
            nodeCode={nodo.code}
            onUpload={(newFileName) =>
              setNodo((prev) => (prev ? { ...prev, profile_picture: newFileName } : prev))
            }
          />
        </>
      )}
    </>
  );
}
