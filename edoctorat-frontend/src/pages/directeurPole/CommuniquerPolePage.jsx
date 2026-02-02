import { useState } from "react";
import { Button, Spinner, Alert, ButtonGroup } from "react-bootstrap";
import ResultatsPoleTable from "../../components/directeurPole/ResultatsPoleTable"; 
import {
  useResultatsPole,
  usePublierDecision,
  useDownloadResultats
} from "../../hooks/directeurPole/useResultatsPole";

export default function CommuniquerPolePage() {
  const [decision, setDecision] = useState("LP");
  const [page, setPage] = useState(0);
  const [showAlert, setShowAlert] = useState(null); // { type: 'success'|'danger', message: '...' }

  const { data, isLoading, isError } = useResultatsPole(decision, page);
  const { mutate: publier, isLoading: isPublishing } = usePublierDecision();
  const { mutate: download, isLoading: isDownloading } = useDownloadResultats();

  //console.log("resultats: ", data);

  const handlePublier = () => {
    if (window.confirm(`Voulez-vous vraiment publier la ${decision === 'LP' ? 'Liste Principale' : "Liste d'Attente"} ?`)) {
      publier(decision, {
        onSuccess: () => {
          setShowAlert({ 
            type: 'success', 
            message: `La liste ${decision} a été publiée avec succès.` 
          });
          setTimeout(() => setShowAlert(null), 5000);
        },
        onError: () => {
          setShowAlert({ 
            type: 'danger', 
            message: "Erreur lors de la publication." 
          });
          setTimeout(() => setShowAlert(null), 5000);
        }
      });
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Alert Banner */}
      {showAlert && (
        <Alert 
          variant={showAlert.type} 
          dismissible 
          onClose={() => setShowAlert(null)}
          className="mb-3"
        >
          {showAlert.message}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Communication des Résultats</h3>
        
        <div className="d-flex gap-2">
          <Button 
            variant="outline-secondary" 
            onClick={() => download(decision)}
            disabled={isDownloading}
          >
            {isDownloading ? <Spinner size="sm"/> : <><i className="bi bi-download"></i> Télécharger PDF</>}
          </Button>
          
          <Button 
            variant="success" 
            onClick={handlePublier} 
            disabled={isPublishing}
          >
            {isPublishing ? <Spinner size="sm"/> : <><i className="bi bi-megaphone"></i> Publier la liste</>}
          </Button>
        </div>
      </div>

      <div className="mb-3 d-flex justify-content-center">
        <ButtonGroup size="lg">
          <Button 
            variant={decision === "LP" ? "primary" : "outline-primary"} 
            onClick={() => { setDecision("LP"); setPage(0); }}
          >
            Liste Principale (LP)
          </Button>
          <Button 
            variant={decision === "LA" ? "primary" : "outline-primary"} 
            onClick={() => { setDecision("LA"); setPage(0); }}
          >
            Liste d'Attente (LA)
          </Button>
        </ButtonGroup>
      </div>

      {isLoading ? (
        <Spinner animation="border" className="d-block mx-auto mt-5" />
      ) : isError ? (
        <Alert variant="danger">Erreur lors du chargement des résultats.</Alert>
      ) : (
        <>
          <ResultatsPoleTable data={data.data} />
          
          {data && data.totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
              <Button 
                variant="outline-primary" 
                disabled={page === 0} 
                onClick={() => setPage(p => Math.max(0, p - 1))}
              >
                Précédent
              </Button>
              <span>Page {data.number + 1} sur {data.totalPages}</span>
              <Button 
                variant="outline-primary" 
                disabled={data.last} 
                onClick={() => setPage(p => p + 1)}
              >
                Suivant
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}