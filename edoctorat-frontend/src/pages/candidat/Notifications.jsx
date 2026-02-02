import { useEffect, useState } from "react";
import { CandidatApiService } from "../../api/candidatApi/CandidatApiService";

export const Notifications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");

        const data = await CandidatApiService.getMyNotifications();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e?.response?.data || "Erreur lors du chargement des notifications");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const label = (type) => {
    switch (type) {
      case "CONVOCATION_ENTRETIEN":
        return "Convocation à un entretien";
      case "RESULTAT_FINAL":
        return "Résultat final";
      default:
        return type || "Notification";
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="mb-0">Notifications</h3>
      </div>

      {loading && <div className="text-muted">Chargement...</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      {!loading && !err && items.length === 0 && (
        <div className="alert alert-light border">
          Aucune notification pour le moment.
        </div>
      )}

      <div className="row g-3">
        {items.map((n) => (
          <div className="col-12" key={n.id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-semibold">{label(n.type)}</div>

                    {n.sujetTitre && (
                      <div className="text-muted small mt-1">
                        Sujet : <span className="fw-medium">{n.sujetTitre}</span>
                      </div>
                    )}

                    {n.commissionId && (
                      <div className="text-muted small">
                        Commission ID : {n.commissionId}
                      </div>
                    )}
                  </div>

                  <span className="badge bg-secondary">#{n.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
