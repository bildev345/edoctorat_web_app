import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, ChevronDown, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ProfesseurHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const fullName = useMemo(() => {
    if (!user) return "Professeur";
    if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`;
    if (user?.nom && user?.prenom) return `${user.nom} ${user.prenom}`;
    if (user?.email) return user.email;
    return "Professeur";
  }, [user]);

  // Fermer si clic خارج
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fermer avec ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLogout = () => {
    logout(); // supprime token + user
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-dark bg-dark border-bottom px-4 py-3">
      <div className="d-flex align-items-center gap-3">
        <span className="navbar-brand fw-bold m-0 text-white" style={{ fontSize: 24 }}>
          e-Doctorat
        </span>
        <span className="badge bg-light text-dark">Professeur</span>
      </div>

      <div className="position-relative" ref={menuRef}>
        <button
          type="button"
          className="btn btn-outline-light d-flex align-items-center gap-2 px-3 py-2"
          onClick={() => setOpen((v) => !v)}
        >
          <User size={18} />
          <span className="d-none d-md-inline">{fullName}</span>
          <ChevronDown size={16} />
        </button>

        {open && (
          <div
            className="dropdown-menu dropdown-menu-end shadow show"
            style={{ position: "absolute", right: 0, top: "calc(100% + 8px)" }}
          >
            {/* ✅ Professeur Dashboard */}
            <button
              type="button"
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={() => {
                setOpen(false);
                navigate("/professeur");
              }}
            >
              <LayoutDashboard size={16} />
              Professeur – Dashboard
            </button>

            <div className="dropdown-divider" />

            {/* ✅ Déconnexion uniquement */}
            <button
              type="button"
              className="dropdown-item d-flex align-items-center gap-2 text-danger"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
