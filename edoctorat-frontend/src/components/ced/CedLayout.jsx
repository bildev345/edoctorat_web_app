import React from 'react';
import { Outlet } from "react-router-dom";
import ProfesseurHeader from '../professeur/ProfesseurHeader';
import { CedSidebar } from "./CedSidebar"; // <--- Importina Sidebar

export const CedLayout = () => {
  return (
    // CONTAINER GLOBAL (Toul d l'écran kamel: vh-100)
    <div className="d-flex flex-column vh-100 bg-light">
      
      {/* ------------------------------------------------------
          ZONE 1 : HEADER (Fixe lfo9)
      ------------------------------------------------------- */}
      {/* flex-shrink-0: Bach l-header ib9a f blasto maytsgharch */}
      <div className="flex-shrink-0 shadow-sm" style={{ zIndex: 1020 }}>
         <ProfesseurHeader />
      </div>

      {/* ------------------------------------------------------
          ZONE 2 : BODY (Sidebar + Contenu)
          "overflow: hidden" bach l-page mat-scrollich kamla, ghir l-contenu
      ------------------------------------------------------- */}
      <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
        
        {/* A. SIDEBAR (Gauche) */}
        <aside className="flex-shrink-0 border-end bg-white h-100">
            {/* Hna katchrja Sidebar dyalek */}
            <CedSidebar />
        </aside>

        {/* B. MAIN CONTENT (Droite) */}
        {/* "overflowY: auto" bach ghir had l-partie li t-scrolli */}
        <main className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
            <div className="container-fluid">
                {/* Hna fin kaybanu les pages (Sujets, Candidats...) */}
                <Outlet />
            </div>
        </main>

      </div>
    </div>
  );
};