import React, { useState } from "react";
import { Spinner, Alert, Button, Container, Card, Pagination, Badge } from "react-bootstrap";
import InscriptionsTable from "../../components/directeurPole/InscriptionsTable"; // See component below
import { useInscriptions, useDownloadInscriptions } from "../../hooks/directeurPole/useInscriptions";

export default function InscriptionsPolePage() {
  const [page, setPage] = useState(0);
  
  // Hook specifically for fetching the "Liste Principale" (LP)
  const { data, isLoading, isError } = useInscriptions(page);
  
  // Hook for downloading the file
  const { mutate: download, isLoading: isDownloading } = useDownloadInscriptions();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Erreur de chargement</Alert.Heading>
          <p>Impossible de charger la liste des inscriptions.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="mb-1">Inscriptions Finales</h2>
            <p className="text-muted">Liste des candidats admis (Liste Principale) prêts pour l'inscription.</p>
        </div>
        
        {/* Download Button */}
        <Button 
            variant="success" 
            className="d-flex align-items-center gap-2 shadow-sm"
            onClick={() => download()}
            disabled={isDownloading || !data?.content?.length}
        >
            {isDownloading ? (
                <>
                    <Spinner size="sm" animation="border" /> Téléchargement...
                </>
            ) : (
                <>
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i> Exporter la Liste
                </>
            )}
        </Button>
      </div>

      {/* Content Card */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-primary">
                <i className="bi bi-person-check-fill me-2"></i>
                Candidats Admis
            </h5>
            <Badge bg="primary" pill>Total: {data?.totalElements || 0}</Badge>
        </Card.Header>

        <Card.Body className="p-0">
            <InscriptionsTable data={data} />
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