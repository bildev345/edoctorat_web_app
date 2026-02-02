import React from 'react';

export const PersonalInfoSection = ({ candidat, isEditing, onChange }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...candidat, [name]: value });
  };

  // Fonction utilitaire pour générer les champs
  const renderField = (label, name, value, type = "text") => (
    <div className="col-md-6 mb-3">
      <label className="form-label text-muted small fw-bold">{label}</label>
      {isEditing ? (
        <input 
          type={type} 
          name={name} 
          className="form-control" 
          value={value || ''} 
          onChange={handleChange} 
        />
      ) : (
        <p className="border-bottom pb-1">{value || 'Non renseigné'}</p>
      )}
    </div>
  );

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3">
        <h5 className="mb-0 text-primary">Informations Personnelles</h5>
      </div>
      <div className="card-body">
        <div className="row">
          {/* Nom et Prénom en Français uniquement */}
          {renderField("Nom", "nom", candidat.nom)}
          {renderField("Prénom", "prenom", candidat.prenom)}
          
          {/* L'email a été retiré d'ici */}

          {renderField("CIN", "cin", candidat.cin)}
          {renderField("Téléphone", "telCandidat", candidat.telCandidat)}
          
          <div className="col-md-6 mb-3">
            <label className="form-label text-muted small fw-bold">Date de Naissance</label>
            {isEditing ? (
              <input 
                type="date" 
                name="dateDeNaissance" 
                className="form-control" 
                // Formatage nécessaire pour l'input type date
                value={candidat.dateDeNaissance ? new Date(candidat.dateDeNaissance).toISOString().split('T')[0] : ''} 
                onChange={handleChange} 
              />
            ) : (
              <p className="border-bottom pb-1">
                {candidat.dateDeNaissance ? new Date(candidat.dateDeNaissance).toLocaleDateString('fr-FR') : 'Non renseigné'}
              </p>
            )}
          </div>

          {renderField("Lieu de Naissance", "villeDeNaissance", candidat.villeDeNaissance)}
          {renderField("Ville actuelle", "ville", candidat.ville)}
          {renderField("Adresse", "adresse", candidat.adresse)}
        </div>
      </div>
    </div>
  );
};