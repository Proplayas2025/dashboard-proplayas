interface Author {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    status: string;
}

// Proyectos colaborativos de bajo costo
export interface Projects {
    id: number;
    title: string; // required, max 255
    description: string; // required
    date: string; // ISO date string, required
    location?: string | null; // nullable, max 255
    link?: string | null; // nullable, must be a URL
    file_path?: string | null; // nullable, file path or name
    file_url?: string | null; // nullable, must be a URL
    cover_image?: string | null; // nullable, image file path or name
    cover_image_url?: string | null; // nullable, must be a URL
    participants?: string[] | null; // nullable, array of strings, each max 255
}

// Events
export interface Events {
    id: number;
    title: string; 
    type: 'event' | 'taller' | 'clase' | 'curso' | 'seminario' | 'foro' | 'conferencia' | 'congreso' | 'webinar';
    description: string;
    date: string; // ISO date string, since PHP expects a date string
    link: string;
    format: 'presencial' | 'online';
    location?: string | null;
    participants?: string[] | null;
    cover_image?: string | null;
    cover_image_url?: string | null;
    file_url?: string | null;
    file_path?: string | null;
    author?: Author | null; // nullable, author details
}

// sobre webseries
export interface Chapter {
    id: number;
    title: string;
    description: string;
    youtube_url: string; // solo el link de YouTube
    thumbnail_url: string; // preview de imagen
    episode_number?: number;
}

export interface Series {
    id: number;
    title: string; // required, max 255
    url?: string | null; // nullable, must be a URL
    description?: string | null; // nullable string
    cover_image_file?: string | null; // nullable, image file path or name
    cover_image_url?: string | null; // nullable, must be a URL
    chapters: Chapter[];
}

// publicaciones
export interface Publications {
    id: number;
    type: 'boletin' | 'guia' | 'articulo';
    title: string;
    description?: string | null;
    link?: string | null;
    doi?: string | null;
    issn?: string | null;
    cover_image?: string | null;
    cover_image_url?: string | null;
    file_url?: string | null;
    file_path?: string | null;
}

// Libros
export interface Books {
    id: number;
    title: string; // required, max 255
    book_author: string; // required, max 255
    publication_date?: string | null; // ISO date string, nullable
    isbn?: string | null; // nullable, max 255
    description: string; // required
    link?: string | null; // nullable, must be a URL
    file_path?: string | null; // nullable, file path or name
    file_url?: string | null; // nullable, must be a URL
    cover_image?: string | null; // nullable, image file path or name
    cover_image_url?: string | null; // nullable, must be a URL
}

export interface News {
    title: string; // required, max 255
    content: string; // required
    category: string; // required, max 255
    tags?: string[] | null; // nullable, array of strings, each max 100
    cover_image?: string | null; // nullable, image file path or name
    cover_image_url?: string | null; // nullable, must be a URL
    link?: string | null; // nullable, must be a URL
}