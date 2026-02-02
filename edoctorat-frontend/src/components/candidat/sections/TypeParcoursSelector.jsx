import React from 'react';

export const TypeParcoursSelector = ({ typeParcours, setTypeParcours }) => {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body text-center p-4">
        <h4 className="mb-4 text-secondary fw-bold">Sélectionnez votre type de parcours</h4>
        
        <div className="row justify-content-center g-4">
            {/* Option LMD */}
            <div className="col-md-5 col-lg-4">
                <div 
                    onClick={() => setTypeParcours('LMD')}
                    className={`card h-100 cursor-pointer transition-all ${typeParcours === 'LMD' ? 'border-primary bg-light shadow-sm' : 'border-light'}`}
                    style={{ cursor: 'pointer', borderWidth: typeParcours === 'LMD' ? '2px' : '1px' }}
                >
                    <div className="card-body py-4">
                        <div className="display-4 mb-3">🎓</div>
                        <h5 className="fw-bold text-dark">Système LMD</h5>
                        <p className="text-muted small mb-0">Bac + Licence + Master</p>
                    </div>
                </div>
            </div>

            {/* Option Ingénieur */}
            <div className="col-md-5 col-lg-4">
                <div 
                    onClick={() => setTypeParcours('ING')}
                    className={`card h-100 cursor-pointer transition-all ${typeParcours === 'ING' ? 'border-primary bg-light shadow-sm' : 'border-light'}`}
                    style={{ cursor: 'pointer', borderWidth: typeParcours === 'ING' ? '2px' : '1px' }}
                >
                    <div className="card-body py-4">
                        <div className="display-4 mb-3">⚙️</div>
                        <h5 className="fw-bold text-dark">Cycle Ingénieur</h5>
                        <p className="text-muted small mb-0">Bac + Cycle Ingénieur</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};