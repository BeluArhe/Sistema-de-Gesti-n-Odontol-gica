import axios from "axios";

const API_URL = "http://localhost:8082/api/fichas";

export const getFichasByPaciente = (pacienteId) => {
  return axios.get(`${API_URL}/paciente/${pacienteId}`);
};

export const createFicha = (ficha) => {
  return axios.post(`${API_URL}/crear`, ficha);
};
