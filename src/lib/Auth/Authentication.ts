import axiosInstance from "@/lib/axiosInstance";
import { system } from '@/lib/system';
import { ApiResponse, LoginRequest, LoginResponse } from '@/interfaces/Auth';
import { setCookie, removeCookie } from "@/lib/cookies";

export class Authentication {
  constructor() { }

  private getRedirectRoute(role: string, node_id?: string): string | null {
    switch (role) {
      case "admin":
        return "/root/nodos";
      case "member":
        return "/User/Profile";
      case "node_leader":
        return node_id ? `/lider/${node_id}` : null;
      default:
        return null;
    }
  }

  private setSession(token: string, role: string, node_id: string) {
    setCookie("Authorization", token);
    setCookie("role", role);
    setCookie("node_id", node_id || "");
    // Decodificar el payload del JWT para extraer el email
    let email = "";
    try {
      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
      const payload = JSON.parse(payloadJson);
      email = payload.email || "";
    } catch {
      email = "";
    }

    localStorage.setItem("Authorization", token);
    localStorage.setItem("role", role);
    localStorage.setItem("node_id", node_id || "");
    localStorage.setItem("email", email);
    system.authToken = token;
    system.role = role;
  }

  private clearSession() {
    removeCookie("Authorization");
    removeCookie("role");
    removeCookie("node_id");
    localStorage.removeItem("Authorization");
    localStorage.removeItem("role");
    localStorage.removeItem("node_id");
    system.authToken = null;
    system.role = null;
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await axiosInstance.post('/login', { email: credentials.email, password: btoa(credentials.password) });
    if (response.data.status === 200 && response.data.data) {
      const { token, role, node_id } = response.data.data;
      this.setSession(token, role, node_id);
      const route = this.getRedirectRoute(role, node_id);
      return {
        status: 200,
        message: "Inicio de sesión exitoso",
        data: { ...response.data.data, route }
      };
    } else if (response.data.status === 401) {
      return { status: 401, message: "Credenciales incorrectas", data: null };
    }
    // Para cualquier otro status, solo retorna el mensaje de la API
    return {
      status: 500,
      message: "Hubo un error en el servidor",
      data: null
    };
  }

  //{"status":200,"message":"Logged out successfully","data":[]}
  async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post('/logout');
      const { status, message } = response.data;
      this.clearSession();
      return {
        status: status || 500,
        message: message || (status === 200 ? "Sesión cerrada correctamente" : "Error al cerrar sesión"),
        data: null
      };
    } catch (error: any) {
      console.error("Error al cerrar sesión");
      this.clearSession();
      if (error?.response?.data) {
        const { status, message } = error.response.data;
        return {
          status: status || 500,
          message: message || "Error al cerrar sesión",
          data: null
        };
      }
      return {
        status: 500,
        message: "Error al cerrar sesión",
        data: null
      };
    }
  }

  async recoverPassword(email: string): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post('/recover-password', { email });
      const { status, message } = response.data;
      return {
        status,
        message: message || "Recuperación no exitosa",
        data: null
      };
    } catch (error: any) {
      if (error?.response?.data) {
        const { status, message } = error.response.data;
        return {
          status: status || 500,
          message: message || "Hubo un error en la recuperación",
          data: null
        };
      }
      return {
        status: 500,
        message: "Hubo un error en la recuperación",
        data: null
      };
    }
  }

  async setNewPassword(token: string, password: string): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post('/set-new-password', {
        token,
        password: btoa(password),
      });
      const { status, message } = response.data;
      return {
        status,
        message: message || "Recuperación no exitosa",
        data: null
      };
    } catch (error: any) {
      if (error?.response?.data) {
        const { status, message } = error.response.data;
        return {
          status: status || 500,
          message: message || "Hubo un error en la recuperación",
          data: null
        };
      }
      return {
        status: 500,
        message: "Hubo un error en la recuperación",
        data: null
      };
    }
  }
}