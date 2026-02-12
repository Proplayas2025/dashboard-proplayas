"use client";

import { useState } from "react";
import Image from "next/image";
import { Node } from "@/interfaces/Nodes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { getProfileUrl, getFileUrl } from "@/lib/image-utils";
interface NodoBioProps {
  nodo: Node;
}
import { Button } from "@/components/ui/button";
export function NodoBio({ nodo }: NodoBioProps) {
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
  return (
    <Card className="p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(600px,_1fr)] gap-6 relative">
      <div className="flex flex-col items-center md:items-start">
        <div className="relative w-32 h-32 md:w-48 md:h-48">
            <Image
              width={192}
              height={192}
              src={getProfileUrl(nodo.profile_picture) || "/proplayas_img.jpg"}
              alt="Foto de perfil"
              className="w-full h-full rounded-full border-2 border-gray-300 object-cover"
              unoptimized
            />
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

      <CardContent className="flex flex-col justify-between relative p-0">
        <div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-2xl font-semibold text-gray-500 dark:text-white">
              Sobre el nodo
            </CardTitle>
          </CardHeader>
          <div className="text-gray-600 dark:text-white mt-2">
            <p className="whitespace-pre-wrap">
              {isExpanded ? nodo?.about : truncateText(nodo?.about, 50)}
            </p>
            {shouldShowButton(nodo?.about, 50) && (
              <Button
                variant="link"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0 h-auto text-blue-600 hover:text-blue-800 dark:text-blue-400 mt-2"
              >
                {isExpanded ? "Ver menos" : "Ver más"}
              </Button>
            )}
          </div>
        </div>

        {nodo?.memorandum && (
            <div className="mt-6 flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2 border-blue-200 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:border-blue-700 dark:hover:bg-blue-800 transition px-4 py-2"
            >
              <a
              href={getFileUrl(nodo.memorandum) || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2"
              >
              <FileText className="h-8 w-8 text-blue-500 group-hover:text-blue-700 transition" />
              <span className="text-blue-600 group-hover:underline dark:text-blue-400">
                Ver Memorándum PDF
              </span>
              </a>
            </Button>
            </div>
        )}

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
      </CardContent>
    </Card>
  );
}
