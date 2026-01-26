import { useEffect, useState } from "react";
// Importamos updateDiente
import {
  getOdontogramaByPaciente,
  createOdontograma,
  updateDiente  // <--- CAMBIO IMPORTANTE
} from "../services/odontogramaService";
import "./Odontograma.css"; 

function Odontograma({ pacienteId }) { 
  const [odontograma, setOdontograma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorBackend, setErrorBackend] = useState(false);
  
  const [dienteSeleccionado, setDienteSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [nuevaObservacion, setNuevaObservacion] = useState("");

  useEffect(() => {
    if (!pacienteId) {
        setLoading(false);
        return;
    }
    cargarOdontograma();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pacienteId]);

  const cargarOdontograma = () => {
    setLoading(true);
    setErrorBackend(false);

    getOdontogramaByPaciente(pacienteId)
      .then((res) => {
        if (res.data && res.data.length > 0) {
            setOdontograma(res.data[0]); 
            setLoading(false);
        } else {
            crearInicial();
        }
      })
      .catch((err) => {
        console.error("Error al cargar:", err);
        if (err.code === "ERR_NETWORK" || err.message.includes("Network Error")) {
            setErrorBackend(true);
        }
        setLoading(false);
      });
  };

  const crearInicial = () => {
    const c1 = [18,17,16,15,14,13,12,11];
    const c2 = [21,22,23,24,25,26,27,28];
    const c4 = [48,47,46,45,44,43,42,41];
    const c3 = [31,32,33,34,35,36,37,38];

    const todosLosDientes = [...c1, ...c2, ...c4, ...c3].map(n => ({
      numeroDiente: n,  
      estado: "SANO",
      observaciones: ""
    }));

    const nuevo = {
      pacienteId: pacienteId, 
      observacionesGenerales: "Inicial",
      dientes: todosLosDientes
    };

    createOdontograma(nuevo)
      .then((res) => {
        // Al crear, el backend nos devuelve el objeto con los IDs generados.
        // Es CRUCIAL guardar esto en el estado.
        setOdontograma(res.data);
      })
      .catch((err) => {
         console.error("Error al crear:", err);
         if (err.code === "ERR_NETWORK") setErrorBackend(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const abrirEditor = (diente) => {
    setDienteSeleccionado(diente);
    setNuevoEstado(diente.estado);
    setNuevaObservacion(diente.observaciones || "");
  };

  // --- AQUÍ ESTÁ EL CAMBIO CLAVE PARA QUE NO SE ROMPA ---
  const guardarCambiosDiente = () => {
    if (!dienteSeleccionado || !odontograma) return;

    // 1. Preparamos el objeto diente solo con los datos necesarios
    // IMPORTANTE: dienteSeleccionado.id debe existir (viene de la BD)
    const dienteParaEnviar = {
        id: dienteSeleccionado.id, 
        numeroDiente: dienteSeleccionado.numeroDiente,
        estado: nuevoEstado,
        observaciones: nuevaObservacion,
        odontogramaId: odontograma.id // Mantenemos la referencia
    };

    // 2. Actualizamos PRIMERO la interfaz visual (Optimistic UI)
    // Esto hace que el usuario vea el cambio instantáneamente
    const dientesActualizados = odontograma.dientes.map((d) => {
      if (d.numeroDiente === dienteSeleccionado.numeroDiente) {
        return { ...d, estado: nuevoEstado, observaciones: nuevaObservacion };
      }
      return d;
    });
    setOdontograma({ ...odontograma, dientes: dientesActualizados });
    setDienteSeleccionado(null); // Cerramos el modal

    // 3. Enviamos SOLO ese diente al backend
    // Usamos el endpoint '/dientes/{id}' que es mucho más seguro
    updateDiente(dienteSeleccionado.id, dienteParaEnviar)
      .then(() => {
          console.log("Diente guardado correctamente");
      })
      .catch((err) => {
          console.error("Error al guardar diente:", err);
          alert("Error al guardar cambios en el servidor. Recarga la página.");
          // Opcional: Podrías revertir el cambio visual aquí si falla
      });
  };

  const getClaseEstado = (estado) => {
    switch (estado) {
      case "SANO": return "estado-sano";
      case "CARIES": return "estado-caries";
      case "EXTRAIDO": return "estado-extraido";
      case "OBTURADO": return "estado-obturado";
      case "TRATAMIENTO": return "estado-tratamiento";
      default: return "";
    }
  };

  // --- RENDERIZADO ---

  if (loading) return <div style={{padding:'20px'}}>Cargando...</div>;

  if (errorBackend) {
      return (
        <div style={{color: 'red', padding: '20px', border: '1px solid red', background: '#fff0f0'}}>
           <h3>⚠️ Error de Conexión</h3>
           <p>Verifica que el Backend (puerto 8083) esté encendido.</p>
        </div>
      );
  }
  
  if (!odontograma) return <div style={{padding:'20px'}}>No se pudo cargar el odontograma.</div>;

  const dientesSuperiores = odontograma.dientes.filter(d => d.numeroDiente < 30);
  const dientesInferiores = odontograma.dientes.filter(d => d.numeroDiente >= 30);

  return (
    <div className="odontograma-container">
      <h3>Odontograma del Paciente {pacienteId}</h3>

      <div className="boca-section">
        <h4>Maxilar Superior</h4>
        <div className="dientes-grid">
          {dientesSuperiores.map((d) => (
             <div key={d.numeroDiente} className={`diente-card ${getClaseEstado(d.estado)}`} onClick={() => abrirEditor(d)}>
               <span className="num">{d.numeroDiente}</span>
               <div className="icon">🦷</div>
               <span className="lbl">{d.estado}</span>
             </div>
          ))}
        </div>
      </div>

      <div className="boca-section">
        <h4>Mandíbula</h4>
        <div className="dientes-grid">
          {dientesInferiores.map((d) => (
             <div key={d.numeroDiente} className={`diente-card ${getClaseEstado(d.estado)}`} onClick={() => abrirEditor(d)}>
               <span className="num">{d.numeroDiente}</span>
               <div className="icon">🦷</div>
               <span className="lbl">{d.estado}</span>
             </div>
          ))}
        </div>
      </div>

      {dienteSeleccionado && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Diente {dienteSeleccionado.numeroDiente}</h4>
            <select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
              <option value="SANO">SANO</option>
              <option value="CARIES">CARIES</option>
              <option value="OBTURADO">OBTURADO</option>
              <option value="EXTRAIDO">EXTRAIDO</option>
              <option value="TRATAMIENTO">TRATAMIENTO</option>
            </select>
            <textarea value={nuevaObservacion} onChange={(e) => setNuevaObservacion(e.target.value)} />
            <div className="botones">
              <button onClick={() => setDienteSeleccionado(null)}>Cancelar</button>
              <button onClick={guardarCambiosDiente}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Odontograma;