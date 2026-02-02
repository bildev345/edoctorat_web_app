import { useState } from "react";
import { Alert, Spinner, Container, Card, Pagination, Button } from "react-bootstrap";
import SujetPoleTable from "../../components/directeurPole/SujetsPoleTable";
import {
  usePublierSujets,
  useSujetsPole
} from "../../hooks/directeurPole/useSujetsPole";

export default function SujetsPolePage() {
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useSujetsPole(page);
  const { mutate: publierSujets, isLoading: isPublishing, data : responseData } = usePublierSujets();
  //console.log("responseData: ", responseData);

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
          <Alert.Heading>Erreur de connexion</Alert.Heading>
          <p>Impossible de charger les sujets. Veuillez vérifier votre connexion ou réessayer plus tard.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      {/* Title Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="mb-1">Validation des Sujets</h2>
            <p className="text-muted">Examen et validation des sujets de thèse proposés.</p>
        </div>
        <div>
          <Button onClick={publierSujets} variant="outline-primary" size="sm">Publier</Button>
        </div>
      </div>

      {/* Validation Feedback */}
      {isPublishing && (
        <Alert variant="info" className="shadow-sm">
           <Spinner animation="border" size="sm" className="me-2"/> Validation du sujet en cours...
        </Alert>
      )}
      {
        responseData?.success && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>{responseData?.message ? responseData.message : "Erreur lors de la publication"}</Alert>
        )
      }

      {/* Content Card */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3 border-bottom">
            <h5 className="mb-0 text-primary">Liste des propositions</h5>
        </Card.Header>
        
        <Card.Body className="p-0">
            <SujetPoleTable
                data={data}
            />
        </Card.Body>

        {/* Pagination Footer */}
        {data && data.totalPages > 1 && (
            <Card.Footer className="bg-white py-3 d-flex justify-content-center">
                <Pagination>
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