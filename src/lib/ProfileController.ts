import type { ApiResponse, User } from '@/interfaces/Profile';
import axiosInstance from "@/lib/axiosInstance";

export class ProfileService {
    async fetchProfile(): Promise<ApiResponse<User>> {
        try {
            const response = await axiosInstance.get(`/users/me`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el perfil del miembro:", error);
            throw error;
        }
    }

    // se usa Partial para que se pueda enviar un objeto con solo los campos que se desea actualizar
    async updateProfile(form: Partial<User>): Promise<ApiResponse<User>> {
        try {
            const response = await axiosInstance.put(`/users/me`, form);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el perfil del miembro:", error);
            throw error;
        }
    }
    // uploadProfilePicture
    async uploadProfilePicture(file: FormData): Promise<ApiResponse<User>> {
        try {
            const response = await axiosInstance.post(`/users/upload-profile-picture`, file);
            return response.data;
        } catch (error) {
            console.error("Error al subir la foto de perfil:", error);
            throw error;
        }
    }
    
    // get profile information by username
    async getPublicProfile(username: string): Promise<ApiResponse<User>> {
        try {
            const response = await axiosInstance.get(`/users/profile/${username}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el perfil público:", error);
            throw error;
        }
    }
}