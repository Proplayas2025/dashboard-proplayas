import axiosInstance from "@/lib/axiosInstance";
import { system } from '@/lib/system';
import { ApiResponse, LoginRequest, LoginResponse } from '@/interfaces/Auth';
import { setCookie, removeCookie } from "@/lib/cookies";

export class Authentication {
  constructor() {}

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
    // Set cookies
    setCookie("Authorization", token);
    setCookie("role", role);
    setCookie("node_id", node_id || "");
    // Set localStorage (opcional, si lo usas en tu app)
    localStorage.setItem("Authorization", token);
    localStorage.setItem("role", role);
    localStorage.setItem("node_id", node_id || "");
    // Set system
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
    try {
      const response = await axiosInstance.post('/login', {
        email: credentials.email,
        password: btoa(credentials.password),
      }, {headers: {
            'Content-Type': 'application/json'
        }});

      if (response.data.status === 200) {
        const { token, role, node_id } = response.data.data;
        this.setSession(token, role, node_id);

        const route = this.getRedirectRoute(role, node_id);

        return {
          status: 200,
          message: "Inicio de sesión exitoso",
          data: {
            token,
            role,
            node_id,
            route
          }
        };
      }

      return {
        status: response.data.status,
        message: response.data.message || "Inicio de sesión fallido",
        data: null
      };
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { status?: number } };
        return {
          status: err.response?.status || 500,
          message: "Hubo un error en el servidor",
          data: null
        };
      }
      return {
        status: 500,
        message: "Hubo un error en el servidor",
        data: null
      };
    }
  }

  async loginTwo(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: btoa(credentials.password),
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 200) {
        const { token, role, node_id } = data.data;
        this.setSession(token, role, node_id);

        const route = this.getRedirectRoute(role, node_id);

        return {
          status: 200,
          message: "Inicio de sesión exitoso",
          data: {
            token,
            role,
            node_id,
            route
          }
        };
      }

      return {
        status: data.status || response.status,
        message: data.message || "Inicio de sesión fallido",
        data: null
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Hubo un error en el servidor",
        data: null
      };
    }
  }
    

  async logout(): Promise<boolean> {
    try {
      const response = await axiosInstance.post('/logout');
      if (response.status === 200) {
        this.clearSession();
        return true;
      }
      console.error("Error al cerrar sesión: Código de estado inesperado", response.status);
      return false;
    } catch {
      this.clearSession();
      return false;
    }
  }

  async recoverPassword(email: string): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post('/recover-password', { email });
      return {
        status: response.data.status,
        message: response.data.message || "Recuperación no exitosa",
        data: null
      };
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { status?: number; data?: { message?: string } } };
        return {
          status: err.response?.status || 500,
          message: err.response?.data?.message || "Hubo un error en la recuperación",
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
      return {
        status: response.data.status,
        message: response.data.message || "Recuperación no exitosa",
        data: null
      };
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { status?: number; data?: { message?: string } } };
        return {
          status: err.response?.status || 500,
          message: err.response?.data?.message || "Hubo un error en la recuperación",
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