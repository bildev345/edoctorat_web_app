import { Link, useParams } from "react-router-dom";
import { useInscriptionsBySujet } from "../../../hooks/professeur/useInscriptions";

export default function InscritsBySujet() {
  const { sujetId } = useParams();
  const { data, isLoading, isError } = useInscriptionsBySujet(sujetId);

  const list = Array.isArray(data) ? data : [];

  if (isLoading) return <div className="alert alert-info">Chargement...</div>;
  if (isError) return <div className="alert alert-danger">Erreur</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Inscrits — Sujet {sujetId}</h3>
        <Link to="/professeur/inscrits" className="btn btn-outline-secondary btn-sm">Retour</Link>
      </div>

      <div className="table-responsive bg-white border rounded">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>CNE</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td className="fw-semibold">{r.cne}</td>
                <td>{r.nom}</td>
                <td>{r.prenom}</td>
                <td>{r.email || "-"}</td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">Aucun inscrit pour ce sujet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
