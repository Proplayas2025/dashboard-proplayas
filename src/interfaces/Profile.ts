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
    social_media: SocialLink[];
    status: string;
}
export interface Users {
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
}

export interface SocialLink {
    platform: 'linkedin' | 'github' | 'twitter' | 'website' | 'facebook' | 'instagram' | 'youtube' | 'research_gate' | 'phone';
    url: string;
}