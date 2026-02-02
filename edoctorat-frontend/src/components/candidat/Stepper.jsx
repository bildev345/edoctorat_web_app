import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CANDIDAT_PARCOURS, CANDIDAT_POSTULER, CANDIDAT_ROUTE } from '../../routes/constants';

export const Stepper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Définition des étapes
  const steps = [
    { path: CANDIDAT_ROUTE, label: 'Informations Personnelles', id: 1 },
    { path: CANDIDAT_ROUTE+CANDIDAT_PARCOURS, label: 'Cursus Académique', id: 2 },
    { path: CANDIDAT_ROUTE+CANDIDAT_POSTULER, label: 'Choix du Sujet', id: 3 }
  ];

  // Trouver l'index de l'étape active
  const activeStepIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <div className="stepper-wrapper">
      {steps.map((step, index) => {
        const isActive = index === activeStepIndex;
        const isCompleted = index < activeStepIndex;

        return (
          <div 
            key={step.id} 
            className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            onClick={() => isCompleted ? navigate(step.path) : null}
            style={{ cursor: isCompleted ? 'pointer' : 'default' }}
          >
            <div className="step-circle">
              {isCompleted ? '✓' : step.id}
            </div>
            <div className="step-label">{step.label}</div>
          </div>
        );
      })}
    </div>
  );
};