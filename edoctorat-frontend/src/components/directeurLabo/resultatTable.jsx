import { Table, Spinner } from "react-bootstrap";
import { useResultatsCommissions } from "../../hooks/directeurLabo/useResultat";

export default function ResultatsCommissionsTable({ page, size }) {
  const { data, isLoading } = useResultatsCommissions(page, size);

  if (isLoading) return <Spinner animation="border" />;

  return (
    <Table striped bordered hover responsive>
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Cne</th>
          <th>Candidat</th>
          <th>Sujet</th>
          <th>Note dossier</th>
          <th>Note entretien</th>
          <th>Moyenne générale</th>
          <th>Décision</th>
        </tr>
      </thead>

      <tbody>
        {data.content.map((row, index) => (
          <tr key={row.id}>
            <td>{page * size + index + 1}</td>
            <td>{row.candidatCne}</td>
            <td>{row.nomCandidat}</td>
            <td>{row.sujetTitre}</td>
            <td>{row.noteDossier}</td>
            <td>{row.noteEntretien}</td>
            <td>{row.moyenneGenerale}</td>
            <td>
              <span
                className={`badge ${
                  row.decision === "ACCEPTE"
                    ? "bg-success"
                    : row.decision === "REFUSE"
                    ? "bg-danger"
                    : "bg-secondary"
                }`}
              >
                {row.decision}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
