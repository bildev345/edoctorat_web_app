import { useState } from "react";
import api from "../../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setErr("");
    setMsg("");
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setMsg("Email envoyé. Vérifiez votre boîte mail.");
    } catch (e) {
      setErr("Erreur : email introuvable ou problème serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h4 className="mb-3">Mot de passe oublié</h4>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <input
        className="form-control mb-3"
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={submit} disabled={loading || !email}>
        {loading ? "Envoi..." : "Envoyer"}
      </button>
    </div>
  );
}
