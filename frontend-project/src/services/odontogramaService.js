import axios from "axios";

// Ajusta el puerto si tu Spring Boot corre en otro
const API_URL = "http://localhost:8083/api/odontogramas";

// Obtener por ID de paciente (Coincide con @GetMapping("/paciente/{pacienteId}"))
export const getOdontogramaByPaciente = (pacienteId) => {
  return axios.get(`${API_URL}/paciente/${pacienteId}`);
};

// Crear (Coincide con @PostMapping("/crear"))
export const createOdontograma = (odontograma) => {
  return axios.post(`${API_URL}/crear`, odontograma);
};

// Actualizar (Coincide con @PutMapping("/{id}"))
export const updateOdontograma = (id, odontograma) => {
  return axios.put(`${API_URL}/${id}`, odontograma);
};

// Actualizar solo un diente (Coincide con @PutMapping("/dientes/{dienteId}"))
export const updateDiente = (dienteId, diente) => {
  return axios.put(`${API_URL}/dientes/${dienteId}`, diente);
};