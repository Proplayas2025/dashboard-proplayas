export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "Fecha no disponible";
  
  try {
    // Remover cualquier información de zona horaria para interpretarla como hora local
    const cleanDate = dateString.replace(/[Z\+\-]\d{2}:?\d{2}$/, '');
    const date = new Date(cleanDate);
    if (isNaN(date.getTime())) return "Fecha inválida";
    
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Fecha inválida";
  }
}

export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return "Fecha no disponible";
  
  try {
    // Remover cualquier información de zona horaria para interpretarla como hora local
    const cleanDate = dateString.replace(/[Z\+\-]\d{2}:?\d{2}$/, '');
    const date = new Date(cleanDate);
    if (isNaN(date.getTime())) return "Fecha inválida";
    
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Fecha inválida";
  }
}

export function formatTime(dateString: string | null | undefined): string {
  if (!dateString) return "--:--";
  
  try {
    // Remover cualquier información de zona horaria para interpretarla como hora local
    const cleanDate = dateString.replace(/[Z\+\-]\d{2}:?\d{2}$/, '');
    const date = new Date(cleanDate);
    if (isNaN(date.getTime())) return "--:--";
    
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "--:--";
  }
}
