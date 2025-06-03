import { getCookie } from "./cookies";

// Variables de entorno para Next.js
export const V_Global_API = process.env.NEXT_PUBLIC_API_URL || "";
export const V_Global_PROFILE_IMG = process.env.NEXT_PUBLIC_PROFILE_COVER_URL || "";
export const V_Global_PROFILE_COVER = process.env.NEXT_PUBLIC_COVER_URL || "";
export const V_Domain = "";

// Interfaz para la configuración del sistema
interface SystemConfig {
    authToken: string | null;
    role: string | null;
    initializeAuth: () => string | null;
    http: HttpConfig;
    handlerError: HandlerErrorConfig;
}

// Interfaz para la configuración HTTP
interface HttpConfig {
    send: {
        authorization: () => string | null;
    };
    check: {
        live: () => boolean;
        auth: () => boolean;
    };
}

// Interfaz para manejo de errores
interface HandlerErrorConfig {
    handleError: (errorCode?: number, errorMessage?: string) => void;
}

// Implementación de `system`
export const system: SystemConfig = {
    authToken: null,
    role: null,
    // Método para inicializar `authToken` una vez
    initializeAuth(): string | null {
        if (!this.authToken) {
            this.authToken = this.http.send.authorization();
        }
        return this.authToken;
    },

    http: {
        send: {
            authorization(): string | null {
                try {
                    // Busca el token en cookies (cliente)
                    return getCookie("Authorization") || null;
                } catch (error) {
                    console.error("Error obteniendo el token:", error);
                    return null;
                }
            },
        },

        check: {
            live(): boolean {
                const token = getCookie("Authorization");
                if (!token) {
                    system.handlerError.handleError(401, "Página no disponible.");
                    return false;
                }
                return true;
            },
            auth(): boolean {
                return !!getCookie("Authorization");
            },
        },
    },

    handlerError: {
        handleError(errorCode: number = 500, errorMessage: string = "Ha ocurrido un error inesperado."): void {
            // Puedes personalizar el manejo de errores aquí
            // Por ejemplo, redireccionar usando useRouter si es un componente cliente
            console.error(`Error ${errorCode}: ${errorMessage}`);
        },
    },
};

export const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};

// Inicializa el token al cargar el sistema
system.initializeAuth();