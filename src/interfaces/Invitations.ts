export interface ApiResponse<T>{
    status: number;
    message: string;
    data: T;
}

export interface InvitationResponseData {
    id: number;
    name: string | null;
    email: string;
    token: string;
    role: string;
    node_type: string | null;
    status: string;
    node_id: number | null;
    invited_by: number;
    created_at: string;
    expires_at: string;
}

export interface InviteNodeLeader {
    code : string; // código del líder de nodo, por ejemplo: "C123"
    role_type: string; // tipo de rol, por ejemplo: "admin", "member", etc.
    email: string;
    name: string;
    node_type: string;
}


export type SocialMediaItem = {
  platform: string;
  url: string;
};

export interface RegisterNodeLeaderRequest {
  token: string;
  node_type?: string; // tipo de nodo, opcional
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  //username?: string;
  about_user?: string;
  degree?: string;
  postgraduate?: string;
  expertise_area?: string;
  research_work?: string;
  profile_picture_file?: File | null;
  profile_picture?: string;
  country_user?: string;
  city_user?: string;
  social_media?: SocialMediaItem[]; // Cambiado de string[] a SocialMediaItem[]
  // Nodo
  node_name?: string;
  profile_picture_node_file?: File | null;
  profile_picture_node?: string;
  about_node?: string;
  country_node?: string;
  city_node?: string;
  //ip_address?: string;
  coordinates?: string;
  alt_places?: string;
  joined_in?: number;
  
  social_media_node?: SocialMediaItem[]; // Cambiado de string[] a SocialMediaItem[]
  memorandum?: string;
}

export interface InviteNodeMember {
    name: string;
    email: string;
}

export interface RegisterNodeMemberRequest {
    token: string;
    name: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    expertise_area: string;
    research_work: string;
    social_media?: SocialMediaItem[];
    about_user: string;
    country_user: string;
    city_user: string;
}

export interface InviteAdmin {
    name: string;
    email: string;
}

export interface RegisterAdmin {
    token: string;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

