import axiosInstance from "@/lib/axiosInstance";
import { ApiResponse, User, Users, PaginationMeta } from '@/interfaces/Profile';

export class UserService {
    // Trae la lista de usuarios (solo admin)
  async fetchUsers(page = 1, per_page = 25, search?: string): Promise<{ data: Users[]; meta?: PaginationMeta }> {
    try {
      const params: Record<string, unknown> = { page, per_page };
      if (search) params.search = search;
      const response = await axiosInstance.get<ApiResponse<Users[]>>(`/users`, { params });
      return {
        data: response.data.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw error;
    }
  }

    // Obtener perfil del usuario actual
    async getCurrentUserProfile(): Promise<User> {
        try {
            const response = await axiosInstance.get<ApiResponse<User>>(`/users/me`);
            return response.data.data;
        } catch (error) {
            console.error("Error al obtener el perfil del usuario:", error);
            throw error;
        }
    }

    // Obtener usuario por ID
    async getUserById(id: number): Promise<User> {
        try {
            const response = await axiosInstance.get<ApiResponse<User>>(`/users/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            throw error;
        }
    }

    // Actualizar perfil de usuario
    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        try {
            const response = await axiosInstance.put<ApiResponse<User>>(`/users/${id}`, userData);
            return response.data.data;
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw error;
        }
    }

    // Subir foto de perfil
    async uploadProfilePicture(file: FormData): Promise<User> {
        try {
            const response = await axiosInstance.post<ApiResponse<User>>(`/users/upload-profile-picture`, file, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.data;
        } catch (error) {
            console.error("Error al subir la foto de perfil:", error);
            throw error;
        }
    }

    // Activar/desactivar usuario (SOLO ADMIN)
    async toggleUserStatus(id: number): Promise<Users> {
        try {
            const response = await axiosInstance.put<ApiResponse<Users>>(`/users/${id}/toggle-status`);
            return response.data.data;
        } catch (error) {
            console.error("Error al cambiar el estado del usuario:", error);
            throw error;
        }
    }

    // Elimina el usuario definitivamente (SOLO ADMIN)
    async deleteUser(id: number): Promise<{ id: number }> {
        try {
            const response = await axiosInstance.delete<ApiResponse<{ id: number }>>(`/users/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    }
}