"use client";

import Image from "next/image";
import { Node } from "@/interfaces/Nodes";

interface NodoBioProps {
  nodo: Node;
}

export function NodoBio({ nodo }: NodoBioProps) {
  return (
    <div className="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(600px,_1fr)] gap-6 relative">
      <div className="flex flex-col items-center md:items-start">
        <div className="relative w-32 h-32 md:w-48 md:h-48">
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
  );
}