"use client";

import { Projects } from "@/interfaces/Content";
import Image from "next/image";

interface ProyectoCardProps {
  proyecto: Projects;
}

export const ProyectoCard: React.FC<ProyectoCardProps> = ({ proyecto }) => {
  const COVER_URL = process.env.NEXT_PUBLIC_COVER_URL?.replace(/\/$/, "") || "";
  const FILES_URL = process.env.NEXT_PUBLIC_FILES_URL?.replace(/\/$/, "") || "";

  const imageUrl =
    proyecto.cover_image_url ||
    (proyecto.cover_image && COVER_URL
      ? `${COVER_URL}/${proyecto.cover_image}`
      : undefined);

  const fileUrl =
    proyecto.file_url && !proyecto.file_url.startsWith("http")
      ? `${FILES_URL}/${proyecto.file_url}`
      : proyecto.file_url || undefined;

  const participants: string[] =
    typeof proyecto.participants === "string" && (proyecto.participants as string).trim().startsWith("[")
      ? JSON.parse(proyecto.participants as string)
      : Array.isArray(proyecto.participants)
        ? proyecto.participants
        : [];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-center">
      <div className="w-32 h-32 relative flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={proyecto.title}
            fill
            className="object-cover rounded-md"
            sizes="128px"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-zinc-700 rounded-md">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{proyecto.title}</h2>
          <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 capitalize">
            Proyecto
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{proyecto.description}</p>
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>
            <strong>Fecha:</strong>{" "}
            {proyecto.date
              ? new Date(proyecto.date).toLocaleDateString("en-GB", { timeZone: "UTC" })
              : "Sin fecha"}
          </span>
          {proyecto.location && (
            <span>
              <strong>Ubicación:</strong> {proyecto.location}
            </span>
          )}
        </div>
        {proyecto.link && (
          <a
            href={proyecto.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline text-sm"
          >
            Más información
          </a>
        )}
        {fileUrl && (
          <div className="flex items-center gap-2 mt-2">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 underline text-sm"
              title="Ver archivo adjunto"
            >
              Archivo adjunto
            </a>
          </div>
        )}
        {/* Participantes */}
        {participants.length > 0 && (
          <div className="mt-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Participantes ({participants.length}):
            </span>
            <ul className="ml-2 list-disc text-xs text-gray-700 dark:text-gray-300">
              {participants.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};