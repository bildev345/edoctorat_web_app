import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "CANDIDAT",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (e) => {
    setForm((p) => ({ ...p, role: e.target.value }));
  };

  const getServerMessage = (err) =>
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Erreur lors de l’inscription";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        username: form.username.trim(),
        password: form.password,
        role: form.role,
      });

      setSuccessMsg(
        res?.data?.message ||
          "Compte créé. Vérifiez votre boîte email pour activer votre compte."
      );

      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (err) {
      setError(getServerMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start bg-light min-vh-100">
      <div className="card shadow" style={{ width: "480px", marginTop: "20px" }}>
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <img src="/logo-usmba.png" alt="Logo USMBA" width="150" className="img-fluid" />
          </div>

          <h4 className="text-center mb-4 fw-bold text-primary">Créer un compte</h4>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}

          <div className="mb-3">
            <label className="form-label fw-semibold">Type de compte</label>
            <div className="d-flex gap-3">
              <label className="border rounded px-3 py-2 w-100" style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="role"
                  value="CANDIDAT"
                  checked={form.role === "CANDIDAT"}
                  onChange={handleRoleChange}
                  className="me-2"
                  disabled={loading}
                />
                Candidat
              </label>

              <label className="border rounded px-3 py-2 w-100" style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="role"
                  value="SCOLARITE"
                  checked={form.role === "SCOLARITE"}
                  onChange={handleRoleChange}
                  className="me-2"
                  disabled={loading}
                />
                Scolarité
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col mb-3">
                <input
                  name="lastName"
                  placeholder="Nom"
                  className="form-control"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="col mb-3">
                <input
                  name="firstName"
                  placeholder="Prénom"
                  className="form-control"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <input
              name="username"
              placeholder="Email"
              className="form-control mb-3"
              value={form.username}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <div className="input-group mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword((v) => !v)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
              </span>
            </div>

            <div className="input-group mb-4">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmer mot de passe"
                className="form-control"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirm((v) => !v)}
              >
                <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`} />
              </span>
            </div>

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Création en cours..." : "Créer le compte"}
            </button>
          </form>

          <div className="text-center mt-3 small">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
