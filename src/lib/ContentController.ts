import api from '@/lib/axiosInstance';

// Map frontend content types to backend ContentType enum
const contentTypeMap: Record<string, string> = {
  'events': 'event',
  'books': 'book',
  'publications': 'publication',
  'projects': 'project',
  'series': 'series'
};

export class ContentController {
  async getContent(content: string, page = 1, per_page = 20) {
    const contentType = contentTypeMap[content] || content;
    const response = await api.get(`/content?content_type=${contentType}&page=${page}&per_page=${per_page}`);
    return { data: response.data.data, meta: response.data.meta };
  }

  async getContentAuthor(content: string, page = 1, per_page = 20) {
    const contentType = contentTypeMap[content] || content;
    const response = await api.get(`/content/own?content_type=${contentType}&page=${page}&per_page=${per_page}`);
    return { data: response.data.data, meta: response.data.meta };
  }

  async getContentAll(content: string, page = 1, per_page = 20) {
    const contentType = contentTypeMap[content] || content;
    const response = await api.get(`/content/all?content_type=${contentType}&page=${page}&per_page=${per_page}`);
    return { data: response.data.data, meta: response.data.meta };
  }

  async createContent(content: string, payload: Record<string, unknown>) {
    const contentType = contentTypeMap[content] || content;
    const response = await api.post(`/content`, {
      ...payload,
      content_type: contentType
    });
    return response.data;
  }

  async updateContent(content: string, id: number, payload: Record<string, unknown>) {
    const response = await api.put(`/content/${id}`, payload);
    return response.data;
  }

  async deleteContent(content: string, id: number) {
    const response = await api.delete(`/content/${id}`);
    return response.data;
  }

  async toggleStatus(content: string, id: number) {
    const response = await api.put(`/content/${id}/toggle-status`);
    return response.data;
  }
  
  // se usa para el caso de actualizar un archivo adjunto
  async uploadFile(content: string, id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/content/${id}/upload-file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // se usa para el caso de actualizar una imagen de portada
  async uploadImage(content: string, id: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    const response = await api.post(`/content/${id}/upload-cover-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
}