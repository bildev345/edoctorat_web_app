import React, { useState } from 'react';
import { CandidatService } from '../services/CandidatMockService';

const StepInfoPerso = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  // Modèle initial correspondant à ton CandidatModel.java
  const [formData, setFormData] = useState({
    cin: '',
    cne: '',
    nomCadidat: '',
    prenomCandidat: '',
    nomCandidatArabe: '',
    prenomCandidatArabe: '',
    email: '',
    ville: '',
    dateDeNaissance: '',
    fonctionaire: "false" // string pour le select, converti ensuite
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Conversion du booléen pour le backend
    const payload = {
      ...formData,
      fonctionaire: formData.fonctionaire === "true"
    };

    try {
      // Appel au Mock Service
      const savedCandidat = await CandidatService.saveInfoPerso(payload);
      setLoading(false);
      onSuccess(savedCandidat.id); // On passe l'ID au parent
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Identité du Candidat</h2>
      <div className="form-grid">
        
        <div className="form-group">
          <label>CIN</label>
          <input name="cin" value={formData.cin} onChange={handleChange} required placeholder="Ex: A12345" />
        </div>

        <div className="form-group">
          <label>CNE / Massar</label>
          <input name="cne" value={formData.cne} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Nom (Français)</label>
          <input name="nomCadidat" value={formData.nomCadidat} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Prénom (Français)</label>
          <input name="prenomCandidat" value={formData.prenomCandidat} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Nom (Arabe)</label>
          <input name="nomCandidatArabe" value={formData.nomCandidatArabe} onChange={handleChange} dir="rtl" />
        </div>

        <div className="form-group">
          <label>Prénom (Arabe)</label>
          <input name="prenomCandidatArabe" value={formData.prenomCandidatArabe} onChange={handleChange} dir="rtl" />
        </div>

        <div className="form-group">
          <label>Date de Naissance</label>
          <input type="date" name="dateDeNaissance" value={formData.dateDeNaissance} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Ville</label>
          <input name="ville" value={formData.ville} onChange={handleChange} />
        </div>

        <div className="form-group">
            <label>Êtes-vous fonctionnaire ?</label>
            <select name="fonctionaire" value={formData.fonctionaire} onChange={handleChange}>
                <option value="false">Non</option>
                <option value="true">Oui</option>
            </select>
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Chargement...' : 'Suivant & Enregistrer'}
        </button>
      </div>
    </form>
  );
};

export default StepInfoPerso;