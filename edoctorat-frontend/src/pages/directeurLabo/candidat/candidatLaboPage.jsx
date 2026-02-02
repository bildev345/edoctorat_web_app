import { useState } from "react";
import PostulesPage from "./postulesPage";
import InscritsPage from "./listInscritsLabo";

export default function CandidatPage() {
  const [tab, setTab] = useState("postules");

  return (
    <div className="container mt-4">
      <h3>Candidats</h3>

      <div className="nav nav-tabs mb-3">
        <button
          className={`nav-link ${tab === "postules" && "active"}`}
          onClick={() => setTab("postules")}
        >
          Candidats postulés
        </button>

        <button
          className={`nav-link ${tab === "inscrits" && "active"}`}
          onClick={() => setTab("inscrits")}
        >
          Candidats inscrits
        </button>
      </div>

      {tab === "postules" && <PostulesPage />}
      {tab === "inscrits" && <InscritsPage />}
    </div>
  );
}
