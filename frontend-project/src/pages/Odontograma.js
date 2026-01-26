import { useEffect, useState } from "react";
import {
  getOdontogramaByFicha,
  createOdontograma,
  updateOdontograma
} from "../services/odontogramaService";

function Odontograma({ ficha }) {
  const [odontograma, setOdontograma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(""); // Para mostrar el error real
  
  const [dienteSeleccionado, setDienteSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [nuevaObservacion, setNuevaObservacion] = useState("");

  useEffect(() => {
    if (!ficha?.id) return;
    setLoading(true);
    setErrorMsg(""); // Limpiar errores previos

    getOdontogramaByFicha(ficha.id)
      .then((res) => {
        setOdontograma(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // Si es 404 (No encontrado), creamos uno nuevo.
        // Si es "Network Error", es culpa del servidor/CORS.
        console.log("Error al cargar:", err);
        crearInicial();
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ficha]);

  const crearInicial = () => {
    const c1 = ["18","17","16","15","14","13","12","11"];
    const c2 = ["21","22","23","24","25","26","27","28"];
    const c4 = ["48","47","46","45","44","43","42","41"];
    const c3 = ["31","32","33","34","35","36","37","38"];

    const todosLosDientes = [...c1, ...c2, ...c4, ...c3].map(n => ({
      numero: n,
      estado: "SANO",
      observaciones: ""
    }));

    const nuevo = {
      fichaId: ficha.id, // IMPORTANTE: Esto debe coincidir con tu Backend (fichaId o ficha_id)
      observacionesGenerales: "",
      dientes: todosLosDientes
    };

    createOdontograma(nuevo)
      .then((res) => {
        setOdontograma(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error FATAL al crear:", err);
        setLoading(false);
        // Aquí mostramos el error real en pantalla
        if (err.code === "ERR_NETWORK") {
            setErrorMsg("Error de Conexión: El servidor Java está apagado o bloqueando la petición (CORS).");
        } else {
            setErrorMsg(`Error al crear odontograma: ${err.message}`);
        }
      });
  };

  /* ... (El resto de funciones abrirEditor, guardarCambiosDiente, getClaseEstado igual que antes) ... */
  const abrirEditor = (diente) => {
    setDienteSeleccionado(diente);
    setNuevoEstado(diente.estado);
    setNuevaObservacion(diente.observaciones || "");
  };

  const guardarCambiosDiente = () => {
    if (!dienteSeleccionado || !odontograma) return;
    const dientesActualizados = odontograma.dientes.map((d) => {
      if (d.numero === dienteSeleccionado.numero) {
        return { ...d, estado: nuevoEstado, observaciones: nuevaObservacion };
      }
      return d;
    });
    const odontogramaActualizado = { ...odontograma, dientes: dientesActualizados };
    setOdontograma(odontogramaActualizado);
    setDienteSeleccionado(null);

    updateOdontograma(odontograma.id, odontogramaActualizado)
      .catch((err) => alert("Error al guardar en BD: " + err.message));
  };

  const getClaseEstado = (estado) => {
    switch (estado?.toUpperCase()) {
      case "SANO": return "estado-sano";
      case "CARIES": return "estado-caries";
      case "EXTRAIDO": return "estado-extraido";
      case "TRATAMIENTO": return "estado-tratamiento";
      default: return "";
    }
  };

  // --- RENDERIZADO CON MANEJO DE ERRORES ---
  if (loading) return <div style={{padding:'20px', textAlign:'center'}}>Cargando odontograma...</div>;
  
  if (errorMsg) {
    return (
        <div style={{padding:'20px', color:'red', border:'1px solid red', margin:'20px', borderRadius:'8px', backgroundColor:'#fff0f0'}}>
            <h3>⚠️ Ocurrió un problema</h3>
            <p>{errorMsg}</p>
            <p style={{fontSize:'0.8rem', color:'#333'}}>Revisa la consola (F12) para más detalles.</p>
        </div>
    );
  }

  if (!odontograma || !odontograma.dientes) return null;

  const dientesSuperiores = odontograma.dientes.filter(d => d.numero.toString().startsWith('1') || d.numero.toString().startsWith('2'));
  const dientesInferiores = odontograma.dientes.filter(d => d.numero.toString().startsWith('4') || d.numero.toString().startsWith('3'));

  return (
    <div className="odontograma-container">
      <h3 className="odontograma-header">Odontograma Interactivo</h3>
      
      <div className="arco-section">
        <span className="arco-title">Maxilar Superior</span>
        <div className="boca-grid">
          {dientesSuperiores.map((d) => (
             <DienteCard key={d.numero} d={d} onClick={() => abrirEditor(d)} getClase={getClaseEstado}/>
          ))}
        </div>
      </div>

      <div className="arco-section">
        <span className="arco-title">Mandíbula</span>
        <div className="boca-grid">
          {dientesInferiores.map((d) => (
             <DienteCard key={d.numero} d={d} onClick={() => abrirEditor(d)} getClase={getClaseEstado}/>
          ))}
        </div>
      </div>

      {/* ... Leyenda y Modal igual que antes ... */}
      {dienteSeleccionado && (
        <div className="modal-overlay" onClick={() => setDienteSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>Diente {dienteSeleccionado.numero}</h4>
            <select className="select-estado" value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
              <option value="SANO">SANO</option>
              <option value="CARIES">CARIES</option>
              <option value="EXTRAIDO">EXTRAÍDO</option>
              <option value="TRATAMIENTO">EN TRATAMIENTO</option>
            </select>
            <textarea className="form-textarea" value={nuevaObservacion} onChange={(e) => setNuevaObservacion(e.target.value)}/>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDienteSeleccionado(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={guardarCambiosDiente}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DienteCard({ d, onClick, getClase }) {
  return (
    <div className={`diente-card ${getClase(d.estado)}`} onClick={onClick} title={d.observaciones}>
      <span className="diente-numero">{d.numero}</span>
      <div className="diente-icono"></div>
      <span className="diente-label">{d.estado}</span>
    </div>
  );
}

export default Odontograma;