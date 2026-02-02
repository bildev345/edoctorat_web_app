import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Form, Spinner, Badge, Alert } from 'react-bootstrap';
import { useCalendrier, useUpdateCalendrier } from '../../hooks/directeurPole/useCalendrier';

export default function CalendrierPole() {
  const { data, isLoading, isError } = useCalendrier();
  const { mutate: updateCalendrier, isLoading: isUpdating, isSuccess, isError: isErrorUpdating, data: responseData, reset } = useUpdateCalendrier();
  const [selectedDates, setSelectedDates] = useState({});
  const [savingId, setSavingId] = useState(null);

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (isSuccess || isErrorUpdating) {
      const timer = setTimeout(() => {
        reset(); // Reset mutation state
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isErrorUpdating, reset]);

  const handleChange = (id, field, value) => {
    setSelectedDates(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSave = async (cal) => {
    setSavingId(cal.id);

    const dates = selectedDates[cal.id] || {};
    const rawStart = dates.dateDebut || cal.dateDebut;
    const rawEnd = dates.dateFin || cal.dateFin;

    const formatDateTime = (dateStr) => {
      if (!dateStr) return null;
      return dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`;
    };

    updateCalendrier(
      {
        id: cal.id,
        action: cal.action,
        dateDebut: formatDateTime(rawStart),
        dateFin: formatDateTime(rawEnd)
      },
      {
        onSettled: () => {
          setSavingId(null); // Stop loading after mutation completes
        }
      }
    );
  };

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
          Impossible de charger le calendrier.
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Calendrier du Pôle</h2>
          <p className="text-muted">Gérez les dates clés et les échéances de la session de doctorat.</p>
        </div>
      </div>

      {/* Alert Section - Fixed Position */}
      {(isSuccess || isErrorUpdating) && (
        <Alert 
          variant={isSuccess ? 'success' : 'danger'} 
          dismissible 
          onClose={() => reset()}
          className="mb-3"
        >
          {isSuccess ? responseData?.message || 'Calendrier mis à jour avec succès' : 'Erreur lors de la modification'}
        </Alert>
      )}

      {/* Content Card */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3 border-bottom">
          <h5 className="mb-0 text-primary">
            <i className="bi bi-calendar-range me-2"></i>
            Planning des Événements
          </h5>
        </Card.Header>

        <div className="table-responsive">
          <Table striped hover className="mb-0 align-middle">
            <thead className="bg-light text-secondary">
              <tr>
                <th style={{ width: '30%' }}>Événement / Action</th>
                <th style={{ width: '25%' }}>Date de Début</th>
                <th style={{ width: '25%' }}>Date de Fin</th>
                <th style={{ width: '10%' }} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(cal => (
                <tr key={cal.id}>
                  {/* 1. Action Name & Scope */}
                  <td>
                    <div className="fw-bold text-dark">{cal.action}</div>
                    {cal.pour ? (
                      <Badge bg="info" className="mt-1">{cal.pour}</Badge>
                    ) : (
                      <Badge bg="secondary" className="mt-1">Général</Badge>
                    )}
                  </td>

                  {/* 2. Date Debut */}
                  <td>
                    <Form.Control
                      type="date"
                      className="border-secondary-subtle"
                      defaultValue={cal.dateDebut ? cal.dateDebut.slice(0, 10) : ''}
                      onChange={e => handleChange(cal.id, 'dateDebut', e.target.value)}
                    />
                  </td>

                  {/* 3. Date Fin */}
                  <td>
                    <Form.Control
                      type="date"
                      className="border-secondary-subtle"
                      defaultValue={cal.dateFin ? cal.dateFin.slice(0, 10) : ''}
                      onChange={e => handleChange(cal.id, 'dateFin', e.target.value)}
                    />
                  </td>

                  {/* 4. Save Button */}
                  <td className="text-center">
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="d-flex align-items-center justify-content-center mx-auto"
                      onClick={() => handleSave(cal)}
                      disabled={savingId === cal.id}
                      style={{ width: '40px', height: '38px' }}
                    >
                      {savingId === cal.id ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      ) : (
                        <i className="bi bi-check-lg fs-5"></i>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
}