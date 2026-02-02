export default function CommissionTable({ data, onEdit, onDelete }) {
  console.log("data from commissions table", data);
  return (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr>
          <th>Date</th>
          <th>Heure</th>
          <th>Lieu</th>
          <th>Sujets</th>
          <th>Membres</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((c) => (
          <tr key={c.id}>
            <td>{c.dateCommission}</td>
            <td>{c.heureCommission}</td>
            <td>{c.lieu}</td>
            <td>{c.sujets.join(", ")}</td>
            <td>{c.membres.join(", ")}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(c)}
              >
                ✏
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(c.id)}
              >
                🗑
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
