import React from 'react';
import { InputGroup } from '../../ui/InputGroup'; // Assurez-vous que le chemin est correct

export const DiplomeSection = ({ title, data, onChange, onFileChange, errors, paysList }) => {
  
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white py-3">
        <h5 className="mb-0 text-primary fw-bold"><i className="bi bi-mortarboard-fill me-2"></i>{title}</h5>
      </div>
      <div className="card-body p-4">
        <div className="row g-3">
            {/* Ligne 1 : Intitulé et Spécialité */}
            <div className="col-md-6">
                <InputGroup 
                    label="Intitulé du Diplôme" 
                    name="intitule" 
                    value={data.intitule} 
                    onChange={(e) => onChange('intitule', e.target.value)} 
                    error={errors?.intitule}
                    placeholder="Ex: Bac Sciences Maths / Licence Info..."
                />
            </div>
            <div className="col-md-6">
                <InputGroup 
                    label="Spécialité / Filière" 
                    name="specialite" 
                    value={data.specialite} 
                    onChange={(e) => onChange('specialite', e.target.value)} 
                    error={errors?.specialite}
                />
            </div>

            {/* Ligne 2 : Établissement et Ville */}
            <div className="col-md-6">
                <InputGroup 
                    label="Établissement" 
                    name="etablissement" 
                    value={data.etablissement} 
                    onChange={(e) => onChange('etablissement', e.target.value)} 
                    error={errors?.etablissement}
                />
            </div>
            <div className="col-md-6">
                <InputGroup 
                    label="Ville d'obtention" 
                    name="ville" 
                    value={data.ville} 
                    onChange={(e) => onChange('ville', e.target.value)} 
                    error={errors?.ville}
                />
            </div>

            {/* Ligne 3 : Pays et Date */}
            <div className="col-md-6">
                {/* --- MODIFICATION ICI : SELECT PAYS --- */}
                <InputGroup 
                    label="Pays d'obtention" 
                    type="select"
                    name="pays" 
                    value={data.pays} 
                    onChange={(e) => onChange('pays', e.target.value)} 
                    error={errors?.pays}
                >
                    <option value="">-- Choisir un pays --</option>
                    {paysList && paysList.length > 0 ? (
                        paysList.map((p) => (
                            // IMPORTANT : On utilise p.nom comme value car DiplomeDto attend une String
                            <option key={p.id} value={p.nom}>
                                {p.nom}
                            </option>
                        ))
                    ) : (
                        // Fallback si la liste ne charge pas
                        <option value="Maroc">Maroc</option>
                    )}
                </InputGroup>
            </div>
            <div className="col-md-6">
                <InputGroup 
                    label="Date de la commission (ou obtention)" 
                    type="date"
                    name="dateCommission" 
                    value={data.dateCommission} 
                    onChange={(e) => onChange('dateCommission', e.target.value)} 
                    error={errors?.dateCommission}
                />
            </div>

            {/* Ligne 4 : Moyenne et Mention */}
            <div className="col-md-4">
                <InputGroup 
                    label="Moyenne Générale" 
                    type="number"
                    step="0.01"
                    name="moyenneGenerale" 
                    value={data.moyenneGenerale} 
                    onChange={(e) => onChange('moyenneGenerale', e.target.value)} 
                    error={errors?.moyenneGenerale}
                    placeholder="Ex: 14.50"
                />
            </div>
            <div className="col-md-4">
                <InputGroup 
                    label="Mention" 
                    type="select"
                    name="mention" 
                    value={data.mention} 
                    onChange={(e) => onChange('mention', e.target.value)} 
                    error={errors?.mention}
                >
                    <option value="">-- Choisir --</option>
                    <option value="PASSABLE">Passable</option>
                    <option value="ASSEZ_BIEN">Assez Bien</option>
                    <option value="BIEN">Bien</option>
                    <option value="TRES_BIEN">Très Bien</option>
                    <option value="EXCELLENT">Excellent</option>
                </InputGroup>
            </div>
            
            {/* Province (Optionnel, utile pour le Bac) */}
            <div className="col-md-4">
                 <InputGroup 
                    label="Province / Délégation" 
                    name="province" 
                    value={data.province} 
                    onChange={(e) => onChange('province', e.target.value)} 
                    error={errors?.province}
                    placeholder="Ex: Rabat, Sidi Kacem..."
                />
            </div>

            {/* Fichier Joint */}
            <div className="col-12 mt-3">
                <label className="form-label fw-bold small">Scan du Diplôme (PDF) <span className="text-danger">*</span></label>
                <div className="input-group">
                    <input 
                        type="file" 
                        accept=".pdf"
                        className={`form-control ${errors?.annexe ? 'is-invalid' : ''}`}
                        onChange={onFileChange}
                    />
                    {errors?.annexe && <div className="invalid-feedback">{errors.annexe}</div>}
                </div>
                {data.annexe && <small className="text-success"><i className="bi bi-check-circle"></i> {data.annexe.name}</small>}
            </div>
        </div>
      </div>
    </div>
  );
};