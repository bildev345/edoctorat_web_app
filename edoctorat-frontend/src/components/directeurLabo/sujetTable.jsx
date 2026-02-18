export default function SujetTable({records}) {
  console.log(records);
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: "60px" }}>#</th>
            <th>Titre</th>
            <th>Directeur</th>
            <th>Co-directeur</th>
            <th>Formations doctorale</th>
          </tr>
        </thead>

        <tbody>
          {records?.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No records found
              </td>
            </tr>
          ) : (
            records?.map((r, index) => (
              <tr key={r.sujetId}>
                <td>{index + 1}</td>
                <td>{r.titre}</td>
                <td>{r.directeur}</td>
                <td>{r.coDirecteur !== null ? r.coDirecteur : "None"}</td>
                <td>{r.titreFormationDoctorale}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
