import React from 'react';

export const SujetTable = ({ sujets, selectedTitres, onToggleSelect }) => {
  
  if (!sujets || sujets.length === 0) {
    return (
        <div className="alert alert-light text-center py-5 border mt-4">
            <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
            Aucun sujet affiché. Lancez une recherche.
        </div>
    );
  }

  return (
    <div className="table-responsive bg-white rounded shadow-sm border mt-4">
        <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
                <tr>
                    <th className="py-3 ps-3" style={{width: '35%'}}>Sujet de Thèse</th>
                    <th className="py-3" style={{width: '15%'}}>Établissement</th>
                    <th className="py-3" style={{width: '20%'}}>Encadrement</th>
                    <th className="py-3" style={{width: '20%'}}>Structure</th>
                    <th className="py-3 text-center" style={{width: '10%'}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {sujets.map((sujet) => {
                    // Vérifie si ce sujet est dans la liste des "déjà choisis"
                    const isSelected = selectedTitres.includes(sujet.titre);
                    // On désactive le bouton si on a atteint 3 MAIS que ce sujet n'est pas sélectionné
                    const isDisabled = !isSelected && selectedTitres.length >= 3;

                    return (
                        <tr key={sujet.id} className={isSelected ? "table-success" : ""}>
                            {/* Colonne Sujet */}
                            <td className="ps-3">
                                <div className="fw-bold text-primary mb-1">{sujet.titre}</div>
                                <span className="badge bg-light text-secondary border">{sujet.formationNom}</span>
                            </td>

                            {/* Colonne Etablissement */}
                            <td>
                                <div className="fw-bold text-dark small">{sujet.etablissementNom}</div>
                            </td>

                            {/* Colonne Encadrement */}
                            <td>
                                <div className="fw-semibold text-dark small">
                                    <i className="bi bi-person-circle me-2 text-primary"></i>
                                    {sujet.profNom}
                                </div>
                            </td>

                            {/* Colonne Structure */}
                            <td>
                                <div className="fw-bold text-dark small">{sujet.labNom}</div>
                                <div className="text-muted small fst-italic">{sujet.cedocNom}</div>
                            </td>

                            {/* Colonne Action (Bouton dynamique) */}
                            <td className="text-center">
                                <button 
                                    className={`btn btn-sm px-3 shadow-sm fw-bold ${isSelected ? 'btn-danger' : 'btn-outline-primary'}`}
                                    onClick={() => onToggleSelect(sujet)}
                                    disabled={isDisabled}
                                    title={isDisabled ? "Limite de 3 sujets atteinte" : ""}
                                >
                                    {isSelected ? (
                                        <><i className="bi bi-trash me-1"></i> Retirer</>
                                    ) : (
                                        <><i className="bi bi-plus-circle me-1"></i> Choisir</>
                                    )}
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  );
};