import React from 'react';
import '../../styles/ArabicKeyboard.css'; // Assurez-vous que le chemin est correct

const ArabicKeyboard = ({ onCharClick, onDelete, onClose }) => {
  // Disposition standard Clavier Arabe (AZERTY/QWERTY mapping)
  const rows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    // Ligne 2
    ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'],
    // Ligne 3 : Correction ici ('m' -> 'م')
    ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
    // Ligne 4
    ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ','ذ']
  ];

  // Empêche la perte de focus de l'input lors du clic
  const handleMouseDown = (e, callback) => {
    e.preventDefault(); 
    e.stopPropagation();
    callback();
  };

  return (
    <div className="keyboard-container" onMouseDown={(e) => e.stopPropagation()}>
      <div className="keyboard-arrow"></div>

      {rows.map((row, idx) => (
        <div key={idx} className="keyboard-row">
          {row.map((char, cIdx) => (
            <button 
              key={cIdx} 
              type="button" 
              className="keyboard-key"
              onMouseDown={(e) => handleMouseDown(e, () => onCharClick(char))}
            >
              {char}
            </button>
          ))}
        </div>
      ))}
      
      <div className="keyboard-row">
         <button type="button" className="keyboard-key key-action"
            onMouseDown={(e) => handleMouseDown(e, onDelete)}>⌫</button>
         
         <button type="button" className="keyboard-key key-space"
            onMouseDown={(e) => handleMouseDown(e, () => onCharClick(' '))}>Espace</button>
         
         <button type="button" className="keyboard-key key-close"
            onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default ArabicKeyboard;