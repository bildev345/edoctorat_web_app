import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { DIRECTEUR_POLE_ROUTE, LABO_ROUTE } from "../../routes/constants";

const oauthMessages = {
  NO_TOKEN: "Échec OAuth : aucun token reçu. Réessayez.",
  NO_EMAIL: "Échec OAuth : Google n’a pas fourni l’email.",
  USER_NOT_FOUND: "Échec OAuth : cet email n’existe pas dans la base de données.",
  ROLE_NOT_ALLOWED: "Google est réservé aux professeurs / directeurs.",
  ACCOUNT_DISABLED: "Compte désactivé. Contactez l’administration.",
};

function roleHome(roles = []) {
  if (roles.includes("ROLE_CANDIDAT")) return "/candidat";
  if (roles.includes("ROLE_SCOLARITE")) return "/scolarite"; // si pas prêt, remplace par "/"

  if (roles.includes("ROLE_PROFESSOR")) return "/professeur";
  if (roles.includes("ROLE_DIRECTEUR_LABO")) return LABO_ROUTE;
  if (roles.includes("ROLE_DIRECTEUR_POLE")) return DIRECTEUR_POLE_ROUTE;
  if (roles.includes("ROLE_DIRECTEUR_CED")) return "/directeur-ced";

  return "/";
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const oauthError = useMemo(
    () => new URLSearchParams(location.search).get("oauthError"),
    [location.search]
  );

  const oauthMessage = oauthError
    ? oauthMessages[oauthError] || `OAuth erreur : ${oauthError}`
    : null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { username, password });
      const token = res?.data?.data?.token;

      if (!token) {
        setError("Token manquant dans la réponse du serveur.");
        return;
      }

      login(token);

      const decoded = jwtDecode(token);
      const roles = decoded?.roles || [];
      navigate(roleHome(Array.isArray(roles) ? roles : [roles]), { replace: true });
    } catch (err) {
      setError(err?.message || "Identifiants incorrects");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <div className="text-center mb-4">
          <img src="/logo-usmba.png" alt="Logo" width="150" className="img-fluid" />
        </div>

        <h5 className="text-center mb-4 fw-bold text-primary">Se connecter</h5>

        {oauthMessage && (
          <div className="alert alert-warning text-center py-2">{oauthMessage}</div>
        )}

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom d’utilisateur ou email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Entrez votre email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-2 d-flex justify-content-between">
            <label className="form-label">Mot de passe</label>
            <Link to="/forgot-password" className="small text-decoration-none">
              Mot de passe oublié ?
            </Link>
          </div>

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Se connecter
          </button>
        </form>

        <div className="text-center text-muted mb-2">ou</div>

        <button
          type="button"
          className="btn w-100 mb-2 d-flex align-items-center justify-content-center gap-2 border"
          style={{ backgroundColor: "white" }}
          onClick={handleGoogleLogin}
        >
          <img src="/google-icon.png" alt="Google" width="18" height="18" />
          Continuer avec Google
        </button>

        <div className="text-center mt-3 small">
          Vous n’avez pas de compte ?{" "}
          <Link to="/register" className="fw-semibold text-decoration-none">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
