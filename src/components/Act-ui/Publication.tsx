"use client";

import { Publications } from "@/interfaces/Content";
import Image from "next/image";
import { IconFileText, IconExternalLink } from "@tabler/icons-react";

const COVER_URL =
  process.env.NEXT_PUBLIC_COVER_URL?.replace(/\/$/, "") || "";
const FILES_URL =
  process.env.NEXT_PUBLIC_FILES_PATH?.replace(/\/$/, "") || "";

interface PublicationCardProps {
  publication: Publications;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const imageUrl =
    publication.cover_image_url ||
    (publication.cover_image && COVER_URL
      ? `${COVER_URL}/${publication.cover_image}`
      : undefined);

  const fileUrl =
    publication.file_url && !publication.file_url.startsWith("http")
      ? `${FILES_URL}/${publication.file_url}`
      : publication.file_url || undefined;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-center">
      <div className="w-32 h-32 relative flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={publication.title}
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
          <h2 className="text-xl font-semibold">{publication.title}</h2>
          <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 capitalize">
            {publication.type}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{publication.description}</p>
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
          {publication.doi && (
            <span>
              <strong>DOI:</strong> {publication.doi}
            </span>
          )}
          {publication.issn && (
            <span>
              <strong>ISSN:</strong> {publication.issn}
            </span>
          )}
        </div>
        {fileUrl && (
          <div className="flex items-center gap-2 mt-2">
            <a
              href={fileUrl}
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
        {publication.link && (
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 underline text-sm"
            title="Ver publicación"
          >
            <IconExternalLink size={16} />
            Ver publicación
          </a>
        )}
      </div>
    </div>
  );
};