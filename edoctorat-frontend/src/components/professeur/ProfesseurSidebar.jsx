import { NavLink } from "react-router-dom";
import {
  PROF_CANDIDATS,
  PROF_COMMISSIONS,
  PROF_INSCRITS,
  PROF_RESULTATS,
  PROF_SUJETS,
} from "../../routes/constants";
import { LayoutDashboard, FileText, Users, Gavel, GraduationCap, BarChart3 } from "lucide-react";

export default function ProfesseurSidebar() {
  const linkClass =
    "text-decoration-none text-dark d-flex align-items-center gap-2 px-3 py-3 rounded sidebar-link";

  return (
    <aside className="bg-white border-end" style={{ width: 260 }}>
      <nav className="p-3">
        <ul className="list-unstyled m-0">
          <li className="mb-2">
            <NavLink to="." end className={({ isActive }) => `${linkClass} ${isActive ? "active" : ""}`}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink to={PROF_SUJETS} className={({ isActive }) => `${linkClass} ${isActive ? "active" : ""}`}>
              <FileText size={18} /> Sujets
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink to={PROF_CANDIDATS} className={({ isActive }) => `${linkClass} ${isActive ? "active" : ""}`}>
              <Users size={18} /> Candidats
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink to={PROF_COMMISSIONS} className={({ isActive }) => `${linkClass} ${isActive ? "active" : ""}`}>
              <Gavel size={18} /> Commissions
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink to={PROF_INSCRITS} className={({ isActive }) => `${linkClass} ${isActive ? "active" : ""}`}>
              <GraduationCap size={18} /> Inscrits
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink to={PROF_RESULTATS} className={({ isActive }) => `${linkClass} ${isActive ? "active" : ""}`}>
              <BarChart3 size={18} /> Résultats
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
