import { CandidatLayout } from "../components/layouts/CandidatLayout";
import { GuestLayout } from "../components/guest/GuestLayout";
import { InfosPerso } from "../pages/candidat/InfosPerso";
import { Notifications } from "../pages/candidat/Notifications";
import { Parcours } from "../pages/candidat/Parcours";
import { Postuler } from "../pages/candidat/Postuler";
import { MesCandidatures } from "../pages/candidat/MesCandidatures";
import { Profil } from "../pages/candidat/Profil";
import { Home } from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import OAuth2Callback from "../pages/auth/OAuth2Callback";
import ActivateAccount from "../pages/auth/ActivateAccount";
import ProtectedRoute from "../auth/ProtectedRoute";
import ProfesseurLayout from "../components/professeur/ProfesseurLayout";
import Dashboard from "../pages/professeur/Dashboard";
import ListSujets from "../pages/professeur/sujets/ListSujets";
import ListCandidats from "../pages/professeur/candidats/ListCandidats";
import ShowCandidat from "../pages/professeur/candidats/ShowCandidat";
import ListCommissions from "../pages/professeur/commissions/ListCommissions";
import CommissionSujets from "../pages/professeur/commissions/CommissionSujets";
import CommissionCandidats from "../pages/professeur/commissions/CommissionCandidats";
import ExaminationForm from "../pages/professeur/commissions/ExaminationForm";
import ListInscrits from "../pages/professeur/inscriptions/ListInscrits";
import InscritsBySujet from "../pages/professeur/inscriptions/InscritsBySujet";
import ListResultats from "../pages/professeur/resultats/ListResultats";
import ScolariteLayout from "../components/scolarite/ScolariteLayout";
import ScolariteDashboard from "../pages/scolarite/Dashboard";
import ListInscriptions from "../pages/scolarite/inscriptions/ListInscriptions";

// Imports Directeurs Labo & Pole
import { 
  LABO_ROUTE, 
  LIST_COMMISSIONS_ROUTE, 
  LISTE_SUJETS_ROUTE, 
  PRESELECTION_ENTRETIENS_ROUTE, 
  RESULTATS_ENTRETIEN_ROUTE, 
  SHOW_CANDIDAT_ROUTE, 
  LIST_CANDIDAT_LABO_ROUTE, 
  DIRECTEUR_POLE_ROUTE, 
  SUJETS_POLE_ROUTE, 
  CANDIDATS_POLE_ROUTE, 
  COMMISSIONS_POLE_ROUTE, 
  CALENDRIER_POLE_ROUTE, 
  COMMUNIQUER_POLE_ROUTE,
  INSCRIPTIONS_POLE_ROUTE, // <--- Correct constant
  CED_ROUTE,
  CED_SUJETS, 
  CED_CANDIDATS, 
  CED_COMMISSIONS, 
  CED_RESULTATS, 
  CED_INSCRITS
} from "./constants";

import { ListSujetsLabo } from "../pages/directeurLabo/sujet/listSujetsLabo";
import ShowCandidatLabo from "../pages/directeurLabo/candidat/showCandidatLabo";
import CommissionsNotificationsPage from "../pages/directeurLabo/convocation/commissionNotificationPage";
import CommissionsPage from "../pages/directeurLabo/commission/listCommissionsLabo";
import { DirecteurLaboLayout } from "../components/directeurLabo/directeurLaboLayout";
import {DirecteurLaboDashboard} from "../pages/directeurLabo/DirecteurLaboDashboard";
import ResultatsPage from "../pages/directeurLabo/resultat/ResultatPage";
import CandidatPage from "../pages/directeurLabo/candidat/candidatLaboPage";
import { DirecteurPoleLayout } from "../components/directeurPole/DirecteurPoleLayout";
import SujetsPolePage from "../pages/directeurPole/SujetsPolePage";
import CandidatsPolePage from "../pages/directeurPole/CandidatsPolePage";
import CommissionsPolePage from "../pages/directeurPole/CommissionsPolePage";
import CalendrierPole from "../pages/directeurPole/CalendrierPole";

// *** CORRECTED IMPORTS FOR POLE ***
import CommuniquerPolePage from "../pages/directeurPole/CommuniquerPolePage"; // Ensure this file exists!
import InscriptionsPolePage from "../pages/directeurPole/InscriptionsPolePage"; // Ensure this file exists!

