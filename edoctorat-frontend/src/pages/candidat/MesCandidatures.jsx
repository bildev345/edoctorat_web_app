import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CandidatApiService } from "../../api/candidatApi/CandidatApiService";

export const MesCandidatures = () => {
  const navigate = useNavigate();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 État de verrouillage (dossier validé)
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    loadCandidatures();
  }, []);

  const loadCandidatures = () => {
    setLoading(true);

    CandidatApiService.getMyCandidatures()
      .then((res) => {
        // res = { dossierValide: boolean, candidatures: [] }
        setCandidatures(res?.candidatures || []);
        setIsLocked(!! subjectsSafeBool(res?.dossierValide));
        setLoading(false);
      })
      .catch(() => {
        setCandidatures([]);
        setIsLocked(false);
        setLoading(false);
      });
  };

  // Helper: transforme en bool propre
  const subjectsSafeBool = (v) => v === true;

  // Bouton "Modifier" -> Redirige vers la liste des sujets
  const handleModifier = () => {
    navigate("/candidat/postuler");
  };

  // Bouton "Valider ma candidature" (Action finale)
  const handleValiderDefinitivement = async () => {
    if (
      !window.confirm(
        "Attention : Après validation, vous ne pourrez plus modifier vos choix. Confirmez-vous l'envoi du dossier ?"
      )
    ) {
      return;
    }

    try {
      await CandidatApiService.validerDossier();
      alert(
        "Félicitations ! Votre dossier de candidature a été validé et transmis à l'administration."
      );
      setIsLocked(true);
    } catch (e) {
      // axios.js renvoie {status, message}
      alert(e?.message || "Erreur : impossible de valider le dossier.");
    }
  };

  return (
    <div className="container-fluid p-0 fade-in pb-5">
      <h2 className="page-title mb-4">Récapitulatif de ma Candidature</h2>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-2 text-muted">Chargement...</p>
            </div>
          ) : candidatures.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-folder2-open display-4"></i>
              <h4 className="mt-3">Aucun choix enregistré.</h4>
              <p>Veuillez choisir des sujets pour constituer votre dossier.</p>
              <button onClick={handleModifier} className="btn btn-primary mt-2">
                Aller aux sujets
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover mb-0 align-middle">
                <thead className="bg-light text-uppercase small text-secondary">
                  <tr>
                    <th style={{ width: "5%" }} className="text-center">
                      #
                    </th>
                    <th style={{ width: "30%" }}>Titre du Sujet</th>
                    <th style={{ width: "35%" }}>Description</th>
                    <th style={{ width: "15%" }}>Encadrant</th>
                    <th style={{ width: "15%" }}>Structure</th>
                  </tr>
                </thead>
                <tbody>
                  {candidatures.map((c, index) => (
                    <tr key={index}>
                      <td className="text-center fw-bold text-muted">{index + 1}</td>
                      <td className="fw-bold text-primary">{c.titre}</td>
                      <td className="small text-muted">{c.description || "Aucune description."}</td>
                      <td className="fw-semibold small">
                        <i className="bi bi-person-fill me-1"></i>
                        {c.prof}
                      </td>
                      <td className="small">
                        <div className="fw-bold">{c.lab}</div>
                        <div className="text-muted fst-italic">{c.cedoc}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* --- ZONE DES BOUTONS D'ACTION --- */}
        {candidatures.length > 0 && (
          <div className="card-footer bg-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              {/* Bouton Modifier (Gauche) */}
              <button
                onClick={handleModifier}
                disabled={isLocked}
                className="btn btn-outline-secondary px-4"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Modifier / Ajouter des choix
              </button>

              {/* Bouton Valider (Droite) */}
              <button
                onClick={handleValiderDefinitivement}
                disabled={isLocked}
                className="btn btn-success btn-lg px-5 shadow-sm fw-bold"
              >
                {isLocked ? "Dossier Validé" : "Valider ma candidature"}
                <i className="bi bi-check-circle-fill ms-2"></i>
              </button>
            </div>

            {isLocked && (
              <div className="alert alert-info mt-3 mb-0 text-center">
                <i className="bi bi-lock-fill me-2"></i>
                Votre dossier a été transmis. Vous ne pouvez plus le modifier.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
