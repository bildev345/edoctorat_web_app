import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiplomeSection } from '../../components/candidat/sections/DiplomeSection';
import { TypeParcoursSelector } from '../../components/candidat/sections/TypeParcoursSelector';
import { CandidatApiService } from '../../api/candidatApi/CandidatApiService'; 

export const Parcours = () => {
  const navigate = useNavigate();
  
  const [typeParcours, setTypeParcours] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // --- NOUVEAU : État pour la liste des pays ---
  const [paysList, setPaysList] = useState([]);

  const emptyDiplome = { 
    intitule: '', specialite: '', etablissement: '', 
    ville: '', province: '', pays: 'Maroc', // Valeur par défaut
    dateCommission: '', moyenneGenerale: '', mention: '',
    annexe: null 
  };

  const [formsData, setFormsData] = useState({
    Bac: { ...emptyDiplome, intitule: 'Baccalauréat' },
    Licence: { ...emptyDiplome, intitule: 'Licence' },
    Master: { ...emptyDiplome, intitule: 'Master' },
    Cycle: { ...emptyDiplome, intitule: 'Cycle Ingénieur' },
  });

  // --- CHARGEMENT DES PAYS AU DÉMARRAGE ---
  useEffect(() => {
    CandidatApiService.getPays()
      .then(data => setPaysList(data))
      .catch(err => console.error("Erreur chargement pays:", err));
  }, []);

  const updateForm = (diplomeKey, field, value) => {
    setFormsData(prev => ({
      ...prev, [diplomeKey]: { ...prev[diplomeKey], [field]: value }
    }));
    if (errors[diplomeKey] && errors[diplomeKey][field]) {
        setErrors(prev => ({ ...prev, [diplomeKey]: { ...prev[diplomeKey], [field]: null } }));
    }
  };

  const updateFile = (diplomeKey, file) => {
    setFormsData(prev => ({
      ...prev, [diplomeKey]: { ...prev[diplomeKey], annexe: file }
    }));
    if (errors[diplomeKey] && errors[diplomeKey].annexe) {
        setErrors(prev => ({ ...prev, [diplomeKey]: { ...prev[diplomeKey], annexe: null } }));
    }
  };

  const validateDiplome = (data) => {
    const diplomeErrors = {};
    if (!data.intitule) diplomeErrors.intitule = "Requis";
    if (!data.specialite) diplomeErrors.specialite = "Requis";
    if (!data.etablissement) diplomeErrors.etablissement = "Requis";
    if (!data.ville) diplomeErrors.ville = "Requis";
    if (!data.pays) diplomeErrors.pays = "Requis";
    if (!data.dateCommission) diplomeErrors.dateCommission = "Requis";
    
    // Validation moyenne
    if (!data.moyenneGenerale) {
        diplomeErrors.moyenneGenerale = "Requis";
    } else {
        const note = parseFloat(data.moyenneGenerale);
        if(isNaN(note) || note < 10 || note > 20) diplomeErrors.moyenneGenerale = "Entre 10 et 20";
    }

    if (!data.mention) diplomeErrors.mention = "Requis";
    return diplomeErrors;
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validation Bac
    const bacErrors = validateDiplome(formsData.Bac);
    if (Object.keys(bacErrors).length > 0) { newErrors.Bac = bacErrors; isValid = false; }

    // Validation selon type
    if (typeParcours === 'LMD') {
        const licErrors = validateDiplome(formsData.Licence);
        if (Object.keys(licErrors).length > 0) { newErrors.Licence = licErrors; isValid = false; }
        const masErrors = validateDiplome(formsData.Master);
        if (Object.keys(masErrors).length > 0) { newErrors.Master = masErrors; isValid = false; }
    } else if (typeParcours === 'ING') {
        const cycleErrors = validateDiplome(formsData.Cycle);
        if (Object.keys(cycleErrors).length > 0) { newErrors.Cycle = cycleErrors; isValid = false; }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleGlobalSubmit = async () => {
    if (!validateAll()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    setLoading(true);
    const diplomesToSend = [];

    // Ajouter Bac
    diplomesToSend.push({ ...formsData.Bac, type: 'BAC' });

    // Ajouter LMD ou ING
    if (typeParcours === 'LMD') {
        diplomesToSend.push({ ...formsData.Licence, type: 'LICENCE' });
        diplomesToSend.push({ ...formsData.Master, type: 'MASTER' });
    } else if (typeParcours === 'ING') {
        diplomesToSend.push({ ...formsData.Cycle, type: 'INGENIEUR' });
    }

    try {
        for (const diplome of diplomesToSend) {
            
            const annexesList = [];
            if (diplome.annexe) {
                annexesList.push({
                    typeAnnexe: "SCAN_DIPLOME",
                    titre: "Diplome " + diplome.intitule,
                    pathFile: diplome.annexe.name
                });
            }

            const payload = {
                intitule: diplome.intitule,
                type: diplome.type,
                mention: diplome.mention,
                
                // IMPORTANT: DiplomeDto attend une String pour le pays.
                // On envoie le nom du pays sélectionné (pas l'ID) car votre DiplomeModel n'a pas de relation @ManyToOne pays
                pays: diplome.pays, 
                
                etablissement: diplome.etablissement,
                specialite: diplome.specialite,
                ville: diplome.ville,
                province: diplome.province || 'Autre',
                moyenneGenerale: parseFloat(diplome.moyenneGenerale),
                dateCommission: diplome.dateCommission ? `${diplome.dateCommission}T00:00:00` : null,
                annexes: annexesList 
            };
            
            await CandidatApiService.addDiplome(payload);
        }
        
        alert("Enregistré avec succès !");
        navigate('/candidat/postuler'); 

    } catch (error) {
        console.error("Erreur serveur:", error);
        alert("Erreur lors de l'enregistrement.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 fade-in">
       <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="page-title mb-0">Cursus Académique</h2>
            <span className="badge bg-light text-dark border">Étape 2/3</span>
        </div>

      <TypeParcoursSelector typeParcours={typeParcours} setTypeParcours={setTypeParcours} />

      {typeParcours && (
        <div className="animate__animated animate__fadeInUp">
            {/* PASSAGE DE LA PROP paysList A CHAQUE SECTION 
            */}
            
            <DiplomeSection 
                title="Baccalauréat" 
                data={formsData.Bac} 
                onChange={(field, val) => updateForm('Bac', field, val)}
                onFileChange={(e) => updateFile('Bac', e.target.files[0])}
                errors={errors.Bac} 
                paysList={paysList} // <--- ICI
            />

            {typeParcours === 'LMD' ? (
                <>
                    <DiplomeSection 
                        title="Licence" 
                        data={formsData.Licence} 
                        onChange={(field, val) => updateForm('Licence', field, val)}
                        onFileChange={(e) => updateFile('Licence', e.target.files[0])}
                        errors={errors.Licence}
                        paysList={paysList} // <--- ICI
                    />
                    <DiplomeSection 
                        title="Master" 
                        data={formsData.Master} 
                        onChange={(field, val) => updateForm('Master', field, val)}
                        onFileChange={(e) => updateFile('Master', e.target.files[0])}
                        errors={errors.Master}
                        paysList={paysList} // <--- ICI
                    />
                </>
            ) : (
                <DiplomeSection 
                    title="Cycle Ingénieur" 
                    data={formsData.Cycle} 
                    onChange={(field, val) => updateForm('Cycle', field, val)}
                    onFileChange={(e) => updateFile('Cycle', e.target.files[0])}
                    errors={errors.Cycle}
                    paysList={paysList} // <--- ICI
                />
            )}

            <div className="d-flex justify-content-end mt-4 pb-5">
                <button onClick={handleGlobalSubmit} className="btn btn-primary btn-lg px-5 shadow-sm" disabled={loading}>
                    {loading ? "Enregistrement..." : "Valider et Continuer"}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};