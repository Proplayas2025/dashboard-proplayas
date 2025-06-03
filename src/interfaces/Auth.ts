export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    role: string;
    node_id: string;
    route: string | null;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'editor';
}

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T | null;
}