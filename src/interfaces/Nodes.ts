import type { SocialLink } from '@/interfaces/Profile';

export interface Nodes {
    id: number;
    code: string; // se muestra
    type: string; // se muestra
    name: string; // se muestra
    country: string | null;// se muestra
    city: string | null;// se muestra
    joined_in: number | null;// se muestra
    members_count: number;// se muestra
    status: string;
}

export interface NodeMembers {
    id: number; // id del miembro (NodeMember.id)
    user_id: number; // id del usuario
    node_id: number;
    member_code: string;
    name: string;
    email: string;
    research_line: string | null;
    work_area: string | null;
    username: string;
    status: string;
}

export interface Node {
    id: number;
    leader_id: number | null;
    code: string;// se muestra
    type: string;// se muestra
    name: string;// se muestra
    profile_picture: string | null;// foto del nodo
    about: string | null;// se muestra
    country: string | null;// se muestra
    city: string | null;// se muestra
    ip_address: string | null;
    coordinates: string | null;
    alt_places: string | null;// se muestra
    joined_in: number | null;// se muestra
    members_count: number;// se muestra
    //id_photo: string;
    social_media: SocialLink[] | null;// se muestra
    memorandum: string | null;// se muestra
    status: string;
    leader: Leader | null; // se muestra
}

export interface Leader {
    id: number;
    degree: string | null;
    email: string;
    name: string;
    postgraduate: string | null;
}

export interface Member {
    id: number;
    user_id: number; // id del usuario
    node_id: number;
    username: string; // nombre de usuario
    name: string;
    member_code: string;
    email: string;
    research_line: string | null;
    work_area: string | null;
    status: string;
}

export interface ApiResponse<T>{
    status: number;
    message: string;
    data: T;
    meta?: PaginationMeta;
}

export interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}