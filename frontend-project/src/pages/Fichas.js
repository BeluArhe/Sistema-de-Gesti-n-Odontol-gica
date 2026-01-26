import { useEffect, useState, useCallback } from "react";
import { getFichasByPaciente, createFicha } from "../services/fichasService";
// 1. IMPORTAMOS EL COMPONENTE ODONTOGRAMA
import Odontograma from "./Odontograma"; 

function Fichas({ paciente }) {
  const [fichas, setFichas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  
  // 2. NUEVO ESTADO PARA SABER SI ESTAMOS VIENDO EL ODONTOGRAMA
  const [viendoOdontograma, setViendoOdontograma] = useState(false); 

  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [dolorIntensidad, setDolorIntensidad] = useState("");
  const [examenObservaciones, setExamenObservaciones] = useState("");

  const cargarFichas = useCallback(() => {
    if (!paciente?.id) return;
    getFichasByPaciente(paciente.id)
      .then((res) => setFichas(res.data))
      .catch((err) => {
        console.error("Error al cargar fichas", err);
        setFichas([]);
      });
  }, [paciente]);

  useEffect(() => {
    cargarFichas();
  }, [cargarFichas]);

  /* --- Lógica del formulario (Igual que antes) --- */
  const limpiarFormulario = () => {
    setMotivoConsulta("");
    setDiagnostico("");
    setDolorIntensidad("");
    setExamenObservaciones("");
  };

  const guardarFicha = () => {
    if (!motivoConsulta.trim()) {
      alert("El motivo de consulta es obligatorio");
      return;
    }
    const nuevaFicha = {
      pacienteId: paciente.id,
      fecha: new Date().toISOString().split("T")[0],
      motivoConsulta,
      diagnostico: { descripcion: diagnostico },
      dolor: { intensidad: dolorIntensidad },
      examenFisico: { observaciones: examenObservaciones },
    };
    createFicha(nuevaFicha)
      .then(() => {
        limpiarFormulario();
        setMostrarFormulario(false);
        cargarFichas();
      })
      .catch((err) => {
        console.error("Error al crear ficha", err);
        alert("Error al crear ficha");
      });
  };

  /* =======================================================
     3. VISTA CONDICIONAL: SI ESTAMOS EN ODONTOGRAMA
     ======================================================= */
  if (viendoOdontograma && fichaSeleccionada) {
    return (
      <div className="fichas-container">
        <button 
          className="btn btn-back" 
          onClick={() => setViendoOdontograma(false)}
        >
          ← Volver al detalle de la Ficha
        </button>
        
        {/* Renderizamos el Odontograma pasándole la ficha actual */}
        <Odontograma ficha={fichaSeleccionada} />
      </div>
    );
  }

  /* ===============================
     VISTA NORMAL DE FICHAS
  =============================== */
  if (!paciente) return null;

  return (
    // Nota: Quitamos "fichas-container" de aquí si Fichas se renderiza DENTRO 
    // de Pacientes (que ya tiene container), o lo dejamos si queremos doble borde.
    // Para limpieza visual, usaremos un div simple aquí.
    <div> 
      <div className="fichas-header">
        <h3>
          Historial de: {paciente.nombre} {paciente.apellido}
        </h3>
        <button 
          className={mostrarFormulario ? "btn btn-secondary" : "btn btn-primary"}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "+ Nueva Ficha"}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="form-container">
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Motivo de consulta *"
              value={motivoConsulta}
              onChange={(e) => setMotivoConsulta(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Diagnóstico"
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Intensidad del dolor (1-10)"
              value={dolorIntensidad}
              onChange={(e) => setDolorIntensidad(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-textarea"
              placeholder="Observaciones examen físico"
              value={examenObservaciones}
              onChange={(e) => setExamenObservaciones(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={guardarFicha}>
            Guardar Ficha
          </button>
        </div>
      )}

      <ul className="fichas-list">
        {fichas.length === 0 && <li style={{padding:'20px', textAlign:'center', color:'#888'}}>Sin historial.</li>}

        {fichas.map((f) => (
          <li key={f.id} className="ficha-item">
            <div className="ficha-info">
              <span className="ficha-date">{f.fecha}</span>
              <span className="ficha-reason">{f.motivoConsulta}</span>
            </div>
            <button 
              className="btn btn-action" 
              onClick={() => {
                  setFichaSeleccionada(f);
                  setViendoOdontograma(false); // Aseguramos resetear vista
              }}
            >
              Ver Detalle
            </button>
          </li>
        ))}
      </ul>

      {fichaSeleccionada && (
        <div className="ficha-detail-card">
          <div className="fichas-header" style={{borderBottom: '1px dashed #ccc'}}>
            <h4>Detalle de la Consulta</h4>
            <button className="btn btn-secondary" style={{padding:'5px 10px', fontSize:'12px'}} onClick={() => setFichaSeleccionada(null)}>Cerrar Detalle</button>
          </div>

          <div className="detail-grid">
            <div className="detail-item"><strong>Fecha</strong><p>{fichaSeleccionada.fecha}</p></div>
            <div className="detail-item"><strong>Motivo</strong><p>{fichaSeleccionada.motivoConsulta}</p></div>
            <div className="detail-item"><strong>Diagnóstico</strong><p>{fichaSeleccionada.diagnostico?.descripcion || "-"}</p></div>
            <div className="detail-item"><strong>Dolor</strong><p>{fichaSeleccionada.dolor?.intensidad || "-"}</p></div>
          </div>
          <div className="detail-item">
             <strong>Examen físico</strong>
             <p>{fichaSeleccionada.examenFisico?.observaciones || "-"}</p>
          </div>

          <div style={{marginTop: '20px', textAlign: 'right'}}>
            {/* 4. BOTÓN QUE ACTIVA LA VISTA DEL ODONTOGRAMA */}
            <button
                className="btn btn-primary"
                onClick={() => setViendoOdontograma(true)}
            >
                🦷 Ver Odontograma
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fichas;