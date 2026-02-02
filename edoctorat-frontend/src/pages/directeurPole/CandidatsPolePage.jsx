import { useState } from "react";
import { Container, Card, Pagination, Spinner, Alert, Badge } from "react-bootstrap";
import CandidatsPoleTable from "../../components/directeurPole/CandidatsPoleTable";
import { useCandidatsPole } from "../../hooks/directeurPole/useCandidatsPole";

export default function CandidatsPolePage() {
  const [page, setPage] = useState(0);

  // Fetch data here so we can control pagination
  const { data, isLoading, isError } = useCandidatsPole(page);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Erreur de chargement</Alert.Heading>
          <p>Impossible de récupérer la liste des candidats.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="mb-1">Candidats Postulants</h2>
            <p className="text-muted">Vue d'ensemble de tous les candidats du pôle.</p>
        </div>
        <Badge bg="secondary" className="px-3 py-2 fs-6">
            Total: {data?.totalElements || 0}
        </Badge>
      </div>

      {/* Content Card */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <CandidatsPoleTable data={data} />
        </Card.Body>

        {/* Pagination Footer */}
        {data && data.totalPages > 1 && (
            <Card.Footer className="bg-white py-3 d-flex justify-content-center">
                <Pagination className="mb-0">
                    <Pagination.Prev 
                        onClick={() => setPage((p) => Math.max(0, p - 1))} 
                        disabled={page === 0} 
                    />
                    <Pagination.Item active>{page + 1}</Pagination.Item>
                    <Pagination.Next 
                        onClick={() => setPage((p) => p + 1)} 
                        disabled={data.last} 
                    />
                </Pagination>
            </Card.Footer>
        )}
      </Card>
    </Container>
  );
}