import { Outlet } from "react-router";
import { DirecteurLaboSidebar } from "./directeurLaboSidebar";
import ProfesseurHeader from "../professeur/ProfesseurHeader";


export const DirecteurLaboLayout = () => {
  return (
    <div className="d-flex flex-column vh-100 vw-100" style={{margin: 0, padding: 0}}>
      <ProfesseurHeader />

      {/* Main Content Area */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        <DirecteurLaboSidebar />

        {/* Main Body - Dynamic Content Area */}
        <main className="flex-grow-1 overflow-auto" style={{backgroundColor: '#fff'}}>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}