// Imports CED
import { CedLayout } from "../components/ced/CedLayout";
import { SujetsCed } from "../pages/ced/SujetsCed";
import { CandidatsCed } from "../pages/ced/CandidatsCed";
import { CommissionsCed } from "../pages/ced/CommissionsCed";
import { ResultatsCed } from "../pages/ced/ResultatsCed";
import { InscritsCed } from "../pages/ced/InscritsCed";


export const routes = [
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "oauth2/callback", element: <OAuth2Callback /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "activate", element: <ActivateAccount /> },
    ],
  },

  {
    path: "/candidat",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_CANDIDAT"]}>
        <CandidatLayout />
      </ProtectedRoute>
    ),
    children: [
          { index: true, element: <InfosPerso /> },
          { path: "parcours", element: <Parcours /> },
          { path: "postuler", element: <Postuler /> },
          { path: "mes-candidatures", element: <MesCandidatures /> },
          // NOUVEAU : La route vers le profil
          { path: "profil", element: <Profil /> },
          { path: "notifications", element: <Notifications /> }
                
    ],
  },

  {
    path: "/professeur",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_PROFESSOR"]}>
        <ProfesseurLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "sujets", element: <ListSujets /> },
      { path: "candidats", element: <ListCandidats /> },
      { path: "candidats/:id", element: <ShowCandidat /> },
      { path: "commissions", element: <ListCommissions /> },
      { path: "commissions/:commissionId/sujets", element: <CommissionSujets /> },
      { path: "commissions/:commissionId/sujets/:sujetId/candidats", element: <CommissionCandidats /> },
      { path: "commissions/:commissionId/sujets/:sujetId/candidats/:candidatId/examination", element: <ExaminationForm /> },
      { path: "inscrits", element: <ListInscrits /> },
      { path: "inscrits/sujet/:sujetId", element: <InscritsBySujet /> },
      { path: "resultats", element: <ListResultats /> },
    ],
  },

  // --- DIRECTEUR LABO ---
  {
    path: LABO_ROUTE,
    element: (
      <ProtectedRoute allowedRoles={["ROLE_DIRECTEUR_LABO"]}>
        <DirecteurLaboLayout />
      </ProtectedRoute>
    ),
    children : [
        { index : true, element : <Dashboard/> },
        { path : LISTE_SUJETS_ROUTE, element : <ListSujetsLabo/> },
        { path : LIST_CANDIDAT_LABO_ROUTE, element : <CandidatPage/> },
        { path : SHOW_CANDIDAT_ROUTE, element : <ShowCandidatLabo/> },
        { path : LIST_COMMISSIONS_ROUTE, element : <CommissionsPage/> },
        { path : PRESELECTION_ENTRETIENS_ROUTE, element : <CommissionsNotificationsPage/> },
        { path : RESULTATS_ENTRETIEN_ROUTE, element : <ResultatsPage/> }
    ],
  },

  // --- DIRECTEUR POLE ---
  {
    path: DIRECTEUR_POLE_ROUTE,
    element: (
      <ProtectedRoute allowedRoles={["ROLE_DIRECTEUR_POLE"]}>
        <DirecteurPoleLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> }, // Or a specific Pole Dashboard
      { path : SUJETS_POLE_ROUTE, element : <SujetsPolePage/> },
      { path : CANDIDATS_POLE_ROUTE, element : <CandidatsPolePage/> },
      { path : COMMISSIONS_POLE_ROUTE, element : <CommissionsPolePage/> },
      { path : CALENDRIER_POLE_ROUTE, element : <CalendrierPole/> },
      { path : COMMUNIQUER_POLE_ROUTE, element : <CommuniquerPolePage/> },
      { path : INSCRIPTIONS_POLE_ROUTE, element : <InscriptionsPolePage/> }
    ],
  },
  
  // --- DIRECTEUR CED ---
  {
    path: CED_ROUTE, 
    element: (
      <ProtectedRoute allowedRoles={["ROLE_DIRECTEUR_CED"]}>
        <CedLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <SujetsCed /> },
      { path: CED_SUJETS, element: <SujetsCed /> },
      { path: CED_CANDIDATS, element: <CandidatsCed /> },
      { path: CED_COMMISSIONS, element: <CommissionsCed /> },
      { path: CED_RESULTATS, element: <ResultatsCed /> },
      { path: CED_INSCRITS, element: <InscritsCed /> },
    ],
  },
   // scolarité
    {
      path: "/scolarite",
      element: (
        <ProtectedRoute allowedRoles={["ROLE_SCOLARITE"]}>
          <ScolariteLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <ScolariteDashboard /> },
        { path: "inscriptions", element: <ListInscriptions /> },
      ],
    },
];