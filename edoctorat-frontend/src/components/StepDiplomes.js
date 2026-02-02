import React, { useState } from 'react';
import { CandidatService } from '../services/CandidatMockService';

const StepDiplomes = ({ candidatId }) => {
  const [diplomesList, setDiplomesList] = useState([]);
  
  // État du formulaire courant
  const [currentDiplome, setCurrentDiplome] = useState({
    intitule: '',
    etablissement: '',
    anneeObtention: '',
    moyenne: '',
    annexe: null // Pour stocker le fichier
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDiplome(prev => ({ ...prev, [name]: value }));
  };

  // Gestion spécifique pour le fichier annexe
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCurrentDiplome(prev => ({ ...prev, annexe: e.target.files[0] }));
    }
  };

  const addDiplome = async (e) => {
    e.preventDefault();
    
    // Simulation : en vrai, on enverrait un FormData avec le fichier
    // Ici on garde juste le nom du fichier pour l'affichage
    const diplomeToSend = {
      ...currentDiplome,
      annexeName: currentDiplome.annexe ? currentDiplome.annexe.name : 'Aucun fichier'
    };

    await CandidatService.addDiplome(candidatId, diplomeToSend);
    
    // Mise à jour de la liste locale
    setDiplomesList([...diplomesList, diplomeToSend]);

    // Reset du formulaire
    setCurrentDiplome({
      intitule: '',
      etablissement: '',
      anneeObtention: '',
      moyenne: '',
      annexe: null
    });
    // Reset l'input file visuellement
    document.getElementById('fileInput').value = "";
  };

  return (
    <div>
      <h2>Ajouter un Diplôme</h2>
      <p style={{color: '#7f8c8d', marginBottom: '20px'}}>
        Veuillez renseigner vos diplômes et joindre les justificatifs (Scans).
      </p>

      <form onSubmit={addDiplome} style={{background: '#FAFAFA', padding: '20px', borderRadius: '8px', border: '1px solid #eee'}}>
        <div className="form-grid">
          
          <div className="form-group full-width">
            <label>Intitulé du Diplôme (ex: Master Génie Logiciel)</label>
            <input name="intitule" value={currentDiplome.intitule} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Établissement</label>
            <input name="etablissement" value={currentDiplome.etablissement} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Année d'obtention</label>
            <input type="number" name="anneeObtention" value={currentDiplome.anneeObtention} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Moyenne</label>
            <input type="number" step="0.01" name="moyenne" value={currentDiplome.moyenne} onChange={handleChange} required />
          </div>

          {/* CHAMP ANNEXE AJOUTÉ */}
          <div className="form-group full-width">
            <label>Annexe (Scan du diplôme - PDF/IMG)</label>
            <input 
              id="fileInput"
              type="file" 
              accept=".pdf,.jpg,.png" 
              onChange={handleFileChange} 
              required 
            />
          </div>

        </div>

        <div className="actions">
          <button type="submit" className="btn btn-secondary">
            + Ajouter ce diplôme
          </button>
        </div>
      </form>

      {/* Liste des diplômes ajoutés */}
      {diplomesList.length > 0 && (
        <>
          <h3>Diplômes enregistrés</h3>
          <table className="table-diplomes">
            <thead>
              <tr>
                <th>Diplôme</th>
                <th>Établissement</th>
                <th>Moyenne</th>
                <th>Annexe</th>
              </tr>
            </thead>
            <tbody>
              {diplomesList.map((d, index) => (
                <tr key={index}>
                  <td>{d.intitule}</td>
                  <td>{d.etablissement}</td>
                  <td>{d.moyenne}</td>
                  <td style={{color: '#2980B9'}}> {d.annexeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="actions" style={{marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px'}}>
             <button className="btn btn-primary" onClick={() => alert("Dossier finalisé avec succès !")}>
               Finaliser mon dossier
             </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StepDiplomes;