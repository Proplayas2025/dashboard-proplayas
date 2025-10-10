// Utilities para manejar URLs de imágenes (nombres vs URLs completas)

export function isUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function buildImageUrl(options: {
  coverImageUrl?: string | null;      // campo cover_image_url del backend
  coverImage?: string | null;         // campo cover_image (puede ser nombre o URL)
  baseUrl?: string | null;            // env base (ej. NEXT_PUBLIC_COVER_URL)
}): string | undefined {
  const { coverImageUrl, coverImage, baseUrl } = options;
  
  // 1. Si hay cover_image_url, usarlo directamente
  if (coverImageUrl) return coverImageUrl;
  
  // 2. Si no hay cover_image, retornar undefined
  if (!coverImage) return undefined;
  
  // 3. Si cover_image es una URL completa, usarla directamente
  if (isUrl(coverImage)) return coverImage;
  
  // 4. Si cover_image es un nombre de archivo y hay baseUrl, construir la URL
  if (baseUrl) {
    const cleanBase = baseUrl.replace(/\/$/, '');
    const cleanFile = coverImage.replace(/^\/+/, '');
    return `${cleanBase}/${cleanFile}`;
  }
  
  return undefined;
}
