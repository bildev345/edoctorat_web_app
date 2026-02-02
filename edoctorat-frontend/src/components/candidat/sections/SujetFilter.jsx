import React, { useEffect, useState } from 'react';
import { CandidatApiService } from '../../../api/candidatApi/CandidatApiService';

export const SujetFilter = ({ onSearch, loading }) => {
  // Listes
  const [ceds, setCeds] = useState([]);
  const [formations, setFormations] = useState([]);
  const [laboratoires, setLaboratoires] = useState([]);

  // Sélections
  const [selectedCed, setSelectedCed] = useState('');
  const [selectedFormation, setSelectedFormation] = useState('');
  const [selectedLab, setSelectedLab] = useState('');

  // 1. Démarrage : Charger les CEDs uniquement
  useEffect(() => {
    CandidatApiService.getCeds().then(data => setCeds(data));
  }, []);

  // 2. Changement CED -> Charge Formations & Labos
  const handleCedChange = (e) => {
    const val = e.target.value;
    setSelectedCed(val);
    
    // Reset enfants
    setSelectedFormation('');
    setSelectedLab('');
    setFormations([]);
    setLaboratoires([]);

    if (val) {
        // On charge les données liées à ce CED
        CandidatApiService.getFormations(val).then(data => setFormations(data));
        CandidatApiService.getLaboratoires(val).then(data => setLaboratoires(data));
    }
  };

  // 3. Changement Formation -> Débloque juste le Labo (visuellement)
  const handleFormationChange = (e) => {
    const val = e.target.value;
    setSelectedFormation(val);
    setSelectedLab(''); // Reset du labo quand on change de formation
  };

  // 4. Recherche
  const handleSearchClick = () => {
    onSearch(selectedCed, selectedLab, selectedFormation);
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body bg-light rounded p-4">
        <h5 className="card-title text-primary mb-3">
          <i className="bi bi-funnel-fill me-2"></i>Filtrer les sujets
        </h5>
        
        <div className="row g-3 align-items-end">
          
          {/* ÉTAPE 1 : CEDOC */}
          <div className="col-md-4">
            <label className="form-label small fw-bold text-muted">1. CEDOC</label>
            <select className="form-select" value={selectedCed} onChange={handleCedChange}>
              <option value="">-- Sélectionner un CEDOC --</option>
              {ceds.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>

          {/* ÉTAPE 2 : FORMATION (Activé si CED choisi) */}
          <div className="col-md-3">
            <label className="form-label small fw-bold text-muted">2. Formation Doctorale</label>
            <select 
                className="form-select" 
                value={selectedFormation} 
                onChange={handleFormationChange}
                disabled={!selectedCed}
            >
              <option value="">-- Choisir Formation --</option>
              {formations.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
          </div>

          {/* ÉTAPE 3 : LABORATOIRE (Activé si Formation choisie) */}
          <div className="col-md-3">
            <label className="form-label small fw-bold text-muted">3. Laboratoire</label>
            <select 
                className="form-select" 
                value={selectedLab} 
                onChange={(e) => setSelectedLab(e.target.value)}
                disabled={!selectedFormation} 
            >
              <option value="">-- Choisir Laboratoire --</option>
              {laboratoires.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
          </div>

          {/* BOUTON */}
          <div className="col-md-2">
            <button 
              className="btn btn-primary w-100"
              onClick={handleSearchClick}
              disabled={loading || !selectedCed}
            >
              {loading ? <span className="spinner-border spinner-border-sm"></span> : <span><i className="bi bi-search me-2"></i>Chercher</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};