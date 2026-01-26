import api from "./axiosConfig";

export const getOdontograma = (pacienteId) =>
  api.get(`http://localhost:8083/odontograma/${pacienteId}`);

export const guardarOdontograma = (data) =>
  api.post("http://localhost:8083/odontograma", data);
