import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { FaLock, FaUser, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./Login.css";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Podaj login i hasło.");
      return;
    }

    setLoading(true);
    // Symulacja krótkiego zapytania do serwera dla lepszego odczucia "działania".
    setTimeout(() => {
      const result = login(username, password);
      setLoading(false);
      if (result.success) {
        showToast("Zalogowano pomyślnie. Witaj!", "success");
        navigate(location.state?.from?.pathname || "/", { replace: true });
      } else {
        setError(result.error);
      }
    }, 400);
  };

  const fillDemoAccount = () => {
    setUsername("admin");
    setPassword("admin123");
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-logo">CRM</span>
          <p className="login-tagline">Zaloguj się do panelu zarządzania klientami</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <label className="login-field">
            <span>Login</span>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                autoFocus
              />
            </div>
          </label>

          <label className="login-field">
            <span>Hasło</span>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-icon-toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
            <FaSignInAlt /> {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>

        <div className="login-demo-hint">
          <p>
            Konto demo: <strong>admin</strong> / <strong>admin123</strong>
          </p>
          <button type="button" className="btn btn-secondary btn-sm" onClick={fillDemoAccount}>
            Wypełnij dane demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
