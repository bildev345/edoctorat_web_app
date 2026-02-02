import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function ResetPassword() {
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  const submit = async () => {
    if (!token) {
      setErr("Token manquant dans le lien.");
      return;
    }

    setErr("");
    setMsg("");
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, newPassword: pwd });
      setMsg("Mot de passe modifié. Redirection vers login...");
      setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch (e) {
      setErr("Lien invalide/expiré ou erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h4 className="mb-3">Réinitialiser le mot de passe</h4>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Nouveau mot de passe"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={submit} disabled={loading || !pwd}>
        {loading ? "Changement..." : "Changer"}
      </button>
    </div>
  );
}
