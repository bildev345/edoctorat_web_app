import React from 'react';
import { InputGroup } from '../../ui/InputGroup'; // Votre input standard

export const PhotoSection = ({ photoPreview, handleFileChange, formData, handleChange }) => {
  return (
    <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
      <div style={{ width: '140px', textAlign: 'center' }}>
          <div style={{ 
              width: '120px', height: '120px', borderRadius: '50%', 
              border: '2px dashed #C6C6C6', overflow: 'hidden', margin: '0 auto 10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F9F9'
          }}>
              {photoPreview ? (
                  <img src={photoPreview} alt="Aperçu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : <span style={{ fontSize: '2rem', color: '#CCC' }}>📷</span>}
          </div>
          <label className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '5px 10px', display: 'inline-block' }}>
              Modifier
              <input type="file" name="pathPhoto" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
      </div>

      <div className="form-grid" style={{ flex: 1 }}>
           <InputGroup label="CIN" name="cin" value={formData.cin} onChange={handleChange} required />
           <InputGroup label="CNE / Massar" name="cne" value={formData.cne} onChange={handleChange} required />
           <InputGroup label="Sexe" type="select" name="sexe" value={formData.sexe} onChange={handleChange}>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
           </InputGroup>
           <InputGroup label="Pays" type="select" name="pays" value={formData.pays} onChange={handleChange}>
              <option value="1">Maroc</option>
              <option value="2">Autre</option>
           </InputGroup>
      </div>
    </div>
  );
};