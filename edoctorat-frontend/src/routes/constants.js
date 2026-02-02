export const HOME_ROUTE = "/";
export const OAUTH_CALLBACK_ROUTE = "/oauth2/callback";

// --- PROFESSEUR ---
export const PROF_ROUTE = "/professeur";
export const PROF_DASHBOARD = ".";
export const PROF_SUJETS = "sujets";
export const PROF_CANDIDATS = "candidats";
export const PROF_CANDIDAT_SHOW = "candidats/:id";
export const PROF_COMMISSIONS = "commissions";
export const PROF_COMMISSION_SUJETS = "commissions/:commissionId/sujets";
export const PROF_COMMISSION_CANDIDATS = "commissions/:commissionId/sujets/:sujetId/candidats";
export const PROF_EXAMINATION = "commissions/:commissionId/sujets/:sujetId/candidats/:candidatId/examination";
export const PROF_INSCRITS = "inscrits";
export const PROF_INSCRITS_SUJET = "inscrits/sujet/:sujetId";
export const PROF_RESULTATS = "resultats";

// --- DIRECTEUR LABO ---
export const LABO_ROUTE = "/labo";
export const LISTE_SUJETS_ROUTE = "sujets";
export const LIST_CANDIDAT_LABO_ROUTE = "candidats";
export const SHOW_CANDIDAT_ROUTE = "candidats/:id";
export const LIST_COMMISSIONS_ROUTE = "commissions";
export const PRESELECTION_ENTRETIENS_ROUTE = "preselection";
export const INSCRITS_ROUTE = "inscrits";
export const RESULTATS_ENTRETIEN_ROUTE = "resultats";

// --- DIRECTEUR POLE ---
export const DIRECTEUR_POLE_ROUTE = "/directeurPole";
export const CALENDRIER_POLE_ROUTE = "calendrier";
export const CANDIDATS_POLE_ROUTE = "candidatsPole";
export const COMMISSIONS_POLE_ROUTE = "commissionsPole";
export const SUJETS_POLE_ROUTE = "sujetsPole";
// Distinction between "Publishing" (Communiquer) and "Final List" (Inscriptions)
export const COMMUNIQUER_POLE_ROUTE = "communiquer"; 
export const INSCRIPTIONS_POLE_ROUTE = "inscriptions"; 

// --- DIRECTEUR CED ---
export const CED_ROUTE = "/directeur-ced";
export const CED_SUJETS = "sujets";
export const CED_CANDIDATS = "candidats";
export const CED_COMMISSIONS = "commissions";
export const CED_RESULTATS = "resultats";
export const CED_INSCRITS = "inscrits";

export const CANDIDAT_ROUTE = "/candidat";
export const CANDIDAT_PARCOURS = "/parcours";  
export const CANDIDAT_POSTULER = "/postuler";