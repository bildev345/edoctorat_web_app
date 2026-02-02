import { useState } from "react";

export default function CommissionFormModal({
  initialData,
  sujets,
  profs,
  onSubmit,
  onClose,
}) {
  const [form, setForm] = useState(
    initialData || {
      dateCommission: "",
      heureCommission: "",
      lieu: "",
      sujetIds: [],
      membreIds: [],
    }
  );

  const toggleSelect = (list, id) =>
    list.includes(id)
      ? list.filter((i) => i !== id)
      : [...list, id];

  return (
    <div className="modal show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Commission</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <input
              type="date"
              className="form-control mb-2"
              value={form.dateCommission}
              onChange={(e) =>
                setForm({ ...form, dateCommission: e.target.value })
              }
            />

            <input
              type="time"
              className="form-control mb-2"
              value={form.heureCommission}
              onChange={(e) =>
                setForm({ ...form, heureCommission: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Lieu"
              value={form.lieu}
              onChange={(e) =>
                setForm({ ...form, lieu: e.target.value })
              }
            />

            <h6>Sujets</h6>
            {sujets.map((s) => (
              <div key={s.id}>
                <input
                  type="checkbox"
                  checked={form.sujetIds.includes(s.id)}
                  onChange={() =>
                    setForm({
                      ...form,
                      sujetIds: toggleSelect(form.sujetIds, s.id),
                    })
                  }
                />{" "}
                {s.titre}
              </div>
            ))}

            <h6 className="mt-3">Membres</h6>
            {profs.map((p) => (
              <div key={p.id}>
                <input
                  type="checkbox"
                  checked={form.membreIds.includes(p.id)}
                  onChange={() =>
                    setForm({
                      ...form,
                      membreIds: toggleSelect(form.membreIds, p.id),
                    })
                  }
                />{" "}
                {p.nom}
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button
              className="btn btn-success"
              onClick={() => onSubmit(form)}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
