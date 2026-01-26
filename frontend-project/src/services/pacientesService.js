import axios from "axios";

const API_URL = "http://localhost:8081/api/pacientes";

export const getPacientes = () => {
  return axios.get(`${API_URL}/all`);
};

export const createPaciente = (paciente) => {
  return axios.post(`${API_URL}/create`, paciente);
};
