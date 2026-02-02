import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          height: "100vh",
          backgroundImage: "url('/usmba-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        />

        <div className="text-center position-relative px-3">
          <h1 className="fw-bold mb-4 display-5">
            Plateforme E-Doctorat – USMBA
          </h1>


          <div className="d-flex gap-3 justify-content-center">
            <Link to="/register" className="btn btn-primary btn-lg">
  Créer un compte
</Link>

            <Link to="/login" className="btn btn-outline-light btn-lg">
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FORMATION DOCTORALE ================= */}
     <section
  id="formation"
  className="d-flex align-items-center bg-light"
  style={{ height: "100vh" }}
>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-9">

        <div className="p-5 bg-white rounded shadow text-center">
          <h2 className="fw-bold mb-4 text-primary">
            Formation doctorale
          </h2>

          <p className="fs-5 text-muted">
            La formation doctorale constitue un cadre académique structuré
            permettant aux doctorants d’acquérir des compétences scientifiques,
            méthodologiques et transversales indispensables à la recherche.
          </p>

          <button
            className="btn btn-outline-primary mt-3"
            data-bs-toggle="collapse"
            data-bs-target="#formationPlus"
          >
            Découvrir plus
          </button>

          <div id="formationPlus" className="collapse mt-4">
            <div className="alert alert-primary">
              Elle inclut des séminaires, des formations transversales
              et un accompagnement régulier jusqu’à la soutenance.
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</section>


     {/* ================= POLE DOCTORAL ================= */}
<section
  id="pole"
  className="d-flex align-items-center"
  style={{ height: "100vh" }}
>
  <div className="container">
    <div className="row align-items-center">

      {/* IMAGE */}
      <div className="col-md-6 text-center mb-4 mb-md-0">
        <img
          src="/pole.png"
          alt="Pôle doctoral"
          className="img-fluid rounded shadow"
          style={{
            maxHeight: "520px",
            width: "100%",
            transition: "transform 0.5s ease"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
      </div>

      {/* TEXTE */}
      <div className="col-md-6 ps-md-5">
       <h2 className="fw-bold mb-4 text-primary">
  Pôle d’études doctorales
</h2>


        <p className="text-muted fs-5">
          Le pôle d’études doctorales est la structure centrale chargée de
          l’organisation, de la coordination et du suivi des formations
          doctorales au sein de l’université.
        </p>

        <p className="text-muted fs-5">
          Il assure le respect des règlements, l’évaluation des candidatures
          et l’accompagnement administratif et scientifique des doctorants
          tout au long de leur parcours.
        </p>
      </div>

    </div>
  </div>
</section>


    {/* ================= REGLEMENT ================= */}
<section
  id="reglement"
  className="d-flex align-items-center bg-light"
  style={{ height: "100vh" }}
>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-9">

        <div className="p-5 bg-white rounded shadow text-center">
          <h2 className="fw-bold mb-4 text-primary">
            Règlement & Candidature
          </h2>

          <p className="fs-5 text-muted">
            L’accès au doctorat est soumis à un ensemble de règles académiques
            définies par l’université afin de garantir la qualité scientifique,
            l’équité entre les candidats et la transparence du processus.
          </p>

          <p className="fs-5 text-muted">
            La procédure de candidature comprend le dépôt du dossier,
            l’évaluation par les commissions compétentes et la validation
            finale selon les textes réglementaires en vigueur.
          </p>

          <button
            className="btn btn-outline-primary mt-3"
            data-bs-toggle="collapse"
            data-bs-target="#reglementDetails"
          >
            Voir les détails
          </button>

          <div id="reglementDetails" className="collapse mt-4">
            <div className="alert alert-primary">
              Les décisions d’admission sont prises par les instances
              universitaires conformément aux lois et règlements nationaux.
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</section>



      {/* ================= LABORATOIRE ================= */}
      <section
        id="laboratoire"
        className="d-flex align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse">

            <div className="col-md-6 mb-4 mb-md-0 text-center">
              <img
                src="/laboratoire.png"
                alt="Laboratoire de recherche"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "400px", transition: "transform 0.4s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>

            <div className="col-md-6">
              <h2 className="fw-bold mb-4 text-primary">
  Laboratoire de recherche
</h2>


              <p className="text-muted fs-5">
                Les travaux de recherche doctorale sont menés au sein de
                laboratoires accrédités, offrant un environnement scientifique
                propice à l’innovation, à l’expérimentation et à la production
                de connaissances.
              </p>

              <p className="text-muted fs-5">
                Les doctorants y bénéficient d’un encadrement scientifique
                qualifié et de moyens techniques adaptés à leurs thématiques
                de recherche.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
