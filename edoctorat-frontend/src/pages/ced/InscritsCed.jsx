import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getInscritsCed } from '../../api/cedApi';
import api from "../../api/axios";

export const InscritsCed = () => {
    const [isExporting, setIsExporting] = useState(false);
    
    // 1. State de recherche
    const [searchTerm, setSearchTerm] = useState("");

    // 2. Récupérer les données
    const { data: inscrits = [], isLoading: loading, error } = useQuery({
        queryKey: ['inscrits-ced'],
        queryFn: getInscritsCed,
    });

    // 3. Logique de Filtrage
    const filteredData = inscrits.filter((inscrit) => {
        const term = searchTerm.toLowerCase();
        return (
            (inscrit.cne && inscrit.cne.toLowerCase().includes(term)) ||
            (inscrit.nomComplet && inscrit.nomComplet.toLowerCase().includes(term)) ||
            (inscrit.formationTitre && inscrit.formationTitre.toLowerCase().includes(term)) ||
            (inscrit.sujetTitre && inscrit.sujetTitre.toLowerCase().includes(term))
        );
    });

    // 4. Fonction d'Export
    const handleExport = async () => {
        try {
            setIsExporting(true);
            const response = await api.post("/ced/inscriptions/export", {}, { responseType: 'blob' });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `rapport_inscriptions_${new Date().toLocaleDateString()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Erreur export:", err);
            alert("Erreur lors de la génération du rapport Excel.");
        } finally {
            setIsExporting(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border" style={{ color: '#06163A' }}></div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#F4F6F8', minHeight: '100vh' }}>

            {/* ERROR STATE */}
            {error && (
                <div className="alert alert-warning d-flex align-items-center shadow-sm mx-auto mb-4" style={{ maxWidth: '1200px' }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>Attention :</strong>&nbsp;Erreur lors du chargement des dossiers.
                </div>
            )}

            {/* --- ZONE 1 : BOUTON EXPORT (BERRA LA CARD) --- */}
            <div className="d-flex justify-content-end mb-3 mx-auto" style={{ maxWidth: '1200px' }}>
                <button 
                    className="btn shadow-sm d-flex align-items-center gap-2"
                    onClick={handleExport}
                    disabled={isExporting || inscrits.length === 0}
                    style={{ 
                        backgroundColor: '#198754', 
                        color: 'white', 
                        borderRadius: '8px',
                        padding: '0.6rem 1.2rem',
                        fontSize: '0.9rem',
                        border: 'none'
                    }}
                >
                    {isExporting ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        <i className="bi bi-file-earmark-excel-fill"></i>
                    )}
                    {isExporting ? 'Génération...' : 'Exporter la liste'}
                </button>
            </div>

            {/* --- ZONE 2 : MAIN CARD --- */}
            <div className="card border-0 shadow-lg mx-auto" style={{ maxWidth: '1200px', borderRadius: '14px' }}>

                {/* CARD HEADER (TITRE + RECHERCHE) */}
                <div className="card-header text-white py-4 px-4 d-flex flex-wrap justify-content-between align-items-center gap-3"
                     style={{ backgroundColor: '#0b2154', borderRadius: '14px 14px 0 0' }}>
                    
                    {/* Titre */}
                    <h4 className="mb-0 fw-semibold">
                        <i className="bi bi-person-check-fill me-2"></i>
                        Liste des Inscrits
                    </h4>

                    {/* Barre de Recherche (Dakhla f header) */}
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
                                <tr className="text-center text-uppercase small">
                                    <th className="align-middle" style={{ width: '20%' }}>CNE</th>
                                    <th className="align-middle">Nom Complet</th>
                                    <th className="align-middle">Formation Doctorale</th>
                                    <th className="align-middle" style={{ width: '30%' }}>Sujet de Recherche</th>
                                    <th className="align-middle pe-4">Date de Dépôt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((inscrit, index) => (
                                        <tr key={`${inscrit.id}-${index}`} className="border-bottom" style={{ transition: 'background-color 0.2s' }}>
                                            
                                            {/* CNE */}
                                            <td className="ps-4 align-middle" style={{ fontSize: '0.9rem' }}>
                                                {inscrit.cne}
                                            </td>

                                            {/* Nom Complet */}
                                            <td className="text-center py-4 align-middle">
                                                <span className="fw-medium text-dark" style={{ fontSize: '0.9rem' }}>
                                                    {inscrit.nomComplet}
                                                </span>
                                            </td>

                                            {/* Formation */}
                                            <td className="text-center">
                                                <span className="badge rounded-pill px-3 py-2"
                                                      style={{
                                                          backgroundColor: '#F1F3F5',
                                                          color: '#06163A',
                                                          border: '1px solid #CED4DA'
                                                      }}>
                                                   {inscrit.formationTitre}
                                                </span>
                                            </td>

                                            {/* Sujet */}
                                            <td className="ps-5 py-4 align-middle">
                                                <div className="fw-normal" style={{ color: '#0b2154', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                                    {inscrit.sujetTitre}
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="ps-4 align-middle" style={{
                                                fontSize: '0.9rem',
                                                color: '#06163A',
                                                fontWeight: '500',
                                                textAlign: 'center',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {inscrit.dateDepot}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State */
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <div className="py-4">
                                                <div className="mb-3">
                                                    <i className="bi bi-folder-x" style={{ fontSize: '2.5rem', color: '#dee2e6' }}></i>
                                                </div>
                                                <h6 className="text-secondary fw-normal">Aucun résultat trouvé</h6>
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