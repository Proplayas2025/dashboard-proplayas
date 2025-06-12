import api from '@/lib/axiosInstance';

export class ContentController {
  async getContent(content: string) {
    const response = await api.get(`/${content}`);
    return response.data.data;
  }

  async getContentAuthor(content: string) {
    const response = await api.get(`/${content}/own`);
    return response.data;
  }

  async createContent(content: string, payload: unknown) {
    const response = await api.post(`/${content}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateContent(content: string, id: number, payload: unknown) {
    const response = await api.put(`/${content}/${id}`, payload);
    return response.data;
  }

  async deleteContent(content: string, id: number) {
    const response = await api.delete(`/${content}/${id}`);
    return response.data;
  }

  async toggleStatus(content: string, id: number) {
    const response = await api.put(`/${content}/${id}/toggle-status`);
    return response.data;
  }
  
  // se usa para el caso de actualizar un archivo adjunto
  async uploadFile(content: string, id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/${content}/${id}/upload-file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // se usa para el caso de actualizar una imagen de portada
  async uploadImage(content: string, id: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    const response = await api.post(`/${content}/${id}/upload-cover-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
}