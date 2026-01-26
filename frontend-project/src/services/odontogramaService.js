import axios from "axios";

const API_URL = "http://localhost:8083/api/odontogramas"; // Ajusta a tu puerto real

export const getOdontogramaByFicha = (fichaId) => {
  return axios.get(`${API_URL}/ficha/${fichaId}`);
};

export const createOdontograma = (data) => {
  return axios.post(API_URL, data);
};

// --- AGREGA ESTO ---
export const updateOdontograma = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};