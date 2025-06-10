import axiosInstance from "@/lib/axiosInstance";
import type { InviteNodeMember,  InviteNodeLeader, ApiResponse, RegisterNodeLeaderRequest, RegisterNodeMemberRequest } from "@/interfaces/Invitations";

export default class InvitationService {
    
    // Miembros
    async createInvitationToNodeMember(data: InviteNodeMember): Promise<ApiResponse<InviteNodeMember>> {
        try {
            const response = await axiosInstance.post("/member/invite", { ...data, role_type: "member" });
            return response.data;
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            throw error;
        }
    }
    // Lider de nodo
    async createInvitationToNodeLeader(data: InviteNodeLeader): Promise<ApiResponse<InviteNodeLeader>> {
        try {
            const response = await axiosInstance.post("/node/invite",{ ...data, role_type: "node_leader" });
            return response.data;
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            throw error;
        }
    }

    // Método general para registrar nuevos usuarios
    async registerNewUser<T extends RegisterNodeLeaderRequest | RegisterNodeMemberRequest>(data: T): Promise<ApiResponse<RegisterNodeLeaderRequest | RegisterNodeMemberRequest>> {
        try {
            const response = await axiosInstance.post("/invitations/accept", data);
            return response.data; //{status, message, data : {user:{}, node:}}
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            throw error;
        }
    }
}