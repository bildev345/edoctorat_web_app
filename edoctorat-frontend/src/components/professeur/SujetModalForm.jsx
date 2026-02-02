import { useEffect, useState } from "react";

const FORMATIONS_FIXES = [
  { id: 1, label: "Formation IA & Data (Test)" },
];

const empty = {
  titre: "",
  description: "",
  coDirecteurTexte: "",
  formationDoctoralId: 1,
};

export default function SujetModalForm({
  open,
  mode,
  initialValue,
  onClose,
  onSubmit,
  isPending,
}) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (!open) return;

    if (mode === "update" && initialValue) {
      setForm({
        titre: initialValue.titre ?? "",
        description: initialValue.description ?? "",
        coDirecteurTexte: initialValue.coDirecteurLabel ?? "",
        formationDoctoralId: initialValue.formationDoctoralId ?? 1,
      });
    } else {
      setForm(empty);
    }
  }, [mode, initialValue, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: name === "formationDoctoralId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ payload backend
    const payload = {
      titre: form.titre,
      description: form.description,
      publier: false, // pas affiché
      formationDoctoralId: form.formationDoctoralId,
      coDirecteurId: null, // texte UI seulement pour le moment
    };

    onSubmit(payload);
  };

  if (!open) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{mode === "create" ? "Ajouter un sujet" : "Modifier le sujet"}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Titre</label>
                <input className="form-control" name="titre" value={form.titre} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" rows="3" value={form.description} onChange={handleChange} required />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Co-directeur (texte)</label>
                  <input
                    className="form-control"
                    name="coDirecteurTexte"
                    value={form.coDirecteurTexte}
                    onChange={handleChange}
                    placeholder="Ex: Pr. X (optionnel)"
                  />
                  <div className="form-text">Informatif pour l’UI (pas encore lié à la BD).</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Formation doctorale</label>
                  <select
                    className="form-select"
                    name="formationDoctoralId"
                    value={form.formationDoctoralId}
                    onChange={handleChange}
                    required
                  >
                    {FORMATIONS_FIXES.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="btn btn-dark" disabled={isPending}>
                {isPending ? "..." : mode === "create" ? "Ajouter" : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
