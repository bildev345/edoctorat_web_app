import { Link } from "react-router-dom";
import { useCommissions } from "../../../hooks/professeur/useCommissions";

export default function ListCommissions() {
  const { data, isLoading, isError, error } = useCommissions();
  const items = Array.isArray(data) ? data : [];

  const membresLabel = (c) => {
    const profs = c?.professeurDtos || [];
    if (profs.length === 0) return "-";
    return profs
      .map((p) => `${p.nom ?? ""} ${p.prenom ?? ""}`.trim())
      .filter(Boolean)
      .join(", ");
  };

  if (isLoading) return <div className="alert alert-info">Chargement...</div>;

  if (isError)
    return (
      <div className="alert alert-danger">
        Erreur lors du chargement
        <div className="small mt-2 text-muted">
          {error?.response?.data?.message || error?.message || ""}
        </div>
      </div>
    );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Commissions</h3>
      </div>

      <div className="table-responsive bg-white border rounded">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Lieu</th>
              <th>Heure</th>
              <th>Membres</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  Aucune commission
                </td>
              </tr>
            ) : (
              items.map((c) => (
                <tr key={c.commissionId}>
                  <td>{String(c.dateCommission || "").slice(0, 10) || "-"}</td>
                  <td>{c.lieu || "-"}</td>
                  <td>{String(c.heure || "").slice(0, 5) || "-"}</td>
                  <td style={{ maxWidth: 520 }}>
                    <span className="text-truncate d-inline-block" style={{ maxWidth: 520 }}>
                      {membresLabel(c)}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link className="btn btn-dark btn-sm" to={`/professeur/commissions/${c.commissionId}/sujets`}>
                      Examiner
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
