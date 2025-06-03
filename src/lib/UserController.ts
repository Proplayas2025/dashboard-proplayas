import axiosInstance from "@/lib/axiosInstance";
import { ApiResponse, Users } from '@/interfaces/Profile';
export class UserService {
    // Trae la lista de usuarios
    async fetchUsers(page = 1, per_page = 10): Promise<any> {
        try {
            const response = await axiosInstance.get<ApiResponse<Users[]>>(`/users?page=${page}&per_page=${per_page}`);
            return response.data;
        } catch (error: any) {
            console.error("Error al obtener el usuario:", error);
            throw error;
        }
    }

    // Elimina el usuario definitivamente (SOLO ADMIN)
    async deleteUser(id: string): Promise<any> {
        try {
            const response = await axiosInstance.delete<ApiResponse<Users>>(`/user/${id}`);
            return response.data;
        } catch (error: any) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    }
}