import { useState } from "react";
import { Table, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { useCommissionsPole } from "../../hooks/directeurPole/useCommissionsPole";

export default function CommissionsPolePage() {
  const [page, setPage] = useState(0);
  const size = 10; // Items per page

  const { data, isLoading, isError } = useCommissionsPole(page, size);

  if (isLoading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (isError) return <Alert variant="danger">Erreur lors du chargement des commissions.</Alert>;

  return (
    <div className="container-fluid p-4">
      <h3 className="mb-4">Planning des Commissions</h3>

      <div className="table-responsive shadow-sm rounded">
        <Table striped bordered hover className="mb-0 bg-white">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Lieu</th>
              <th>Sujet(s)</th>
              <th>Membres</th>
              <th>Laboratoire</th>
              <th>CED</th>
            </tr>
          </thead>
          <tbody>
            {data?.content.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Aucune commission programmée.
                </td>
              </tr>
            ) : (
              data.content.map((comm) => (
                <tr key={comm.id}>
                  <td className="align-middle" style={{ whiteSpace: "nowrap" }}>
                    {comm.date}
                  </td>
                  <td className="align-middle">{comm.heure}</td>
                  <td className="align-middle">{comm.lieu}</td>
                  
                  {/* Subject Column: Truncated if too long */}
                  <td className="align-middle">
                     <div style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis" }} title={comm.sujet}>
                        {comm.sujet || <em className="text-muted">Non défini</em>}
                     </div>
                  </td>

                  {/* Members Column: Display as badges or list */}
                  <td className="align-middle">
                    <div className="d-flex flex-wrap gap-1">
                      {comm.membres.map((membre, idx) => (
                        <Badge key={idx} bg="info" text="dark" className="fw-normal">
                          {membre}
                        </Badge>
                      ))}
                    </div>
                  </td>

                  <td className="align-middle">{comm.labo}</td>
                  <td className="align-middle">{comm.ced}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <Button
            variant="outline-primary"
            disabled={data.first}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            &laquo; Précédent
          </Button>
          <span className="fw-bold">
            Page {data.number + 1} sur {data.totalPages}
          </span>
          <Button
            variant="outline-primary"
            disabled={data.last}
            onClick={() => setPage((p) => p + 1)}
          >
            Suivant &raquo;
          </Button>
        </div>
      )}
    </div>
  );
}