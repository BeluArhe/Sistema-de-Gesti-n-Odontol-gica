import Pacientes from "./pages/Pacientes"; // Asegúrate que la ruta sea correcta
import './App.css';

function App() {
  return (
    <div className="app-layout">
      
      {/* Barra Superior */}
      <header className="app-navbar">
        <div className="app-brand">
          <span className="app-brand-icon">🦷</span>
          DentalSoft
        </div>
        {/* Aquí podrías agregar en el futuro: Login, Configuración, etc. */}
      </header>

      {/* Contenido Central */}
      <main className="app-main">
        {/* Aquí renderizamos tu módulo principal */}
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