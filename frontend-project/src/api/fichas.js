import api from "./axiosConfig";

export const getFichasPorPaciente = (pacienteId) =>
  api.get(`http://localhost:8082/fichas/paciente/${pacienteId}`);

export const crearFicha = (ficha) =>
  api.post("http://localhost:8082/fichas", ficha);
