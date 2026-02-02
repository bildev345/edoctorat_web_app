import { NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardCheck } from "lucide-react";

export default function ScolariteSidebar() {
  const linkClass =
    "text-decoration-none text-dark d-flex align-items-center gap-2 px-3 py-3 rounded sidebar-link";

  return (
    <aside className="bg-white border-end" style={{ width: 260 }}>
      <nav className="p-3">
        <ul className="list-unstyled m-0">
          <li className="mb-2">
            <NavLink
              to="."
              end
              className={({ isActive }) => `${linkClass} ${isActive ? "active" : ""}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              to="inscriptions"
              className={({ isActive }) => `${linkClass} ${isActive ? "active" : ""}`}
            >
              <ClipboardCheck size={18} /> Inscriptions
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
