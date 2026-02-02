import { Table, Badge } from "react-bootstrap";

export default function InscriptionsTable({ data }) {
  if (!data || !data.content || data.content.length === 0) {
    return (
        <div className="text-center py-5">
            <p className="text-muted fs-5">Aucune inscription validée pour le moment.</p>
        </div>
    );
  }

  return (
    <div className="table-responsive">
        <Table striped hover className="mb-0 align-middle">
            <thead className="bg-light text-secondary">
                <tr>
                    <th>Candidat</th>
                    <th>CNE / CIN</th>
                    <th>Sujet Retenu</th>
                    <th>Directeur</th>
                    <th className="text-center">Note Finale</th>
                    <th className="text-center">Rang</th>
                </tr>
            </thead>
            <tbody>
                {data.content.map((row, idx) => (
                    <tr key={idx}>
                        <td>
                            <div className="fw-bold text-dark">{row.nom.toUpperCase()} {row.prenom}</div>
                        </td>
                        <td>
                            <div className="small text-muted">{row.cne}</div>
                            <div className="small text-muted">{row.cin}</div>
                        </td>
                        <td style={{maxWidth: "250px"}}>
                            <span className="d-inline-block text-truncate" style={{maxWidth: "100%"}} title={row.sujetTitre}>
                                {row.sujetTitre}
                            </span>
                        </td>
                        <td>{row.directeur}</td>
                        <td className="text-center fw-bold text-primary">
                            {typeof row.noteFinale === 'number' ? row.noteFinale.toFixed(2) : row.noteFinale}
                        </td>
                        <td className="text-center">
                            <Badge bg="success" pill>#{row.rang || idx + 1}</Badge>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  );
}