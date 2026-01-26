import { useEffect, useState } from "react";
import { getPacientes, createPaciente } from "../services/pacientesService";
import Fichas from "./Fichas";

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Nuevo estado para colapsar form

  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  // cargar pacientes al iniciar
  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = () => {
    getPacientes()
      .then((res) => {
        setPacientes(res.data);
      })
      .catch((err) => {
        console.error("Error cargando pacientes", err);
      });
  };

  const guardarPaciente = () => {
    if (!cedula || !nombre || !apellido) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevoPaciente = { cedula, nombre, apellido };

    createPaciente(nuevoPaciente)
      .then(() => {
        setCedula("");
        setNombre("");
        setApellido("");
        setMostrarFormulario(false); // Ocultar form al guardar exitosamente
        cargarPacientes();
      })
      .catch((err) => {
        console.error("Error al guardar paciente", err);
        alert("Error al guardar paciente (revisa consola)");
      });
  };

  // --- VISTA DE DETALLE (Si hay un paciente seleccionado) ---
  if (pacienteSeleccionado) {
    return (
      <div className="fichas-container">
        <button 
          className="btn btn-back" 
          onClick={() => setPacienteSeleccionado(null)}
        >
          ← Volver a la lista
        </button>
        
        {/* Renderizamos el componente Fichas que ya estilizamos antes */}
        <Fichas paciente={pacienteSeleccionado} />
      </div>
    );
  }

  // --- VISTA PRINCIPAL (Lista de pacientes) ---
  return (
    <div className="fichas-container"> {/* Reutilizamos el contenedor estilo tarjeta */}
      
      <div className="fichas-header">
        <h3>Directorio de Pacientes</h3>
        <button 
          className={mostrarFormulario ? "btn btn-secondary" : "btn btn-primary"}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "+ Nuevo Paciente"}
        </button>
      </div>

      {/* Formulario Desplegable */}
      {mostrarFormulario && (
        <div className="form-container">
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="Cédula de Identidad"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="Nombres"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="Apellidos"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={guardarPaciente}>
            Registrar Paciente
          </button>
        </div>
      )}

      {/* Listado Estilizado */}
      <div className="pacientes-list">
        {pacientes.length === 0 && <p style={{textAlign: 'center', color: '#999'}}>No hay pacientes registrados.</p>}
        
        {pacientes.map((p) => (
          <div key={p.id} className="paciente-item">
            <div style={{display: 'flex', alignItems: 'center'}}>
                {/* Avatar con iniciales */}
                <div className="paciente-avatar">
                    {p.nombre.charAt(0)}{p.apellido.charAt(0)}
                </div>
                
                <div className="paciente-info">
                    <h4>{p.nombre} {p.apellido}</h4>
                    <p>CI: {p.cedula}</p>
                </div>
            </div>

            <button 
                className="btn btn-action" 
                onClick={() => setPacienteSeleccionado(p)}
            >
              Abrir Historial
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pacientes;