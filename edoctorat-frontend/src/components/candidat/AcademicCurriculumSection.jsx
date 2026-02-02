import React from 'react';

export const AcademicCurriculumSection = ({ diplomes }) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3">
        <h5 className="mb-0 text-primary fw-bold"><i className="bi bi-mortarboard-fill me-2"></i>Cursus Académique</h5>
      </div>
      <div className="card-body p-0">
        {diplomes.length === 0 ? (
          <div className="p-4 text-muted text-center">Aucun diplôme enregistré.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Diplôme</th>
                  <th>Spécialité</th>
                  <th>Établissement</th>
                  <th className="text-center">Moyenne</th>
                  <th className="text-center">Fichier</th>
                </tr>
              </thead>
              <tbody>
                {diplomes.map((d, index) => (
                  <tr key={index}>
                    <td className="ps-4">
                      <div className="fw-bold text-primary">{d.intitule}</div>
                      <small className="text-muted">{d.type}</small>
                    </td>
                    <td>{d.specialite}</td>
                    <td>
                      <div className="fw-bold">{d.etablissement}</div>
                      <small className="text-muted">{d.ville}</small>
                    </td>
                    <td className="text-center">
                      <span className={`badge ${d.moyenneGenerale >= 14 ? 'bg-success' : 'bg-secondary'}`}>
                        {d.moyenneGenerale}/20
                      </span>
                      <div className="small text-muted mt-1">{d.mention}</div>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-light btn-sm border text-danger" title="Voir le scan">
                        <i className="bi bi-file-pdf-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
