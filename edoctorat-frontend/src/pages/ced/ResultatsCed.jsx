import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getResultatsCed } from '../../api/cedApi';

const ResultatsCed = () => {
    // 1. Zedt State dyal Search
    const [searchTerm, setSearchTerm] = useState("");

    // Récupération des données avec React Query
    const { data: resultats = [], isLoading: loading, error } = useQuery({
        queryKey: ['resultats-ced'],
        queryFn: getResultatsCed,
        staleTime: 5 * 60 * 1000,
    });

    // 2. Logic dyal Filtrage (Sujet, CNE, Nom, Décision)
    const filteredData = resultats.filter((res) => {
        const term = searchTerm.toLowerCase();
        return (
            res.sujetTitre?.toLowerCase().includes(term) ||
            res.cne?.toLowerCase().includes(term) ||
            res.candidatNomComplet?.toLowerCase().includes(term) ||
            res.decision?.toLowerCase().includes(term)
        );
    });

    // Loading State
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border" style={{ color: '#06163A' }}></div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#F4F6F8', minHeight: '100vh' }}>

            {/* Error State */}
            {error && (
                <div className="alert alert-warning d-flex align-items-center shadow-sm mx-auto mb-4" style={{ maxWidth: '1100px' }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>Attention :</strong>&nbsp;Impossible de charger les résultats.
                </div>
            )}

            {/* Main Card */}
            <div className="card border-0 shadow-lg mx-auto" style={{ maxWidth: '1200px', borderRadius: '14px' }}>

                {/* Header avec Recherche */}
                <div className="card-header text-white py-4 px-4 d-flex justify-content-between align-items-center flex-wrap gap-3"
                     style={{ backgroundColor: '#0b2154', borderRadius: '14px 14px 0 0' }}>
                    
                    <h4 className="mb-0 fw-semibold">
                        <i className="bi bi-clipboard-check-fill me-2"></i>
                        Résultats des Candidats
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

                {/* Table Body */}
                <div className="card-body p-0 bg-white">
                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead className="bg-light border-bottom">
                                <tr className="text-center text-uppercase small text-muted">
                                    <th className="ps-4 align-middle py-3" style={{ width: '35%' }}>SUJET DE THÈSE</th>
                                    <th className="align-middle py-3">CNE</th>
                                    <th className="align-middle py-3">CANDIDAT</th>
                                    <th className="align-middle py-3">NOTE DOSSIER</th>
                                    <th className="align-middle py-3">NOTE ENTRETIEN</th>
                                    <th className="align-middle py-3">MOYENNE</th>
                                    <th className="align-middle py-3 pe-4">DÉCISION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 3. Utilisation de filteredData au lieu de resultats */}
                                {filteredData.length > 0 ? (
                                    filteredData.map((res, index) => (
                                        <tr key={`${res.id}-${index}`} 
                                            className="bg-white border-bottom table-row-hover" 
                                            style={{ transition: 'background-color 0.2s ease' }}>
                                            
                                            {/* Sujet */}
                                            <td className="ps-4 py-4 align-middle">
                                                <div className="fw-medium" style={{ color: '#0b2154', fontSize: '0.9rem', lineHeight: '1.5', maxWidth: '280px' }}>
                                                    {res.sujetTitre}
                                                </div>
                                            </td>
                                            
                                            {/* CNE */}
                                            <td className="text-center py-4 align-middle text-secondary" style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>
                                                {res.cne}
                                            </td>

                                            {/* Candidat */}
                                            <td className="text-center py-4 align-middle">
                                                <span className="fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>
                                                    {res.candidatNomComplet}
                                                </span>
                                            </td>

                                            {/* Note Dossier */}
                                            <td className="text-center py-4 align-middle">
                                                <span className="badge bg-light text-secondary border fw-normal" style={{ fontSize: '0.85rem' }}>
                                                    {res.noteDossier !== null ? res.noteDossier : '-'}
                                                </span>
                                            </td>

                                            {/* Note Entretien */}
                                            <td className="text-center py-4 align-middle">
                                                <span className="badge bg-light text-secondary border fw-normal" style={{ fontSize: '0.85rem' }}>
                                                    {res.noteEntretien !== null ? res.noteEntretien : '-'}
                                                </span>
                                            </td>

                                            {/* Moyenne */}
                                            <td className="text-center py-4 align-middle">
                                                <span className="fw-bold fs-6" style={{ color: '#0b2154' }}>
                                                    {res.moyenneGenerale !== null ? parseFloat(res.moyenneGenerale).toFixed(2) : '--'}
                                                </span>
                                            </td>

                                            {/* Décision */}
                                            <td className="text-center py-4 align-middle pe-4">
                                                <span 
                                                    className={`badge rounded-pill px-3 py-2 fw-medium ${
                                                    res.decision === 'ADMIS' 
                                                        ? 'bg-success-subtle text-success border border-success-subtle' 
                                                    : res.decision === 'LISTE_ATTENTE' 
                                                        ? 'bg-warning-subtle text-warning border border-warning-subtle' 
                                                    : (res.decision === 'REFUSE' || res.decision === 'NON_ADMIS')
                                                        ? 'bg-danger-subtle text-danger border border-danger-subtle'
                                                    : 'bg-light text-muted border'
                                                    }`}
                                                    style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
                                                >
                                                    {res.decision ? res.decision.replace(/_/g, ' ') : 'EN ATTENTE'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State (Gestion double : Soit pas de données, soit pas de résultat recherche) */
                                    <tr>
                                        <td colSpan="7" className="text-center py-5">
                                            <div className="py-4">
                                                {resultats.length === 0 ? (
                                                    // Cas 1: Aucune donnée chargée depuis l'API
                                                    <>
                                                        <div className="mb-3">
                                                            <i className="bi bi-folder2-open" style={{ fontSize: '2.5rem', color: '#dee2e6' }}></i>
                                                        </div>
                                                        <h6 className="text-secondary fw-normal">Aucun résultat disponible</h6>
                                                        <p className="text-muted small mb-0">Les résultats n'ont pas encore été publiés pour ce CED.</p>
                                                    </>
                                                ) : (
                                                    // Cas 2: Recherche sans résultat
                                                    <>
                                                        <div className="mb-3">
                                                            <i className="bi bi-search" style={{ fontSize: '2.5rem', color: '#dee2e6' }}></i>
                                                        </div>
                                                        <h6 className="text-secondary fw-normal">Aucun résultat trouvé</h6>
                                                        <p className="text-muted small mb-0">Essayez un autre mot clé.</p>
                                                    </>
                                                )}
                                            </div>
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

export { ResultatsCed };