import { Outlet } from "react-router-dom";
import ProfesseurHeader from "./ProfesseurHeader";
import ProfesseurSidebar from "./ProfesseurSidebar";

export default function ProfesseurLayout() {
  return (
    <div className="d-flex flex-column vh-100 vw-100" style={{ margin: 0, padding: 0 }}>
      <ProfesseurHeader />

      <div className="d-flex flex-grow-1 overflow-hidden">
        <ProfesseurSidebar />

        <main className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: "#fff" }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        .hover-bg-secondary:hover {
          background-color: #e9ecef;
        }
      `}</style>
    </div>
  );
}
