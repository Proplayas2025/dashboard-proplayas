import axiosInstance from "@/lib/axiosInstance";
import { ApiResponse, User, Users, PaginationMeta } from '@/interfaces/Profile';

export class UserService {
    // Trae la lista de usuarios
  async fetchUsers(page = 1, per_page = 10): Promise<{ data: Users[]; meta?: PaginationMeta }> {
    try {
      const response = await axiosInstance.get<ApiResponse<Users[]>>(`/users?page=${page}&per_page=${per_page}`);
      return {
        data: response.data.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

    // Elimina el usuario definitivamente (SOLO ADMIN)
    async deleteUser(id: string): Promise<User> {
        try {
            const response = await axiosInstance.delete<ApiResponse<User>>(`/user/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    }
}