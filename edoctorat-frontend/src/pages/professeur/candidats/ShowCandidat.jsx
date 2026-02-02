import { useParams, Link } from "react-router-dom";
import { useCandidatDetail } from "../../../hooks/professeur/useCandidats";

const FILE_BASE_URL = "http://localhost:8080"; 

export default function ShowCandidat() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useCandidatDetail(id);

  if (isLoading) return <div className="alert alert-info">Chargement...</div>;
  if (isError)
    return (
      <div className="alert alert-danger">
        Erreur lors du chargement du candidat
        <div className="small mt-2 text-muted">{error?.response?.data?.message || error?.message || ""}</div>
      </div>
    );

  const candidat = data;
  const photoUrl = candidat?.pathPhoto ? `${FILE_BASE_URL}/${candidat.pathPhoto}` : null;

  return (
    <div className="container-fluid">
      <div className="mb-3">
        <Link to="/professeur/candidats" className="text-decoration-none">
          ← Retour
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex gap-4 flex-column flex-md-row">
            {/* Photo */}
            <div style={{ width: 180 }}>
              <div
                className="border rounded"
                style={{ width: 180, height: 180, overflow: "hidden", background: "#f3f4f6" }}
              >
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Photo candidat"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                    Pas de photo
                  </div>
                )}
              </div>
            </div>

            {/* Infos */}
            <div className="flex-grow-1">
              <h4 className="mb-1">
                {candidat?.nom} {candidat?.prenom}
              </h4>
              <div className="text-muted mb-3">CNE: {candidat?.cne} • CIN: {candidat?.cin}</div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="small text-muted">Email</div>
                  <div className="fw-semibold">{candidat?.email || "-"}</div>
                </div>

                <div className="col-md-6">
                  <div className="small text-muted">Adresse</div>
                  <div className="fw-semibold">{candidat?.adresse || "-"}</div>
                </div>

                {/* ⚠️ Tel non موجود في DTO -> si tu veux, ajoute telCandidat côté backend */}
                <div className="col-md-6">
                  <div className="small text-muted">Téléphone</div>
                  <div className="fw-semibold">-</div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Diplomes + Annexes */}
          <h5 className="mb-3">Diplômes & annexes</h5>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Diplôme</th>
                  <th>Type</th>
                  <th>Mention</th>
                  <th>Annexes</th>
                </tr>
              </thead>
              <tbody>
                {(candidat?.diplomes || []).length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      Aucun diplôme
                    </td>
                  </tr>
                ) : (
                  (candidat?.diplomes || []).map((d) => (
                    <tr key={String(d.id)}>
                      <td className="fw-semibold">{d.intitule || "-"}</td>
                      <td>{d.type || "-"}</td>
                      <td>{d.mention || "-"}</td>
                      <td>
                        {(d.annexes || []).length === 0 ? (
                          <span className="text-muted">-</span>
                        ) : (
                          <div className="d-flex flex-column gap-1">
                            {(d.annexes || []).map((a) => {
                              const url = a.pathFile ? `${FILE_BASE_URL}/${a.pathFile}` : null;
                              return url ? (
                                <a key={a.id} href={url} target="_blank" rel="noreferrer">
                                  {a.titre || a.typeAnnexe || "Annexe"}
                                </a>
                              ) : (
                                <span key={a.id} className="text-muted">
                                  {a.titre || a.typeAnnexe || "Annexe"}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
