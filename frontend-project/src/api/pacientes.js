import api from "./axiosConfig";

export const getPacientes = () =>
  api.get("http://localhost:8081/pacientes");

export const crearPaciente = (paciente) =>
  api.post("http://localhost:8081/pacientes", paciente);
