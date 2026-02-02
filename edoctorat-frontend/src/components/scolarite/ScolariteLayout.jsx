import { Outlet } from "react-router-dom";
import ScolariteHeader from "./ScolariteHeader";
import ScolariteSidebar from "./ScolariteSidebar";

export default function ScolariteLayout() {
  return (
    <div className="d-flex flex-column vh-100 vw-100" style={{ margin: 0, padding: 0 }}>
      <ScolariteHeader />

      <div className="d-flex flex-grow-1 overflow-hidden">
        <ScolariteSidebar />

        <main className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: "#fff" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
