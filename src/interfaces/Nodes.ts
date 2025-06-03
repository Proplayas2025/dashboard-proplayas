import type { SocialLink } from '@/interfaces/Profile';

export interface Nodes {
    id: number;
    code: string; // se muestra
    type: string; // se muestra
    name: string; // se muestra
    country: string;// se muestra
    city: string;// se muestra
    joined_in: number;// se muestra
    members_count: number;// se muestra
    status: string;
}

export interface NodeMembers {
    id: number; // id del miembro
    user_id: number; // id del usuario
    node_id: number;
    member_code: string;
    name: string;
    email: string;
    research_line: string;
    work_area: string;
    username: string;
    status: string;
}

export interface Node {
    id: number;
    leader_id: string;
    code: string;// se muestra
    type: string;// se muestra
    name: string;// se muestra
    profile_picture: string;// foto del nodo
    about: string;// se muestra
    country: string;// se muestra
    city: string;// se muestra
    ip_address: string;
    coordinates: string;
    alt_places: string;// se muestra
    joined_in: number;// se muestra
    members_count: number;// se muestra
    //id_photo: string;
    social_media: SocialLink[] | null;// se muestra
    memorandum: string;// se muestra
    status: string;
    leader: Leader; // se muestra
}

export interface Leader {
    id: number;
    degree: string;
    email: string;
    name: string;
    postgraduate:string;
}

export interface Member {
    id: number;
    user_id: number; // id del usuario
    node_id: number;
    username: string; // nombre de usuario
    name: string;
    member_code: string;
    email: string;
    research_line: string;
    work_area: string;
    status: string;
}

export interface ApiResponse<T>{
    status: number;
    message: string;
    data: T;
}