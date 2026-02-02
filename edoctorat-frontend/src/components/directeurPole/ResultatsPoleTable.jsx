import React from "react";
import { Table, Badge } from "react-bootstrap";

export default function ResultatsPoleTable({ data }) {
  if (!data || !data.content || data.content.length === 0) {
    return <div className="text-center p-4">Aucun résultat trouvé pour cette liste.</div>;
  }

  return (
    <div className="table-responsive shadow-sm rounded">
        <Table striped bordered hover className="mb-0 bg-white">
        <thead className="table-dark">
            <tr>
            <th>CNE</th>
            <th>Nom Complet</th>
            <th>Sujet</th>
            <th>Laboratoire</th>
            <th>Moyenne</th>
            <th>Statut</th>
            </tr>
        </thead>
        <tbody>
            {data.content.map((r) => (
            <tr key={r.id || r.cne}>
                <td>{r.cne}</td>
                <td>{r.fullName}</td>
                <td title={r.sujet} style={{maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    {r.sujet}
                </td>
                <td>{r.laboratoire}</td>
                <td className="fw-bold">{r.moyenneGenerale ? r.moyenneGenerale.toFixed(2) : "-"}</td>
                <td>
                {r.publier ? (
                    <Badge bg="success">Publié</Badge>
                ) : (
                    <Badge bg="warning" text="dark">Non Publié</Badge>
                )}
                </td>
            </tr>
            ))}
        </tbody>
        </Table>
    </div>
  );
}