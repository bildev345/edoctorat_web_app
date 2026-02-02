import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function roleHome(roles = []) {
  if (roles.includes("ROLE_CANDIDAT")) return "/candidat";
  if (roles.includes("ROLE_SCOLARITE")) return "/scolarite";
  if (roles.includes("ROLE_PROFESSOR")) return "/professeur";
  if (roles.includes("ROLE_DIRECTEUR_LABO")) return "/directeur-labo";
  if (roles.includes("ROLE_DIRECTEUR_POLE")) return "/directeur-pole";
  if (roles.includes("ROLE_DIRECTEUR_CED")) return "/directeur-ced";
  return "/";
}

export default function ActivateAccount() {
  const [msg, setMsg] = useState("Activation en cours...");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      setMsg("Token manquant.");
      return;
    }

    (async () => {
      try {
        const res = await api.get(`/auth/activate?token=${encodeURIComponent(token)}`);

        const jwt = res?.data?.data?.token;
        if (!jwt) {
          setMsg("Compte activé, mais token manquant. Connectez-vous.");
          setTimeout(() => navigate("/login", { replace: true }), 1200);
          return;
        }

        login(jwt);

        const decoded = jwtDecode(jwt);
        const roles = decoded?.roles || [];
        const home = roleHome(Array.isArray(roles) ? roles : [roles]);

        setMsg("Compte activé  Redirection...");
        setTimeout(() => navigate(home, { replace: true }), 800);
      } catch (err) {
        const backendMsg = err?.response?.data?.message;
        setMsg(backendMsg || "Activation échouée.");
      }
    })();
  }, [location.search, navigate, login]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: 420 }}>
        <div className="text-center mb-3">
          <img src="/logo-usmba.png" alt="Logo" width="120" className="img-fluid" />
        </div>
        <h5 className="text-center fw-bold text-primary mb-2">Activation</h5>
        <p className="text-center m-0">{msg}</p>
        <p className="text-center text-muted small mt-2">
          Vous pouvez fermer cette page après activation.
        </p>
      </div>
    </div>
  );
}
