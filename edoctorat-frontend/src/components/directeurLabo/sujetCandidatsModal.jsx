import { Modal, Button, Form } from "react-bootstrap";
import {useState} from "react";
export default function SujetCandidatsModal({
  show,
  sujet,
  candidats,
  onClose,
  onConfirm,
}) {
  const [selected, setSelected] = useState([]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Candidats – {sujet?.titre}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {candidats.map((c) => (
          <Form.Check
            key={c.id}
            label={`${c.cne} - ${c.nom}`}
            onChange={(e) => {
              setSelected((prev) =>
                e.target.checked
                  ? [...prev, c.id]
                  : prev.filter((id) => id !== c.id)
              );
            }}
          />
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button
          disabled={selected.length === 0}
          onClick={() => onConfirm(selected)}
        >
          Valider
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
