import React, { useState } from 'react';
import { CandidatService } from '../../services/CandidatMockService';
import { InputGroup } from '../../components/ui/InputGroup'; // Votre composant input Bootstrap

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [msgData, setMsgData] = useState({
    objet: '',
    typeDemande: 'TECHNIQUE', 
    message: ''
  });

  const handleChange = (e) => {
    setMsgData({ ...msgData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await CandidatService.sendMessage(msgData);
    setLoading(false);
    alert("Votre message a bien été envoyé. Nous vous répondrons sous 48h.");
    setMsgData({ objet: '', typeDemande: 'TECHNIQUE', message: '' }); 
  };

  return (
    <div className="container-fluid p-0 fade-in">
      <h2 className="page-title mb-4">Contact & Support</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
            
            {/* CARTE FORMULAIRE */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4 p-md-5">
                    <div className="d-flex align-items-center mb-4 text-primary">
                        <i className="bi bi-headset fs-1 me-3"></i>
                        <div>
                            <h4 className="fw-bold mb-1">Besoin d'aide ?</h4>
                            <p className="text-muted mb-0 small">
                                Vous rencontrez un problème technique ou avez une question sur votre dossier ?
                                Remplissez ce formulaire pour contacter l'administration.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-12">
                                <InputGroup 
                                    label="Type de demande" 
                                    type="select" 
                                    name="typeDemande" 
                                    value={msgData.typeDemande} 
                                    onChange={handleChange}
                                >
                                    <option value="TECHNIQUE">Problème Technique (Site, Connexion)</option>
                                    <option value="ADMINISTRATIF">Question Administrative (Dossier, Pièces)</option>
                                    <option value="AUTRE">Autre demande</option>
                                </InputGroup>
                            </div>

                            <div className="col-md-12">
                                <InputGroup 
                                    label="Objet du message" 
                                    name="objet" 
                                    value={msgData.objet} 
                                    onChange={handleChange} 
                                    placeholder="Ex: Erreur lors du téléchargement du diplôme..."
                                    required 
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="form-label fw-bold text-secondary" style={{ fontSize: '0.9rem' }}>
                                    Votre Message <span className="text-danger">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={msgData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="form-control"
                                    placeholder="Décrivez votre problème en détail..."
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button 
                                type="submit" 
                                className="btn btn-primary px-4 py-2 shadow-sm" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <span><span className="spinner-border spinner-border-sm me-2"></span>Envoi en cours...</span>
                                ) : (
                                    <span><i className="bi bi-send-fill me-2"></i>Envoyer le message</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* BOX INFO UTILE */}
            <div className="alert alert-info border-0 shadow-sm d-flex align-items-center" role="alert">
                <i className="bi bi-info-circle-fill fs-4 me-3"></i>
                <div>
                    <strong>Information :</strong> L'administration est joignable du Lundi au Vendredi de 9h à 16h. 
                    En cas d'urgence absolue, veuillez contacter le standard de l'université.
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};