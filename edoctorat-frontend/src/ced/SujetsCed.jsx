import React, { useState, useEffect } from 'react';
import axiosClient from "../../api/axios";

const SujetsCed = () => {
    const [sujets, setSujets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchSujets = async () => {
            try {
                const response = await axiosClient.get('/ced/sujets');
                setSujets(response.data);
                setError(null);
            } catch (err) {
                console.error("Erreur backend:", err);
                setError("Impossible de contacter le serveur (Vérifiez si le Backend est lancé).");
            } finally {
                setLoading(false);
            }
        };

        fetchSujets();
    }, []);

    // Logic dyal filtrage
    const filteredData = sujets.filter((item) => {
        const term = searchTerm.toLowerCase();
        return (
            item.titre?.toLowerCase().includes(term) ||
            item.directeurNomComplet?.toLowerCase().includes(term) ||
            item.formationTitre?.toLowerCase().includes(term) ||
            item.description?.toLowerCase().includes(term)
        );
    });

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    }

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#F4F6F8', minHeight: '100vh' }}>

            {/* Alert Error */}
            {error && (
                <div className="alert alert-warning d-flex align-items-center shadow-sm mx-auto mb-4"
                     style={{ maxWidth: '1100px' }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>Attention :</strong>&nbsp;{error}
                </div>
            )}

            <div className="card border-0 shadow-lg mx-auto"
                 style={{ maxWidth: '1200px', borderRadius: '14px' }}>

                {/* Header avec Recherche */}
                <div className="card-header text-white py-4 px-4 d-flex justify-content-between align-items-center flex-wrap gap-3"
                     style={{ backgroundColor: '#0b2154', borderRadius: '14px 14px 0 0' }}>

                    <h4 className="mb-0 fw-semibold">
                        <i className="bi bi-journal-text me-2"></i>
                        Liste des Sujets de Thèse
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

                {/* Body */}
                <div className="card-body p-0 bg-white">
                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead className="custom-table-header">
                            <tr className="text-center text-uppercase small text-muted">
                                <th className="align-middle py-3 text-center" style={{ width: '20%' }}>Titre</th>
                                <th className="align-middle py-3 text-center" style={{ width: '30%' }}>Description</th>
                                <th className="align-middle py-3 text-center">Directeur</th>
                                <th className="align-middle py-3 text-center">Co-Directeur</th>
                                <th className="align-middle py-3 text-center">Formation Doctorale</th>
                            </tr>
                            </thead>

                            <tbody>
                            {/* ICI on utilise filteredData au lieu de sujets */}
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        <i className="bi bi-search fs-1 d-block mb-2 opacity-50"></i>
                                        {sujets.length === 0
                                            ? "Aucun sujet trouvé."
                                            : `Aucun résultat pour "${searchTerm}"`
                                        }
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((sujet) => (
                                    <tr key={sujet.id} className="table-row-hover border-bottom" style={{ transition: 'background-color 0.2s' }}>
                                        <td className="ps-4 py-4 fw-medium text-dark">
                                            {sujet.titre}
                                        </td>

                                        <td className="text-muted small px-3">
                                            <div style={{
                                                maxHeight: '60px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: '2',
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                                {sujet.description}
                                            </div>
                                        </td>

                                        <td className="text-center">
                                                <span className="fw-semibold text-secondary" style={{ fontSize: '0.9rem' }}>
                                                    {sujet.directeurNomComplet}
                                                </span>
                                        </td>

                                        <td className="text-center text-muted small">
                                            {sujet.coDirecteurNomComplet || <span className="fst-italic">Aucun</span>}
                                        </td>

                                        <td className="text-center">
                                                <span className="badge rounded-pill bg-light text-primary border fw-normal px-3 py-2">
                                                    {sujet.formationTitre}
                                                </span>
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

export { SujetsCed };