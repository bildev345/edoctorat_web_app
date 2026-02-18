import { Link } from "react-router-dom";

export default function PostulesTable({ data, isLoading }) {

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border" />
      </div>
    );
  }

  if (!data?.content?.length) {
    return <p className="text-muted">Aucune candidature trouvée</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>CNE</th>
            <th>Nom candidat</th>
            <th>Sujet</th>
            <th>Directeur</th>
            <th>Co-directeur</th>
            <th>Formation</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((row) => (
            <tr key={`${row.candidatId}-${row.sujetTitre}`}>
              <td>
                <Link
                  to={`${row.candidatId}`}
                  className="text-decoration-none fw-semibold"
                >
                  {row.candidatCne}
                </Link>
              </td>
              <td>{row.candidatNom}</td>
              <td>{row.sujetTitre}</td>
              <td>{row.directeurNom}</td>
              <td>{row.coDirecteurNom !== null ? row.coDirecteurNom : "None"}</td>
              <td>{row.formationDoctoraleTitre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
