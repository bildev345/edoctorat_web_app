import React from 'react';

export const CandidatCard = ({ candidat }) => {
  if (!candidat) return null;

  return (
    <div className="card shadow-sm border-0 text-center p-4">
      <div className="mx-auto mb-3" style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #f8f9fa' }}>
        <div className="w-100 h-100 bg-secondary text-white d-flex align-items-center justify-content-center display-4">
          {/* Gestion simple de l'image ou placeholder */}
          {candidat.pathPhoto ? (
            <img src={`http://localhost:8080/files/${candidat.pathPhoto}`} alt="Candidat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none' }} />
          ) : (
            <i className="bi bi-person"></i>
          )}
        </div>
      </div>
      <h4 className="fw-bold text-primary mb-1">{candidat.nom} {candidat.prenom}</h4>
      <h5 className="text-muted mb-3 font-monospace">{candidat.nomArabe} {candidat.prenomArabe}</h5>

      <div className="badge bg-light text-dark border px-3 py-2 mb-3">
        <i className="bi bi-card-heading me-2"></i>CIN: {candidat.cin}
      </div>

      <hr className="my-3 opacity-25" />

      <div className="text-start">
        <p className="mb-2"><i className="bi bi-envelope-fill me-2 text-primary"></i> {candidat.email}</p>
        <p className="mb-2"><i className="bi bi-telephone-fill me-2 text-primary"></i> {candidat.telCandidat}</p>
        <p className="mb-0"><i className="bi bi-geo-alt-fill me-2 text-primary"></i> {candidat.ville}, {candidat.pays?.nom || "Maroc"}</p>
      </div>
    </div>
  );
};
