"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { NodosService } from "@/lib/NodoService";
import { Node } from "@/interfaces/Nodes";
import { getCookie } from "@/lib/cookies";
import { getProfileUrl, getFileUrl } from "@/lib/image-utils";
import Image from "next/image";

import {
  EditNodeFormModal,
  EditNodeImageModal,
  EditNodeMemorandumModal
} from "@/components/Forms/nodo/EditNode";
import { IconPencil } from "@tabler/icons-react";
import { Loader2, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const nodoService = useMemo(() => new NodosService(), []);
  const [nodo, setNodo] = useState<Node>();
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showEditImage, setShowEditImage] = useState(false);
  const [showEditMemorandum, setShowEditMemorandum] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const truncateText = (text: string | null | undefined, wordLimit: number) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  
  const shouldShowButton = (text: string | null | undefined, wordLimit: number) => {
    if (!text) return false;
    return text.split(/\s+/).length > wordLimit;
  };

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
        {/* Esta es  la card que muestra la informacion */}
        <div className="@container/main flex flex-1 flex-col gap-2 mb-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
              <span className="text-gray-500 dark:text-gray-400">
                Cargando nodo...
              </span>
            </div>
          ) : (
            <Card className="p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(600px,_1fr)] gap-6 relative">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative w-32 h-32 md:w-48 md:h-48 group">
                    <Image
                      width={192}
                      height={192}
                      src={getProfileUrl(nodo?.profile_picture) || "/proplayas_img.jpg"}
                      alt="Foto de perfil"
                      className="w-full h-full rounded-full border-2 border-gray-300 object-cover"
                      unoptimized
                    />
                  <button
                    onClick={() => setShowEditImage(true)}
                    className="absolute top-2 right-2 bg-white dark:bg-zinc-800 p-1 rounded-full shadow hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <IconPencil
                      size={18}
                      className="text-gray-700 dark:text-zinc-200"
                    />
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
                    className="bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-gray-100 p-1 rounded-full shadow"
                  >
                    <IconPencil size={18} />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-500 dark:text-white">
                    Sobre el nodo
                  </h1>
                  <div className="text-gray-600 dark:text-white mt-2">
                    <p className="whitespace-pre-wrap">
                      {isExpanded ? nodo?.about : truncateText(nodo?.about, 50)}
                    </p>
                    {shouldShowButton(nodo?.about, 50) && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 text-sm mt-2 transition"
                      >
                        {isExpanded ? "Ver menos" : "Ver más"}
                      </button>
                    )}
                  </div>
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
            </Card>
          )}
        </div>
        {/* esta parte solo mostrara el memorandum el cual es un archivo */}
        <div className="flex justify-start items-center gap-4">
          {nodo?.memorandum ? (
            <Card className="w-full max-w-md flex flex-col items-center p-6 border border-gray-200 dark:border-zinc-700 relative">
              <button
                onClick={() => setShowEditMemorandum(true)}
                className="absolute top-4 right-4 bg-white dark:bg-zinc-800 p-1 rounded-full shadow hover:bg-gray-100 dark:hover:bg-zinc-700"
                title="Editar Memorándum"
              >
                <IconPencil
                  size={18}
                  className="text-gray-700 dark:text-zinc-200"
                />
              </button>
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-xl font-bold text-gray-700 dark:text-white mb-2">
                  Memorándum
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <a
                  href={getFileUrl(nodo.memorandum) || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                >
                  <FileText className="h-16 w-16 text-blue-500 group-hover:text-blue-700 transition mb-2" />
                  <span className="text-blue-600 group-hover:underline dark:text-blue-400">
                    Ver Memorándum PDF
                  </span>
                </a>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full max-w-md flex flex-col items-center p-6 border border-gray-200 dark:border-zinc-700 relative">
              <button
                onClick={() => setShowEditMemorandum(true)}
                className="absolute top-4 right-4 bg-white dark:bg-zinc-800 p-1 rounded-full shadow hover:bg-gray-100 dark:hover:bg-zinc-700"
                title="Subir Memorándum"
              >
                <IconPencil
                  size={18}
                  className="text-gray-700 dark:text-zinc-200"
                />
              </button>
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-xl font-bold text-gray-700 dark:text-white mb-2">
                  Memorándum
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <FileText className="h-16 w-16 text-gray-400 mb-2" />
                <span className="text-gray-400">No disponible</span>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      {/* modales de edicion */}
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
              setNodo((prev) =>
                prev ? { ...prev, profile_picture: newFileName } : prev
              )
            }
          />
          <EditNodeMemorandumModal
            isOpen={showEditMemorandum}
            onClose={() => setShowEditMemorandum(false)}
            nodeCode={nodo.code}
            onUpload={(newFileUrl) =>
              setNodo((prev) =>
                prev ? { ...prev, memorandum: newFileUrl } : prev
              )
            }
          />
        </>
      )}
    </>
  );
}
