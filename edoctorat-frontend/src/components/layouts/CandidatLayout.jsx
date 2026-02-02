import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CandidatHeader } from '../candidat/CandidatHeader';
import { Stepper } from '../candidat/Stepper';
import '../../styles/dashboard.css';

export const CandidatLayout = () => {
  const location = useLocation();

  // Liste des chemins où le Stepper doit être visible (Le processus d'inscription)
  const wizardPaths = [
    '/candidat',                   // Étape 1 : Infos Personnelles
    '/candidat/parcours',          // Étape 2 : Diplômes/Parcours
    '/candidat/postuler'           // Étape 3 : Choix du sujet
  ];

  // Vérifie si la page actuelle fait partie du processus
  const showStepper = wizardPaths.includes(location.pathname);

  return (
    <div className="layout-wrapper">
      {/* 1. Header Fixe en haut */}
      <CandidatHeader />

      {/* 2. Zone Principale Scrollable */}
      <div className="main-content">
        
        {/* Contenu Centré */}
        <div className="page-content-wrapper">
          
          {/* 3. Affiche le Stepper UNIQUEMENT si on est dans le processus */}
          {showStepper && <Stepper />}
          
          <div className="fade-in">
            <Outlet />
          </div>
        </div>
        
      </div>
    </div>
  );
};