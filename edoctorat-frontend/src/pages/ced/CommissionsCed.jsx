import { useState, useEffect } from 'react';
import { getCommissionsCed } from '../../api/cedApi';

export const CommissionsCed = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Zedt State dyal Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const data = await getCommissionsCed();
        setCommissions(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les données pour le moment.');
      } finally {
        setLoading(false);
      }
    };
    fetchCommissions();
  }, []);

  // 2. Logic dyal Filtrage (Special hna hit 3ndna Arrays f Sujets w Membres)
  const filteredData = commissions.filter((comm) => {
    const term = searchTerm.toLowerCase();
    
    // Njem3o les arrays f string wa7ed bach sahal recherche
    const sujetsString = comm.sujets ? comm.sujets.join(' ').toLowerCase() : '';
    const membresString = comm.membres ? comm.membres.join(' ').toLowerCase() : '';

    return (
      comm.date?.toLowerCase().includes(term) ||
      comm.lieu?.toLowerCase().includes(term) ||
      comm.laboratoire?.toLowerCase().includes(term) ||
      sujetsString.includes(term) ||  // Recherche f les sujets
      membresString.includes(term)    // Recherche f les membres
    );
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh', backgroundColor: '#F4F6F8' }}>
        <div className="spinner-border" style={{ color: '#06163A' }} role="status"></div>
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
            Commissions de Soutenance
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
              <thead className="bg-light border-bottom">
                <tr className="text-center text-uppercase small text-muted">
                  <th className="ps-4 align-middle py-3" style={{ width: '15%' }}>Date & Heure</th>
                  <th className="align-middle py-3">Lieu</th>
                  <th className="align-middle py-3">Laboratoire</th>
                  <th className="align-middle py-3" style={{ width: '30%' }}>Sujets de thèse</th>
                  <th className="align-middle py-3">Membres du Jury</th>
                </tr>
              </thead>

              <tbody>
                {/* 3. Utilisation de filteredData au lieu de commissions */}
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                        <i className="bi bi-search fs-1 d-block mb-2 opacity-50"></i>
                        {commissions.length === 0 
                           ? "Aucune commission programmée." 
                           : `Aucun résultat pour "${searchTerm}"`
                        }
                    </td>
                  </tr>
                ) : (
                  filteredData.map((comm) => (
                    <tr key={comm.id} className="table-row-hover border-bottom" style={{ transition: 'background-color 0.2s' }}>
                      
                      {/* Date & Heure (Groupés pour gagner de l'espace) */}
                      <td className="ps-4 align-middle text-center">
                         <div className="fw-bold text-dark">{comm.date}</div>
                         <div className="small text-muted">{comm.heure}</div>
                      </td>

                      {/* Lieu */}
                      <td className="align-middle text-center small text-secondary">
                        <i className="bi bi-geo-alt me-1"></i>{comm.lieu}
                      </td>

                      {/* Laboratoire */}
                      <td className="align-middle text-center fw-medium text-dark" style={{ fontSize: '0.9rem' }}>
                        {comm.laboratoire}
                      </td>

                      {/* Sujets de thèse */}
                     <td className="align-middle px-3">
                          <ul className="list-unstyled mb-0">
                              {comm.sujets.map((s, i) => (
                                  <li key={i} className="d-flex align-items-start mb-2">
                                      {/* Petite icône puce */}
                                      <i className="bi bi-caret-right-fill mt-1 me-2" 
                                        style={{ color: '#198754', fontSize: '0.7rem' }}></i> 
                                      
                                      {/* Texte */}
                                      <span className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                                          {s}
                                      </span>
                                  </li>
                              ))}
                          </ul>
                      </td>

                      {/* Membres du Jury */}
                      <td className="align-middle">
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                          {comm.membres.map((m, i) => (
                            <span key={i} className="badge bg-light text-secondary border fw-normal" style={{ fontSize: '0.8rem' }}>
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};