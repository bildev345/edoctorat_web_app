import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SujetFilter } from '../../components/candidat/sections/SujetFilter';
import { SujetTable } from '../../components/candidat/sections/SujetTable';
import { CandidatApiService } from '../../api/candidatApi/CandidatApiService';

export const Postuler = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [availableSujets, setAvailableSujets] = useState([]); 
  const [mySujetTitres, setMySujetTitres] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // 1. Initialisation : Sécuriser l'ID et charger les données
  useEffect(() => {
  const initialize = async () => {
    try {
      // 1️⃣ Charger MES candidatures (choix existants)
      const data = await CandidatApiService.getMyCandidatures();

      const list = Array.isArray(data)
        ? data
        : data?.candidatures || [];

      // ⚠️ IMPORTANT : stocker les TITRES
      const titres = list.map((c) => c.titre);
      setMySujetTitres(titres);

      // 2️⃣ Charger TOUS les sujets
      await handleSearch(null, null, null);
    } catch (e) {
      showSnackbar("Erreur de chargement des candidatures", "error");
    } finally {
      setIsInitializing(false);
    }
  };

  initialize();
}, []);


  const loadMyCandidatures = async () => {
    try {
      const data = await CandidatApiService.getMyCandidatures();
      const titres = data.map(c => c.titre);
      setMySujetTitres(titres);
    } catch (error) {
      console.error("Erreur chargement candidatures:", error);
    }
  };

  const handleSearch = async (cedId, labId, formationId) => {
    setLoading(true);
    try {
      const data = await CandidatApiService.searchSujets(cedId, labId, formationId);
      setAvailableSujets(data);
    } catch (error) {
      setAvailableSujets([]);
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIQUE DE CHOIX (CHOISIR / RETIRER) ---
  const handleToggleSujet = async (sujet) => {
    const isAlreadySelected = mySujetTitres.includes(sujet.titre);
    const candidatId = localStorage.getItem('candidatId');

    if (!candidatId) {
      alert("Erreur : Votre profil n'est pas complètement chargé. Veuillez rafraîchir la page.");
      return;
    }

    if (isAlreadySelected) {
      // --- CAS : RETIRER ---
      if (!window.confirm("Voulez-vous retirer ce sujet de vos choix ?")) return;
      
      try {
        await CandidatApiService.removeCandidature(sujet.id);
        setMySujetTitres(prev => prev.filter(t => t !== sujet.titre));
      } catch (err) {
        alert("Erreur lors de la suppression : " + (err.message || "Vérifiez votre connexion."));
      }

    } else {
      // --- CAS : CHOISIR ---
      if (mySujetTitres.length >= 3) {
        alert("Vous avez atteint la limite de 3 sujets. Retirez-en un pour pouvoir en ajouter un autre.");
        return;
      }

      try {
        await CandidatApiService.postuler(sujet.id);
        setMySujetTitres(prev => [...prev, sujet.titre]);
      } catch (err) {
        // Affiche l'erreur précise du backend (ex: "déjà postulé")
        alert("Action impossible : " + (err.message || "Erreur lors de la sélection."));
      }
    }
  };

  if (isInitializing) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Vérification de votre session...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 fade-in pb-5">
      
      {/* En-tête avec Compteur */}
      <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm border">
        <div>
            <h2 className="page-title mb-0">Choix des Sujets</h2>
            <small className="text-muted">Sélectionnez vos sujets prioritaires (3 maximum)</small>
        </div>
        <div className="text-end">
            <span className={`badge fs-5 me-2 ${mySujetTitres.length === 3 ? 'bg-success' : 'bg-primary'}`}>
                Choix : {mySujetTitres.length} / 3
            </span>
            {mySujetTitres.length > 0 && (
                <button onClick={() => navigate('/candidat/mes-candidatures')} className="btn btn-outline-dark btn-sm shadow-sm">
                    Récapitulatif <i className="bi bi-arrow-right ms-1"></i>
                </button>
            )}
        </div>
      </div>
      
      <SujetFilter onSearch={handleSearch} loading={loading} />

      <div className="mt-4">
        <SujetTable 
            sujets={availableSujets} 
            selectedTitres={mySujetTitres} 
            onToggleSelect={handleToggleSujet} 
        />
      </div>
    </div>
  );
};