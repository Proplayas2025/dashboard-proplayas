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
    content_type: string;
    status: string;
    event_date?: string | null; // ISO date string - projects reuse event_date field
    location?: string | null; // nullable, max 255
    link?: string | null; // nullable, must be a URL
    file_path?: string | null; // nullable, file path or name
    file_url?: string | null; // nullable, must be a URL
    cover_image?: string | null; // nullable, image file path or name
    cover_image_url?: string | null; // nullable, must be a URL
    participants?: string[] | null; // nullable, array of strings, each max 255
    author_id: number;
    node_id?: number | null;
    created_at: string;
    updated_at: string;
    author?: Author | null;
    chapters?: Chapter[];
}

// Events
export interface Events {
    id: number;
    title: string; 
    description: string;
    content_type: string;
    status: string;
    event_type: 'event' | 'taller' | 'clase' | 'curso' | 'seminario' | 'foro' | 'conferencia' | 'congreso' | 'webinar';
    event_format: 'presencial' | 'online';
    event_date: string; // ISO date string
    location?: string | null;
    link?: string | null;
    participants?: string[] | null;
    cover_image?: string | null;
    cover_image_url?: string | null;
    file_url?: string | null;
    file_path?: string | null;
    author_id: number;
    node_id?: number | null;
    created_at: string;
    updated_at: string;
    author?: Author | null;
    chapters?: Chapter[];
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
    description?: string | null; // nullable string
    content_type: string;
    status: string;
    link?: string | null; // nullable, must be a URL
    cover_image?: string | null; // nullable, image file path or name
    cover_image_url?: string | null; // nullable, must be a URL
    author_id: number;
    node_id?: number | null;
    created_at: string;
    updated_at: string;
    author?: Author | null;
    chapters: Chapter[];
}

// publicaciones
export interface Publications {
    id: number;
    title: string;
    description?: string | null;
    content_type: string;
    status: string;
    publication_type: 'boletin' | 'guia' | 'articulo';
    link?: string | null;
    doi?: string | null;
    issn?: string | null;
    cover_image?: string | null;
    cover_image_url?: string | null;
    file_url?: string | null;
    file_path?: string | null;
    author_id: number;
    node_id?: number | null;
    created_at: string;
    updated_at: string;
    author?: Author | null;
    chapters?: Chapter[];
}

// Libros
export interface Books {
    id: number;
    title: string; // required, max 255
    description: string; // required
    content_type: string;
    status: string;
    book_author: string; // required, max 255
    publication_date?: string | null; // ISO date string, nullable
    isbn?: string | null; // nullable, max 255
    link?: string | null; // nullable, must be a URL
    file_path?: string | null; // nullable, file path or name
    file_url?: string | null; // nullable, must be a URL
    cover_image?: string | null; // nullable, image file path or name
    cover_image_url?: string | null; // nullable, must be a URL
    author_id: number;
    node_id?: number | null;
    created_at: string;
    updated_at: string;
    author?: Author | null;
    chapters?: Chapter[];
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