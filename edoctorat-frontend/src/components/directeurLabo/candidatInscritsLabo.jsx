export default function InscritsTable({ data, isLoading }) {
  if (isLoading) return <p>Chargement...</p>;

  return (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr>
          <th>CNE</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Sujet</th>
          <th>Date dépôt</th>
          <th>Validation</th>
        </tr>
      </thead>
      <tbody>
        {data?.content?.map((c, idx) => (
          <tr key={idx}>
            <td>{c.cne}</td>
            <td>{c.nomCandidatArabe}</td>
            <td>{c.prenomCandidatArabe}</td>
            <td>{c.titre}</td>
            <td>{c.dateDiposerDossier}</td>
            <td>
              <span className={`badge ${c.valider ? "bg-success" : "bg-warning"}`}>
                {c.valider ? "Validé" : "En attente"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
