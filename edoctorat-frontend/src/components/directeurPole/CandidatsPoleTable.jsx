import { Table, Badge } from "react-bootstrap";

export default function CandidatsPoleTable({ data }) {
  // Empty State Check
  if (!data || !data.content || data.content.length === 0) {
    return (
        <div className="text-center py-5">
            <p className="text-muted fs-5">Aucun candidat trouvé.</p>
        </div>
    );
  }

  return (
    <div className="table-responsive">
        <Table striped hover className="mb-0 align-middle">
        <thead className="bg-light text-secondary">
            <tr>
            <th style={{width: "20%"}}>Candidat (CNE)</th>
            <th style={{width: "30%"}}>Sujet de Thèse</th>
            <th style={{width: "20%"}}>Encadrement</th>
            <th style={{width: "20%"}}>Laboratoire & Formation</th>
            </tr>
        </thead>
        <tbody>
            {data.content.map((row, idx) => (
            <tr key={idx}>
                
                {/* 1. Candidat Info */}
                <td>
                    <div className="fw-bold text-primary">
                        {row.nom.toUpperCase()} {row.prenom}
                    </div>
                    <div className="small text-muted">
                        <i className="bi bi-person-badge me-1"></i>
                        {row.cne}
                    </div>
                </td>

                {/* 2. Sujet Info */}
                <td>
                    <span className="fw-semibold text-dark" style={{display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                        {row.sujetTitre}
                    </span>
                </td>

                {/* 3. Encadrement (Merged Dir & Co-Dir) */}
                <td>
                    <div>
                        <strong>Dir:</strong> {row.directeur}
                    </div>
                    {row.coDirecteur && (
                        <div className="small text-muted">
                            <strong>Co-Dir:</strong> {row.coDirecteur}
                        </div>
                    )}
                </td>

                {/* 4. Structure Info */}
                <td>
                    <div className="fw-medium">{row.laboratoire}</div>
                    <div className="small text-muted fst-italic">
                        {row.formationDoctorale}
                    </div>
                </td>

            </tr>
            ))}
        </tbody>
        </Table>
    </div>
  );
}