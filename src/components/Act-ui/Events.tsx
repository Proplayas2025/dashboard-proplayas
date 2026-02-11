"use client";

import { Events } from "@/interfaces/Content";
import Image from "next/image";
import { getCoverUrl, getFileUrl } from "@/lib/image-utils";

interface EventCardProps {
  event: Events;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const imageUrl = getCoverUrl(event.cover_image);

  const fileUrl = getFileUrl(event.file_url);

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
            unoptimized
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
            {event.event_type}
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
        {/* Enlace al archivo */}
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
      </div>
    </div>
  );
};