import api from '@/lib/axiosInstance';
import type { Nodes, Node, NodeMembers, Member, ApiResponse } from "@/interfaces/Nodes";

export class NodosService {
    async getPublicNodes(): Promise<ApiResponse<Nodes[] | null>> {
        try {
            const response = await api.get("/nodes");
            return response.data;
        } catch (e) {
            console.error("Error al obtener los nodos públicos:", e);
           throw e; // manejas el error con status
        }
    }

    // Traer informacion del nodo como su biografia
    async getNodeBio(code: string): Promise<ApiResponse<Node>> {
        try {
            const response = await api.get(`/node/${code}`);
            return response.data;
        } catch (err) {
            console.error(`Error al obtener el nodo con code ${code}:`, err);
           throw err; // Retornar null para evitar errores en la UI
        }
    }

    // Traer miembros del nodo
    async getNodoMembers(code: string): Promise<ApiResponse<NodeMembers[]>> {
        try {
            const response = await api.get(`/node/members/${code}`);
            return response.data;
        } catch (err) {
            console.error(`Error al obtener los miembros del nodo con code ${code}:`, err);
            return { status: 500, message: "Error", data: [] }; // Retornar null para evitar errores en la UI
        }
    }

    async editNodeBio(id: number, editData: Partial<Node>): Promise<ApiResponse<Node>> {
        try {
            const response = await api.put(`/node/${id}`, editData);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el perfil del miembro:", error);
            throw error;
        }
    }

    // aqui lo envia a la api
    async uploadNodeProfilePicture(file: FormData): Promise<ApiResponse<Node>> {
        try {
            const response = await api.post(`/node/upload-profile-picture`,file);
            return response.data;
        } catch (error) {
            console.error("Error al subir la foto de perfil del nodo:", error);
            throw error;
        }
    }

    async toggleMemberStatus(memberId: number): Promise<ApiResponse<Member>> {
        try {
            const response = await api.put(`/member/${memberId}`);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el perfil del miembro:", error);
            throw error;
        }
    }

    // elimina la relacion entre el nodo y el miembro
    // no elimina el miembro de la base de datos
    async deleteMember(memberId: number): Promise<ApiResponse<Member>> {
        try {
            const response = await api.delete(`/member/${memberId}`);
            return response.data;
        } catch (error) {
            console.error("Error al eliminar el miembro:", error);
            throw error;
        }
    }

    async deleteNode(nodeId: number): Promise<ApiResponse<Nodes>> {
        try {
            const response = await api.delete(`/node/${nodeId}`);
            return response.data;
        } catch (error) {
            console.error("Error al eliminar el nodo:", error);
            throw error;
        }
    }

}