"use client";

import { Books } from "@/interfaces/Content";
import Image from "next/image";
import { IconFileText, IconExternalLink } from "@tabler/icons-react";
import { buildImageUrl } from "@/lib/image-utils";

const COVER_URL = process.env.NEXT_PUBLIC_COVER_URL?.replace(/\/$/, "") || "";
const FILES_URL = process.env.NEXT_PUBLIC_FILES_PATH?.replace(/\/$/, "") || "";

interface BookCardProps {
  book: Books;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const imageUrl = buildImageUrl({
    coverImageUrl: book.cover_image_url,
    coverImage: book.cover_image,
    baseUrl: COVER_URL,
  });

  const fileUrl =
    book.file_url && !book.file_url.startsWith("http")
      ? `${FILES_URL}/${book.file_url}`
      : book.file_url || undefined;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-center">
      <div className="w-28 h-44 relative flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={book.title}
            fill
            className="object-cover rounded-md"
            sizes="112px"
            priority={false}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-zinc-700 rounded-md">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{book.title}</h2>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Autor:</strong> {book.book_author}
        </div>
        {book.publication_date && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Publicado:</strong>{" "}
            {new Date(book.publication_date).toLocaleDateString("en-GB")}
          </div>
        )}
        {book.isbn && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <strong>ISBN:</strong> {book.isbn}
          </div>
        )}
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {book.description}
        </p>
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
              <IconFileText size={18} />
              Archivo adjunto
            </a>
          </div>
        )}
        {/* Enlace externo */}
        {book.link && (
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 underline text-sm"
            title="Ver libro"
          >
            <IconExternalLink size={16} />
            Ver libro
          </a>
        )}
      </div>
    </div>
  );
};
