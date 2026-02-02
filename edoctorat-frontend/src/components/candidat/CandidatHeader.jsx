import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const CandidatHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top py-2 px-4">
      <div className="container-fluid">
        
        {/* 1. GAUCHE : Logo & Marque */}
        <Link className="navbar-brand d-flex align-items-center" to=".">
          <img 
            src="/logo-usmba.png" 
            alt="Logo" 
            height="45" 
            className="d-inline-block align-text-top me-3" 
          />
          <div className="d-flex flex-column" style={{ lineHeight: '1.2' }}>
            <span className="fw-bold text-dark fs-5">E-Doctorat</span>
            <span className="text-muted small fw-normal">Espace Candidat</span>
          </div>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 2. MENU */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            
            <li className="nav-item">
              <Link className="nav-link px-3 fw-medium text-secondary" to="profil">
                <i className="bi bi-person-circle me-2"></i>Mon Profil
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3 fw-medium text-secondary" to="mes-candidatures">
                <i className="bi bi-folder2-open me-2"></i>Mes Candidatures
              </Link>
            </li>

            <li className="nav-item">
              {/* ✅ BADGE SUPPRIMÉ */}
              <Link className="nav-link px-3 fw-medium text-secondary" to="notifications">
                <i className="bi bi-bell me-2"></i>Notifications
              </Link>
            </li>
          </ul>

          <div className="d-none d-lg-block border-end mx-3" style={{ height: '25px' }}></div>

          <button 
            onClick={handleLogout}
            className="btn btn-outline-danger btn-sm d-flex align-items-center px-3"
          >
            <i className="bi bi-box-arrow-right me-2"></i>Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};
