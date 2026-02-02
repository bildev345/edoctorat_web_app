import { Table, Button, Badge } from "react-bootstrap";

export default function SujetPoleTable({ data }) {
  // Empty State Handling
  if (!data || !data.content || data.content.length === 0) {
    return (
        <div className="text-center py-5">
            <p className="text-muted fs-5">Aucun sujet à valider pour le moment.</p>
        </div>
    );
  }

  return (
    <div className="table-responsive">
        <Table striped hover className="mb-0 align-middle">
        <thead className="bg-light text-secondary">
            <tr>
            <th style={{ width: "25%" }}>Titre du Sujet</th>
            <th>Encadrement</th>
            <th>Laboratoire</th>
            <th>Formation & CED</th>
            <th className="text-center">Statut</th>
            </tr>
        </thead>
        <tbody>
            {data.content.map((s) => (
            <tr key={s.id}>
                {/* 1. Titre (Bold for emphasis) */}
                <td>
                    <div className="fw-bold text-dark">{s.titre}</div>
                </td>

                {/* 2. Encadrement (Stacked for better space usage) */}
                <td>
                    <div><strong>Dir:</strong> {s.directeur}</div>
                    {s.coDirecteur && (
                        <div className="text-muted small">Co-Dir: {s.coDirecteur}</div>
                    )}
                </td>

                {/* 3. Laboratoire */}
                <td>{s.laboratoire}</td>

                {/* 4. Formation / CED */}
                <td>
                    <div className="small">{s.formationDoctorale}</div>
                    <div className="text-muted small fst-italic">{s.ced}</div>
                </td>

                {/* 5. Statut */}
                <td className="text-center">
                {s.publier ? (
                    <Badge bg="success" pill className="px-3 py-2">
                        Publié
                    </Badge>
                ) : (
                    <Badge bg="warning" text="dark" pill className="px-3 py-2">
                        En attente
                    </Badge>
                )}
                </td>
                
            </tr>
            ))}
        </tbody>
        </Table>
    </div>
  );
}