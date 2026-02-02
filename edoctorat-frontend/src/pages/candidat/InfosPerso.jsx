import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputGroup } from '../../components/ui/InputGroup';
import ArabicInputGroup from '../../components/ui/ArabicInputGroup'; 
import { CandidatApiService } from '../../api/candidatApi/CandidatApiService'; 

export const InfosPerso = () => {
  const navigate = useNavigate();
  const keyboardRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [hasHandicap, setHasHandicap] = useState(false);
  const [activeKeyboardField, setActiveKeyboardField] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  
  // --- NOUVEAU STATE : Liste des pays ---
  const [paysList, setPaysList] = useState([]);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    cin: '', cne: '', nomCadidat: '', prenomCandidat: '',
    villeDeNaissance: '', adresse: '',
    nomCandidatArabe: '', prenomCandidatArabe: '',
    villeDeNaissanceArabe: '', adresseArabe: '',
    sexe: 'M', dateDeNaissance: '', situationFamiliale: 'CELIBATAIRE',
    academie: '', telCandidat: '', email: '', ville: '', 
    pays: '', // Stockera l'ID du pays
    typeDeHandicape: '', fonctionaire: "false",
    pathCv: null, pathPhoto: null
  });

  // --- CHARGEMENT DES DONNÉES ---
  useEffect(() => {
    // 1. Charger la liste des pays depuis la BD
    CandidatApiService.getPays()
      .then(data => {
        setPaysList(data);
      })
      .catch(err => console.error("Impossible de charger les pays", err));

    // 2. Charger les infos du candidat (si mode édition/reprise)
    const idCandidat = localStorage.getItem('candidatId');
    if (idCandidat) {
        CandidatApiService.getInfoPerso()
          .then(data => {
            if (data) {
              setFormData({ 
                  ...data, 
                  // Mapping Inverse (Java -> React)
                  nomCadidat: data.nom,
                  prenomCandidat: data.prenom,
                  nomCandidatArabe: data.nomArabe || '',
                  prenomCandidatArabe: data.prenomArabe || '',
                  fonctionaire: data.fonctionaire ? "true" : "false",
                  
                  // Si 'pays' est un objet complet, on prend son ID, sinon la valeur directe
                  pays: data.pays ? (typeof data.pays === 'object' ? data.pays.id : data.pays) : ''
              });
              if (data.typeDeHandicape) setHasHandicap(true);
            }
          })
          .catch(err => console.log("Pas d'infos précédentes trouvées."));
    }
  }, []);

  // Gestion clavier arabe (click outside)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (keyboardRef.current && !keyboardRef.current.contains(event.target)) {
        setActiveKeyboardField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [keyboardRef]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      setFormData({ ...formData, [name]: file });
      if (name === 'pathPhoto') setPhotoPreview(URL.createObjectURL(file));
      if (errors[name]) setErrors({ ...errors, [name]: null });
    }
  };

  const handleArabicInput = (char) => {
    if (activeKeyboardField) {
      setFormData(prev => ({ ...prev, [activeKeyboardField]: (prev[activeKeyboardField] || '') + char }));
      if (errors[activeKeyboardField]) setErrors(prev => ({ ...prev, [activeKeyboardField]: null }));
    }
  };
  
  const handleArabicDelete = () => {
    if (activeKeyboardField) {
      setFormData(prev => ({ ...prev, [activeKeyboardField]: (prev[activeKeyboardField] || '').slice(0, -1) }));
    }
  };

  const arabicProps = {
    activeField: activeKeyboardField,
    setActiveField: setActiveKeyboardField,
    onInput: handleArabicInput,
    onDelete: handleArabicDelete,
    parentRef: keyboardRef
  };

  // --- VALIDATION ---
  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const requiredFields = [
        'cin', 'cne', 'nomCadidat', 'prenomCandidat', 'dateDeNaissance', 
        'villeDeNaissance', 'adresse', 'ville', 'academie', 'pays'
    ];

    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].toString().trim() === '') {
            newErrors[field] = "Ce champ est obligatoire.";
        }
    });

    if(!formData.nomCandidatArabe) newErrors.nomCandidatArabe = "Requis en arabe";
    if(!formData.prenomCandidatArabe) newErrors.prenomCandidatArabe = "Requis en arabe";
    if(!formData.villeDeNaissanceArabe) newErrors.villeDeNaissanceArabe = "Requis en arabe";
    if(!formData.adresseArabe) newErrors.adresseArabe = "Requis en arabe";

    if (!formData.email) newErrors.email = "Email requis.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Email invalide.";

    if (!formData.telCandidat) newErrors.telCandidat = "Téléphone requis.";

    if (hasHandicap && !formData.typeDeHandicape) newErrors.typeDeHandicape = "Précisez le handicap.";

    if (!formData.pathCv && !localStorage.getItem('candidatId')) newErrors.pathCv = "Le CV est obligatoire.";
    if (!formData.pathPhoto && !photoPreview && !localStorage.getItem('candidatId')) newErrors.pathPhoto = "Photo requise";

    setErrors(newErrors);
    return newErrors; 
  };

  // --- SOUMISSION ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
        const firstErrorField = Object.keys(formErrors)[0];
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();
        } else {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
    }

    setLoading(true);

    // 2. Préparation du Payload (Mapping React -> Java DTO)
    const payload = {
      cne: formData.cne,
      cin: formData.cin,
      adresse: formData.adresse,
      villeDeNaissance: formData.villeDeNaissance,
      adresseArabe: formData.adresseArabe,
      villeDeNaissanceArabe: formData.villeDeNaissanceArabe,
      sexe: formData.sexe,
      ville: formData.ville,
      dateDeNaissance: formData.dateDeNaissance,
      academie: formData.academie,
      telCandidat: formData.telCandidat,
      situationFamiliale: formData.situationFamiliale,

      // Mapping noms React -> Java
      nom: formData.nomCadidat,
      prenom: formData.prenomCandidat,
      nomArabe: formData.nomCandidatArabe,
      prenomArabe: formData.prenomCandidatArabe,

      // Conversions
      fonctionaire: formData.fonctionaire === "true",
      paysId: parseInt(formData.pays), // Important: conversion en entier pour l'ID
      typeDeHandicape: hasHandicap ? formData.typeDeHandicape : null,

      // Fichiers (Noms uniquement pour JSON)
      pathCv: formData.pathCv ? formData.pathCv.name : null,
      pathPhoto: formData.pathPhoto ? formData.pathPhoto.name : null,
    };
    
  try {
        // Le backend gère tout via le Token "Bearer"
        const savedCandidat = await CandidatApiService.saveInfoPerso(payload);
        // On stocke l'ID renvoyé pour les étapes suivantes (diplômes, etc.)
        localStorage.setItem('candidatId', savedCandidat.id);
        navigate('/candidat/parcours');
    } catch (err) {
  
        console.error("Erreur API:", err);
        const message = err.response?.data?.message || "Erreur lors de l'enregistrement.";
        alert("Erreur : " + message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="page-title mb-0">Dossier Personnel</h2>
            <span className="badge bg-light text-dark border">Étape 1/3</span>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          
          <div className="row g-5 mb-4">
            {/* Colonne Photo */}
            <div className="col-12 col-lg-3 text-center">
                <div className={`mx-auto mb-3 d-flex align-items-center justify-content-center bg-light border rounded-circle shadow-sm ${errors.pathPhoto ? 'border-danger' : ''}`}
                     style={{ width: '150px', height: '150px', overflow: 'hidden', position: 'relative' }}>
                    {photoPreview ? (
                        <img src={photoPreview} alt="Aperçu" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    ) : <span className="display-4 text-muted">📷</span>}
                </div>
                <label className="btn btn-outline-primary btn-sm px-4">
                    <i className="bi bi-upload me-2"></i> Télécharger Photo
                    <input type="file" name="pathPhoto" accept="image/*" onChange={handleFileChange} hidden />
                </label>
                {errors.pathPhoto && <div className="text-danger small mt-2 fw-bold">{errors.pathPhoto}</div>}
            </div>

            {/* Colonne Champs Identifiants */}
            <div className="col-12 col-lg-9">
                 <div className="row g-3">
                     <div className="col-md-6">
                        <InputGroup label="CIN" name="cin" value={formData.cin} onChange={handleChange} required error={errors.cin} />
                     </div>
                     <div className="col-md-6">
                        <InputGroup label="CNE / Code Massar" name="cne" value={formData.cne} onChange={handleChange} required error={errors.cne} />
                     </div>
                     <div className="col-md-6">
                        <InputGroup label="Sexe" type="select" name="sexe" value={formData.sexe} onChange={handleChange} required>
                            <option value="M">Masculin</option>
                            <option value="F">Féminin</option>
                        </InputGroup>
                     </div>
                     
                     {/* --- MODIFICATION ICI : Liste Dynamique des Pays --- */}
                     <div className="col-md-6">
                        <InputGroup 
                            label="Pays de Nationalité" 
                            type="select" 
                            name="pays" 
                            value={formData.pays} 
                            onChange={handleChange} 
                            required
                            error={errors.pays}
                        >
                            <option value="">-- Sélectionner --</option>
                            {paysList.length > 0 ? (
                                paysList.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.nom}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Chargement des pays...</option>
                            )}
                        </InputGroup>
                     </div>

                 </div>
            </div>
          </div>

          <hr className="my-5 text-muted opacity-25" />

          {/* --- SECTION 2 : ÉTAT CIVIL --- */}
          <h4 className="mb-4 text-secondary fw-bold"><i className="bi bi-person-lines-fill me-2"></i>Identité & État Civil</h4>
          <div className="row g-3">
            <div className="col-md-6">
                <InputGroup label="Nom (Français)" name="nomCadidat" value={formData.nomCadidat} onChange={handleChange} required error={errors.nomCadidat} />
            </div>
            <div className="col-md-6">
                <InputGroup label="Prénom (Français)" name="prenomCandidat" value={formData.prenomCandidat} onChange={handleChange} required error={errors.prenomCandidat} />
            </div>
            
            <div className="col-md-6">
                <ArabicInputGroup 
                    label="الاسم العائلي (Arabe)" 
                    name="nomCandidatArabe" 
                    value={formData.nomCandidatArabe} 
                    onChange={handleChange} 
                    required 
                    error={errors.nomCandidatArabe} 
                    {...arabicProps} 
                />
            </div>
            <div className="col-md-6">
                <ArabicInputGroup 
                    label="الاسم الشخصي (Arabe)" 
                    name="prenomCandidatArabe" 
                    value={formData.prenomCandidatArabe} 
                    onChange={handleChange} 
                    required 
                    error={errors.prenomCandidatArabe} 
                    {...arabicProps} 
                />
            </div>

            <div className="col-md-4">
                <InputGroup label="Date de Naissance" type="date" name="dateDeNaissance" value={formData.dateDeNaissance} onChange={handleChange} required error={errors.dateDeNaissance} />
            </div>
            <div className="col-md-4">
                <InputGroup label="Ville de Naissance (FR)" name="villeDeNaissance" value={formData.villeDeNaissance} onChange={handleChange} required error={errors.villeDeNaissance} />
            </div>
            <div className="col-md-4">
                <ArabicInputGroup 
                    label="مكان الازدياد (Arabe)" 
                    name="villeDeNaissanceArabe" 
                    value={formData.villeDeNaissanceArabe} 
                    onChange={handleChange} 
                    required 
                    error={errors.villeDeNaissanceArabe} 
                    {...arabicProps} 
                />
            </div>
            
            <div className="col-md-4">
                <InputGroup label="Situation Familiale" type="select" name="situationFamiliale" value={formData.situationFamiliale} onChange={handleChange} required>
                    <option value="CELIBATAIRE">Célibataire</option>
                    <option value="MARIE">Marié(e)</option>
                    <option value="DIVORCE">Divorcé(e)</option>
                </InputGroup>
            </div>
          </div>

          <hr className="my-5 text-muted opacity-25" />

          {/* --- SECTION 3 : COORDONNÉES --- */}
          <h4 className="mb-4 text-secondary fw-bold"><i className="bi bi-geo-alt-fill me-2"></i>Coordonnées</h4>
          <div className="row g-3">
             <div className="col-md-6">
                <InputGroup label="Téléphone mobile" name="telCandidat" value={formData.telCandidat} onChange={handleChange} required error={errors.telCandidat} placeholder="06XXXXXXXX" />
             </div>
             <div className="col-md-6">
                <InputGroup label="Adresse Email" type="email" name="email" value={formData.email} onChange={handleChange} required error={errors.email} />
             </div>
             
             <div className="col-12">
                <InputGroup label="Adresse Complète (Français)" name="adresse" value={formData.adresse} onChange={handleChange} required error={errors.adresse} />
             </div>
             <div className="col-12">
                <ArabicInputGroup 
                    label="العنوان (Arabe)" 
                    name="adresseArabe" 
                    value={formData.adresseArabe} 
                    onChange={handleChange} 
                    required 
                    error={errors.adresseArabe} 
                    {...arabicProps} 
                />
             </div>
             
             <div className="col-md-6">
                <InputGroup label="Ville de Résidence" name="ville" value={formData.ville} onChange={handleChange} required error={errors.ville} />
             </div>
             <div className="col-md-6">
                <InputGroup label="Académie Régionale" name="academie" value={formData.academie} onChange={handleChange} required error={errors.academie} />
             </div>
          </div>

          {/* --- SECTION 4 : SITUATION & DOCS --- */}
          <div className="bg-light p-4 rounded-3 mt-5 border">
             <div className="row g-4">
                 <div className="col-md-6">
                    <label className="fw-bold d-block mb-3">Avez-vous un handicap ? <span className="text-danger">*</span></label>
                    <div className="d-flex gap-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="handicapNon" checked={!hasHandicap} onChange={() => setHasHandicap(false)} />
                            <label className="form-check-label cursor-pointer" htmlFor="handicapNon">Non</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="handicapOui" checked={hasHandicap} onChange={() => setHasHandicap(true)} />
                            <label className="form-check-label cursor-pointer" htmlFor="handicapOui">Oui</label>
                        </div>
                    </div>
                    {hasHandicap && (
                        <div className="mt-3 animate__animated animate__fadeIn">
                            <InputGroup label="Précisez le type de handicap" name="typeDeHandicape" value={formData.typeDeHandicape} onChange={handleChange} required error={errors.typeDeHandicape} />
                        </div>
                    )}
                 </div>

                 <div className="col-md-6">
                    <InputGroup label="Situation Professionnelle" type="select" name="fonctionaire" value={formData.fonctionaire} onChange={handleChange} required>
                        <option value="false">Étudiant / Sans emploi</option>
                        <option value="true">Salarié / Fonctionnaire</option>
                    </InputGroup>
                 </div>

                 <div className="col-12 border-top pt-3 mt-2">
                    <label className="form-label fw-bold">CV Détaillé (Format PDF) <span className="text-danger">*</span></label>
                    <div className="input-group">
                        <input 
                            type="file" 
                            name="pathCv" 
                            accept=".pdf" 
                            onChange={handleFileChange} 
                            className={`form-control ${errors.pathCv ? 'is-invalid' : ''}`} 
                        />
                        <span className="input-group-text bg-white"><i className="bi bi-file-earmark-pdf text-danger"></i></span>
                        {errors.pathCv && <div className="invalid-feedback">{errors.pathCv}</div>}
                    </div>
                    <small className="text-muted">Taille maximale : 5 Mo.</small>
                 </div>
             </div>
          </div>
          
          <div className="d-flex justify-content-end mt-5 pb-3">
            <button type="submit" className="btn btn-primary btn-lg px-5 shadow-sm" disabled={loading}>
              {loading ? (
                 <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Traitement...</span>
              ) : (
                 <>Enregistrer & Continuer <i className="bi bi-arrow-right ms-2"></i></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};