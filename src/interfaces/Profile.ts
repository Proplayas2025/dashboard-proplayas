// interfaz
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    about: string;
    degree: string;
    postgraduate: string;
    expertise_area: string;
    research_work: string;
    profile_picture: File; // foto del usuario
    country: string;
    city: string;
    social_media: SocialLink[];
    status: string;
}
export interface Users {
    id: number;
    name: string;
    email: string;
    role: string;
    node_id: number;
    node_code: string;
    status: string;
}
export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
    meta?: PaginationMeta; 
}

export interface SocialLink {
    platform: 'linkedin' | 'github' | 'twitter' | 'website' | 'facebook' | 'instagram' | 'youtube' | 'research_gate' | 'phone';
    url: string;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}