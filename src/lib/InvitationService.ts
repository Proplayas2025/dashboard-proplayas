import axiosInstance from "@/lib/axiosInstance";
import type { InviteNodeMember, InviteNodeLeader, ApiResponse, InvitationResponseData, RegisterNodeLeaderRequest, RegisterNodeMemberRequest } from "@/interfaces/Invitations";

export default class InvitationService {
    
    // Validar token de invitación
    async validateInvitationToken(token: string): Promise<ApiResponse<unknown>> {
        try {
            const response = await axiosInstance.get(`/invitations/${token}`);
            return response.data;
        } catch (error: unknown) {
            console.error("Error al validar la invitación:", error);
            
            if (error && typeof error === 'object' && 'response' in error && error.response) {
                const errorResponse = error.response as { status: number; data?: { message?: string } };
                throw {
                    status: errorResponse.status,
                    message: errorResponse.data?.message || "Error al validar la invitación",
                    response: errorResponse
                };
            }
            
            throw {
                status: 500,
                message: "Error de conexión al validar la invitación",
                response: null
            };
        }
    }


    // Invitar miembro (líder de nodo invita)
    async createInvitationToNodeMember(data: InviteNodeMember): Promise<ApiResponse<InvitationResponseData>> {
        try {
            const response = await axiosInstance.post("/invitations/member", data);
            return response.data;
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            throw error;
        }
    }
    // Invitar líder de nodo (admin invita)
    async createInvitationToNodeLeader(data: InviteNodeLeader): Promise<ApiResponse<InvitationResponseData>> {
        try {
            const response = await axiosInstance.post("/invitations/node-leader", data);
            return response.data;
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            throw error;
        }
    }

    // Aceptar invitación y registrar usuario
    async registerNewUser<T extends RegisterNodeLeaderRequest | RegisterNodeMemberRequest>(data: T): Promise<ApiResponse<RegisterNodeLeaderRequest | RegisterNodeMemberRequest>> {
        try {
            const response = await axiosInstance.post("/invitations/accept", data);
            return response.data;
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            throw error;
        }
    }

    // Obtener invitaciones pendientes
    async getPendingInvitations(): Promise<ApiResponse<InvitationResponseData[]>> {
        try {
            const response = await axiosInstance.get("/invitations?status=pending");
            return response.data;
        } catch (error) {
            console.error("Error al obtener invitaciones:", error);
            throw error;
        }
    }

    // Cancelar invitación
    async cancelInvitation(invitationId: number): Promise<ApiResponse<null>> {
        try {
            const response = await axiosInstance.delete(`/invitations/${invitationId}`);
            return response.data;
        } catch (error) {
            console.error("Error al cancelar invitación:", error);
            throw error;
        }
    }
}