import { useState } from "react";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // --- AQUÍ CONECTARÍAS CON TU BACKEND REAL ---
    // axios.post('/api/login', { usuario, password })...
    
    // Simulación de autenticación
    if (usuario === "admin" && password === "admin") {
      onLogin({ nombre: "Dr. Luis Coronado", rol: "Admin" });
    } else {
      setError("Credenciales incorrectas (Prueba: admin / admin)");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <span style={{ fontSize: "3rem" }}>🦷</span>
          <h2>DentalSoft</h2>
          <p>Ingrese sus credenciales</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;