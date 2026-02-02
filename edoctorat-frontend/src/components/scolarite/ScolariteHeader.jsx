import { useAuth } from "../../context/AuthContext";
import { LogOut, User, ChevronDown, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ScolariteHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark border-bottom px-4 py-3">
      <div className="d-flex align-items-center gap-3">
        <span className="navbar-brand fw-bold m-0 text-white" style={{ fontSize: 24 }}>
          e-Doctorat
        </span>
        <span className="badge bg-light text-dark">Scolarité</span>
      </div>

      <div className="dropdown">
        <button
          className="btn btn-outline-light d-flex align-items-center gap-2 px-3 py-2"
          data-bs-toggle="dropdown"
        >
          <User size={18} />
          <span className="d-none d-md-inline">Menu</span>
          <ChevronDown size={16} />
        </button>

        <ul className="dropdown-menu dropdown-menu-end shadow">
          <li>
            <button
              type="button"
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={() => navigate("/scolarite")}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>
          </li>

          <li><hr className="dropdown-divider" /></li>

          <li>
            <button
              type="button"
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={logout}
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
