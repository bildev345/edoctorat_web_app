import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { DIRECTEUR_POLE_ROUTE, LABO_ROUTE } from "../../routes/constants";

function roleHome(roles = []) {
  if (roles.includes("ROLE_CANDIDAT")) return "/candidat";
  if (roles.includes("ROLE_SCOLARITE")) return "/scolarite"; // si pas prêt, remplace par "/"

  if (roles.includes("ROLE_PROFESSOR")) return "/professeur";
  if (roles.includes("ROLE_DIRECTEUR_LABO")) return LABO_ROUTE;
  if (roles.includes("ROLE_DIRECTEUR_POLE")) return DIRECTEUR_POLE_ROUTE;
  if (roles.includes("ROLE_DIRECTEUR_CED")) return "/directeur-ced";

  return "/";
}

export default function OAuth2Callback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login?oauthError=NO_TOKEN", { replace: true });
      return;
    }

    login(token);
    window.history.replaceState({}, document.title, "/oauth2/callback");

    const decoded = jwtDecode(token);
    const roles = decoded?.roles || [];
    navigate(roleHome(Array.isArray(roles) ? roles : [roles]), { replace: true });
  }, [location.search, login, navigate]);

  return (
    <div className="container py-5">
      <h4>Connexion en cours...</h4>
      <p className="text-muted">Merci de patienter.</p>
    </div>
  );
}
