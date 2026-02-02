import React, { useEffect, useState } from "react";
import { CandidatApiService } from "../../api/candidatApi/CandidatApiService";
import { CandidatCard } from "../../components/candidat/CandidatCard";
import { PersonalInfoSection } from "../../components/candidat/PersonalInfoSection";

export const Profil = () => {
  const [candidat, setCandidat] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const infoData = await CandidatApiService.getInfoPerso();
      if (infoData) {
        setCandidat(infoData);
        if (infoData.id) {
          localStorage.setItem("candidatId", infoData.id);
        }
      }
    } catch (error) {
      console.error("Erreur de chargement du profil", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !candidat) return <div className="spinner-border"></div>;

  return (
    <div className="container-fluid p-0 fade-in pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Mon Profil Candidat</h2>

        {/* ✅ BOUTONS SUPPRIMÉS ICI */}
        {/* Rien à afficher */}
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-lg-4">
          <CandidatCard candidat={candidat} />
        </div>

        <div className="col-lg-8">
          <PersonalInfoSection
            candidat={candidat}
            isEditing={false}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
