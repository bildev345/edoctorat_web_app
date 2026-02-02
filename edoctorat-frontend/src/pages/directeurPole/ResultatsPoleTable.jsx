import { Table } from "react-bootstrap";

export default function ResultatsPoleTable({ data }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>CNE</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Sujet</th>
          <th>Décision</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        {data?.content.map((row) => (
          <tr key={row.id}>
            <td>{row.cne}</td>
            <td>{row.nom}</td>
            <td>{row.prenom}</td>
            <td>{row.sujet}</td>
            <td>{row.decision}</td>
            <td>
              {row.publier ? (
                <span className="badge bg-success">Publié</span>
              ) : (
                <span className="badge bg-warning text-dark">Non publié</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}