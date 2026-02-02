import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      
     {/* Logo */}
<Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
  <img
    src="/logo-usmba.png"
    alt="USMBA"
    height="40"
  />
  E-Doctorat
</Link>


      {/* Mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Menu */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-4">

          <li className="nav-item">
            <a className="nav-link fw-semibold" href="#reglement">
              Règlement & Candidature
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link fw-semibold" href="#formation">
              Formation doctorale
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link fw-semibold" href="#pole">
              Pôle doctoral
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link fw-semibold" href="#laboratoire">
              Laboratoire De Recherche
            </a>
          </li>

          <li className="nav-item">
            <Link to="/login" className="btn btn-outline-primary">
              Se connecter
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};
