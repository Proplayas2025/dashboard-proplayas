"use client";
import React from "react";
import { Books } from "@/interfaces/Content";
import {
  IconPencil,
  IconTrash,
  IconFileText,
  IconExternalLink,
  IconPhoto,
  IconUpload,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const COVER_URL = process.env.NEXT_PUBLIC_COVER_URL?.replace(/\/$/, "") || "";
const FILES_PATH = process.env.NEXT_PUBLIC_FILES_PATH?.replace(/\/$/, "") || "";

interface BookCardProps {
  book: Books;
  onEdit?: (book: Books) => void;
  onDelete?: (book: Books) => void;
  onChangeImage?: (book: Books) => void;
  onChangeFile?: (book: Books) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onEdit,
  onDelete,
  onChangeImage,
  onChangeFile,
}) => {
  // Usa cover_image_url si viene completa, si no, arma la ruta con COVER_URL y cover_image
  const imageUrl =
    book.cover_image_url ||
    (book.cover_image && COVER_URL
      ? `${COVER_URL}/${book.cover_image}`
      : undefined);

  // Construye la ruta completa del archivo si existe
  // filePath: Si book.file_path existe y NO empieza con http, concatena FILES_PATH + "/" + file_path
  // Si empieza con http, úsalo tal cual. Si no existe, undefined.
  const filePath =
    book.file_path
      ? book.file_path.startsWith("http")
        ? book.file_path
        : `${FILES_PATH}/${book.file_path.replace(/^\/+/, "")}`
      : undefined;

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
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit?.(book)}
            title="Editar"
          >
            <IconPencil size={18} />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete?.(book)}
            title="Eliminar"
          >
            <IconTrash size={18} />
          </Button>
          {/* Botón para cambiar imagen de portada */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onChangeImage?.(book)}
            title="Cambiar imagen de portada"
          >
            <IconPhoto size={18} />
          </Button>
          {/* Botón para cambiar archivo adjunto */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onChangeFile?.(book)}
            title="Cambiar archivo adjunto"
          >
            <IconUpload size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
