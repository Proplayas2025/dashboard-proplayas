// Utilidad centralizada para URLs de imágenes del servidor.
// Usa una sola variable de entorno: NEXT_PUBLIC_STORAGE_URL

const STORAGE_URL = (process.env.NEXT_PUBLIC_STORAGE_URL || '').replace(/\/$/, '');

export type ImageFolder = 'covers' | 'profiles' | 'docs';

/**
 * Construye la URL completa de una imagen almacenada en el servidor.
 * Si filename es null/undefined, retorna undefined.
 * Si filename ya es una URL completa, la retorna tal cual.
 */
export function getImageUrl(filename: string | null | undefined, folder: ImageFolder): string | undefined {
  if (!filename) return undefined;

  // Si ya es URL completa, retornarla
  try {
    new URL(filename);
    return filename;
  } catch { /* es un nombre de archivo */ }

  const cleanFile = filename.replace(/^\/+/, '');
  return `${STORAGE_URL}/${folder}/${cleanFile}`;
}

/**
 * Construye la URL de una imagen de portada de contenido (covers/).
 */
export function getCoverUrl(filename: string | null | undefined): string | undefined {
  return getImageUrl(filename, 'covers');
}

/**
 * Construye la URL de una foto de perfil (profiles/).
 */
export function getProfileUrl(filename: string | null | undefined): string | undefined {
  return getImageUrl(filename, 'profiles');
}

/**
 * Construye la URL de un archivo/documento (docs/).
 */
export function getFileUrl(filename: string | null | undefined): string | undefined {
  return getImageUrl(filename, 'docs');
}
