"use client";
import React, { useState } from "react";
import { Events } from "@/interfaces/Content";
import { IconPencil, IconTrash, IconFileText, IconUpload, IconPhoto, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { buildImageUrl } from "@/lib/image-utils";

const PROFILE_COVER_URL =
  process.env.NEXT_PUBLIC_COVER_URL?.replace(/\/$/, "") || "";
const FILES_PATH = process.env.NEXT_PUBLIC_FILES_PATH?.replace(/\/$/, "") || "";

interface EventCardProps {
  event: Events;
  onEdit?: (event: Events) => void;
  onDelete?: (event: Events) => void;
  onChangeImage?: (event: Events) => void;
  onChangeFile?: (event: Events) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onEdit,
  onDelete,
  onChangeImage,
  onChangeFile,
}) => {
  const [showParticipants, setShowParticipants] = useState(false);
  const imageUrl = buildImageUrl({
    coverImageUrl: event.cover_image_url,
    coverImage: event.cover_image,
    baseUrl: PROFILE_COVER_URL,
  });

  const filePath =
    event.file_path
      ? event.file_path.startsWith("http")
        ? event.file_path
        : `${FILES_PATH}/${event.file_path.replace(/^\/+/, "")}`
      : undefined;

  const participants: string[] =
    typeof event.participants === "string" && (event.participants as string).trim().startsWith("[")
      ? JSON.parse(event.participants as string)
      : Array.isArray(event.participants)
        ? event.participants
        : [];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-center">
      <div className="w-32 h-32 relative flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title}
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
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            {event.type}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>
            <strong>Fecha:</strong>{" "}
            {new Date(event.date).toLocaleDateString("en-GB", { timeZone: "UTC" })}{" "}
            <strong>Hora (UTC):</strong>{" "}
            {new Date(event.date).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "UTC",
            })}{" "}
            UTC
          </span>
          {event.format && (
            <span>
              <strong>Formato:</strong> {event.format}
            </span>
          )}
          {event.location && (
            <span>
              <strong>Lugar:</strong> {event.location}
            </span>
          )}
        </div>
        {/* Participantes colapsable */}
        {participants.length > 0 && (
          <div className="mt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowParticipants((v) => !v)}
            >
              <span>Participantes ({participants.length})</span>
              {showParticipants ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </Button>
            {showParticipants && (
              <ul className="mt-2 ml-2 list-disc text-xs text-gray-700 dark:text-gray-300">
                {participants.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        {/* Enlace al archivo */}
        {filePath && (
          <div className="flex items-center gap-2 mt-2">
            <a
              href={filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 underline text-sm"
              title="Ver archivo adjunto"
            >
              <IconFileText size={18} />
              Archivo adjunto
            </a>
          </div>
        )}
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline text-sm"
          >
            Más información
          </a>
        )}
        <div className="flex gap-2 mt-2 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit?.(event)}
            title="Editar"
          >
            <IconPencil size={18} />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete?.(event)}
            title="Eliminar"
          >
            <IconTrash size={18} />
          </Button>
          {/* Botón para cambiar imagen de portada */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onChangeImage?.(event)}
            title="Cambiar imagen de portada"
          >
            <IconPhoto size={18} />
          </Button>
          {/* Botón para cambiar archivo adjunto */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onChangeFile?.(event)}
            title="Cambiar archivo adjunto"
          >
            <IconUpload size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};