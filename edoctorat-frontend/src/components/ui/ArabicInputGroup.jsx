import React from 'react';
import ArabicKeyboard from './ArabicKeyboard';
import '../../styles/ArabicKeyboard.css'; // Assurez-vous d'importer le CSS

const ArabicInputGroup = ({ label, name, value, onChange, activeField, setActiveField, onInput, onDelete, parentRef, error, ...props }) => {
  const isOpen = activeField === name;

  return (
    <div className="mb-3" ref={isOpen ? parentRef : null}>
        {/* LABEL */}
        <label className="form-label fw-bold text-secondary" style={{ fontSize: '0.9rem' }}>
            {label} {props.required && <span className="text-danger">*</span>}
        </label>
        
        {/* WRAPPER RELATIF */}
        <div className="position-relative">
            
            {/* --- ICÔNE DU CLAVIER (Positionnement Robuste) --- */}
            <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveField(isOpen ? null : name);
                }}
                title="Clavier Arabe Visuel"
                style={{ 
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '45px',           /* Largeur fixe pour l'icône */
                    display: 'flex',         /* Flexbox pour centrer */
                    alignItems: 'center',    /* Centre verticalement */
                    justifyContent: 'center',/* Centre horizontalement */
                    cursor: 'pointer', 
                    zIndex: 10,
                    opacity: 0.8,
                    color: error ? '#dc3545' : '#6c757d', // Rouge si erreur, gris sinon
                    transition: 'color 0.2s'
                }}
            >
                <span style={{ fontSize: '1.2rem' }}>⌨️</span>
            </div>

            {/* INPUT */}
            <input 
                type="text" 
                name={name} 
                value={value} 
                onChange={onChange} 
                dir="rtl"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                onFocus={() => setActiveField(name)}
                placeholder="... اكتب هنا"
                style={{ 
                    paddingLeft: '45px', /* Espace réservé pour l'icône */
                    textAlign: 'right' 
                }} 
                {...props}
            />

            {/* LE CLAVIER VIRTUEL */}
            {isOpen && (
                <div className="animate__animated animate__fadeIn animate__faster">
                    <ArabicKeyboard 
                        onCharClick={onInput} 
                        onDelete={onDelete}
                        onClose={() => setActiveField(null)} 
                    />
                </div>
            )}
        </div>

        {/* MESSAGE D'ERREUR */}
        {error && <div className="text-danger small mt-1 fw-bold">
            <i className="bi bi-exclamation-circle me-1"></i>{error}
        </div>}
    </div>
  );
};

export default ArabicInputGroup;