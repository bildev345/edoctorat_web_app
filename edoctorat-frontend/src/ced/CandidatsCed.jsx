import { useEffect, useState } from "react";
import { getCandidatsCed } from "../../api/cedApi";
import { Link } from "react-router-dom";

export const CandidatsCed = () => {
  const [candidats, setCandidats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Zedt State dyal Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCandidats = async () => {
      try {
        const data = await getCandidatsCed();
        setCandidats(data);
        setError(null);
      } catch (err) {
        console.error("Erreur fetching candidats:", err);
        setError("Impossible de récupérer la liste des candidats.");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidats();
  }, []);

  // 2. Logic dyal Filtrage (Kat9leb f ga3 les colonnes mouhima)
  const filteredData = candidats.filter((candidat) => {
    const term = searchTerm.toLowerCase();
    return (
      candidat.cne?.toLowerCase().includes(term) ||
      candidat.nomComplet?.toLowerCase().includes(term) ||
      candidat.sujetTitre?.toLowerCase().includes(term) ||
      candidat.directeurNom?.toLowerCase().includes(term) ||
      candidat.formationTitre?.toLowerCase().includes(term) ||
      candidat.laboratoireNom?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: '#06163A' }}></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#F4F6F8', minHeight: '100vh' }}>

      {/* ALERT */}
      {error && (
        <div className="alert alert-warning d-flex align-items-center shadow-sm mx-auto mb-4" style={{ maxWidth: '1100px' }}>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <strong>Attention :</strong>&nbsp;{error}
        </div>
      )}

      {/* CARD */}
      <div className="card border-0 shadow-lg mx-auto" style={{ maxWidth: '1200px', borderRadius: '14px' }}>

        {/* HEADER CARD avec RECHERCHE */}
        <div className="card-header text-white py-4 px-4 d-flex justify-content-between align-items-center flex-wrap gap-3"
             style={{ backgroundColor: '#0b2154', borderRadius: '14px 14px 0 0' }}>
          
          <h4 className="mb-0 fw-semibold">
            <i className="bi bi-people-fill me-2"></i>
            Liste des Postulants
          </h4>

          {/* --- BARRE DE RECHERCHE --- */}
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-white border-0 text-secondary ps-3">
                <i className="bi bi-search"></i>
            </span>
            <input
                type="text"
                className="form-control border-0 py-2"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ boxShadow: 'none' }}
            />
          </div>
        </div>

        {/* TABLE BODY */}
        <div className="card-body p-0 bg-white">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="custom-table-header">
                <tr className="text-center text-uppercase small text-muted">
                  <th className="ps-4 align-middle py-3">CNE</th>
                  <th className="align-middle py-3">Candidat</th>
                  <th className="align-middle py-3" style={{ width: '20%' }}>Sujet de Thèse</th>
                  <th className="align-middle py-3">Directeur</th>
                  <th className="align-middle py-3">Co-Directeur</th>
                  <th className="align-middle py-3">Formation Doctorale</th>
                  <th className="align-middle py-3">Laboratoire</th>
                </tr>
              </thead>
              
              <tbody>
                {/* 3. Utilisation de filteredData au lieu de candidats */}
                {filteredData.length > 0 ? (
                  filteredData.map((candidat, index) => (
                    <tr key={`${candidat.id}-${index}`} className="table-row-hover border-bottom" style={{ transition: 'background-color 0.2s' }}>
                      
                      {/* CNE */}
                      <td className="ps-4 align-middle">
                        <span className="font-monospace text-secondary bg-light px-2 py-1 rounded border small">
                            {candidat.cne}
                        </span>
                      </td>

                      {/* Candidat */}
                      <td className="text-center align-middle fw-medium text-dark">
                          {candidat.nomComplet}
                      </td>

                      {/* Sujet */}
                      <td className="align-middle text-dark small px-2">
                        <div style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                            {candidat.sujetTitre}
                        </div>
                      </td>

                      {/* Directeur */}
                      <td className="text-center align-middle small text-secondary">
                          {candidat.directeurNom ? candidat.directeurNom.split(' ').slice(0, 2).join(' ') : '-'}
                      </td>

                      {/* Co-Directeur */}
                      <td className="text-center align-middle small text-muted">
                        {candidat.coDirecteurNom && candidat.coDirecteurNom !== "-" ? (
                          candidat.coDirecteurNom.split(' ').slice(0, 2).join(' ')
                        ) : (
                          <span className="fst-italic opacity-50">Aucun</span>
                        )}
                      </td>

                      {/* Formation */}
                      <td className="text-center">
                         <span className="badge rounded-pill bg-light text-primary border fw-normal px-3 py-2">
                            {candidat.formationTitre}
                         </span>
                      </td>

                      {/* Laboratoire */}
                      <td className="text-center align-middle small text-muted">
                          {candidat.laboratoireNom}
                      </td>

                    </tr>
                  ))
                ) : (
                  /* Empty State */
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                        <i className="bi bi-search fs-1 d-block mb-2 opacity-50"></i>
                         {candidats.length === 0 
                            ? "Aucun candidat n'a encore postulé." 
                            : `Aucun résultat pour "${searchTerm}"`
                         }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};