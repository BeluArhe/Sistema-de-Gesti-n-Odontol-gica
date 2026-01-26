import { useState, useEffect } from "react";
import Pacientes from "./pages/Pacientes"; 
import Login from "./pages/Login"; // <--- Importa el nuevo componente
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // (Opcional) Esto mantiene la sesión activa si recargas la página
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("dentalUser");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("dentalUser", JSON.stringify(userData)); // Guardar sesión
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("dentalUser"); // Borrar sesión
  };

  // --- LÓGICA PRINCIPAL: Si no hay usuario, muestra Login ---
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // --- Si hay usuario, muestra la App completa ---
  return (
    <div className="app-layout">
      
      {/* Barra Superior */}
      <header className="app-navbar">
        <div className="app-brand">
          <span className="app-brand-icon">🦷</span>
          DentalSoft
        </div>
        
        {/* Información del Usuario y Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.9rem' }}>Hola, {user.nombre}</span>
            <button 
                onClick={handleLogout}
                style={{
                    background: 'rgba(255,255,255,0.2)', 
                    border: 'none', 
                    color: 'white', 
                    padding: '5px 10px', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Salir
            </button>
        </div>
      </header>

      {/* Contenido Central */}
      <main className="app-main">
        <Pacientes />
      </main>

      {/* Pie de Página */}
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Sistema de Gestión Odontológica</p>
      </footer>

    </div>
  );
}

export default App;