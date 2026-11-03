import apiClient from "./apiClient";

export const getPaintings = async (params = {}) => {
  const response = await apiClient.get("/paintings", { params });
  return response.data;
};

export const createPainting = async (formData) => {
  const response = await apiClient.post("/paintings", formData);
  return response.data;
};

export const updatePainting = async (id, formData) => {
  formData.append("_method", "PUT");

  const response = await apiClient.post(`/paintings/${id}`, formData);
  return response.data;
};

export const deletePainting = async (id) => {
  const response = await apiClient.delete(`/paintings/${id}`);
  return response.data;
};