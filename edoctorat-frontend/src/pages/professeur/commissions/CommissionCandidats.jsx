import { Link, useParams } from "react-router-dom";
import { useCandidatsCommissionSujet } from "../../../hooks/professeur/useCommissions";

export default function CommissionCandidats() {
  const { commissionId, sujetId } = useParams();
  const { data, isLoading, isError, error } = useCandidatsCommissionSujet(commissionId, sujetId);

  const candidats = Array.isArray(data) ? data : [];

  const isExamined = (c) =>
    c?.decision != null || c?.noteDossier != null || c?.noteEntretien != null || c?.valider != null;

  if (isLoading) return <div className="alert alert-info">Chargement...</div>;

  if (isError)
    return (
      <div className="alert alert-danger">
        Erreur
        <div className="small mt-2 text-muted">
          {error?.response?.data?.message || error?.message || ""}
        </div>
      </div>
    );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* ✅ PAS d'ID dans le titre */}
        <h3 className="m-0">Candidats</h3>

        <Link
          to={`/professeur/commissions/${commissionId}/sujets`}
          className="btn btn-outline-secondary btn-sm"
        >
          Retour
        </Link>
      </div>

      <div className="table-responsive bg-white border rounded">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              {/* ✅ PAS de colonne ID */}
              <th>CNE</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Note dossier</th>
              <th>Note entretien</th>
              <th>Décision</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            {candidats.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  Aucun candidat
                </td>
              </tr>
            ) : (
              candidats.map((c, idx) => {
                // backend dto: candidatId
                const candidatId = c?.candidatId ?? c?.id;
                const done = isExamined(c);

                if (!candidatId) {
                  return (
                    <tr key={`noCid-${idx}`}>
                      <td colSpan={7} className="text-danger">
                        Candidat sans ID (erreur data)
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={candidatId}>
                    <td className="fw-semibold">{c?.cne || "-"}</td>
                    <td>{c?.nom || "-"}</td>
                    <td>{c?.prenom || "-"}</td>
                    <td>{c?.noteDossier ?? "-"}</td>
                    <td>{c?.noteEntretien ?? "-"}</td>
                    <td>{c?.decision ?? <span className="text-muted">Non examiné</span>}</td>

                    <td className="text-end">
                      <Link
                        className={`btn btn-sm ${done ? "btn-outline-primary" : "btn-primary"}`}
                        to={`/professeur/commissions/${commissionId}/sujets/${sujetId}/candidats/${candidatId}/examination`}
                      >
                        {done ? "Modifier" : "Ajouter"}
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
