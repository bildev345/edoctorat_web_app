import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { generateRapportCed } from '../../api/cedApi';

const RapportCed = () => {
    const [rapportData, setRapportData] = useState(null);

    const generateRapportMutation = useMutation({
        mutationFn: generateRapportCed,
        onSuccess: (data) => {
            setRapportData(data);
        },
        onError: (error) => {
            console.error('Erreur lors de la génération du rapport:', error);
        },
    });

    const handleGenerateRapport = () => {
        generateRapportMutation.mutate();
    };

    return (
        <div className="ced-page">
            <h1>Rapport CED</h1>
            <div className="rapport-container">
                <div className="rapport-actions">
                    <button
                        className="btn btn-primary"
                        onClick={handleGenerateRapport}
                        disabled={generateRapportMutation.isLoading}
                    >
                        {generateRapportMutation.isLoading ? 'Génération...' : 'Générer Rapport'}
                    </button>
                </div>

                {generateRapportMutation.isError && (
                    <div className="alert alert-danger">
                        Erreur lors de la génération du rapport
                    </div>
                )}

                {rapportData && (
                    <div className="rapport-content">
                        <h3>Rapport Généré</h3>
                        <div className="rapport-details">
                            <p><strong>Statistiques générales:</strong></p>
                            <ul>
                                <li>Nombre de sujets: {rapportData.nombreSujets || 0}</li>
                                <li>Nombre de candidats: {rapportData.nombreCandidats || 0}</li>
                                <li>Nombre de commissions: {rapportData.nombreCommissions || 0}</li>
                                <li>Nombre d'examens: {rapportData.nombreExamens || 0}</li>
                            </ul>
                            <p><strong>Date de génération:</strong> {new Date().toLocaleDateString('fr-FR')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { RapportCed };
