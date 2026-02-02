import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCreateExamination, useGetExamination, useUpdateExamination } from "../../../hooks/professeur/useExamination";

const defaultForm = {
  noteDossier: "",
  noteEntretien: "",
  decision: "LA",
  publier: false,
  valider: false,
};

const DECISIONS = [
  { value: "LA", label: "Liste d'attente (LA)" },
  { value: "LP", label: "Liste principale (LP)" },
  { value: "ABSENT", label: "Absent" },
  { value: "REJETE", label: "Rejeté" },
];

export default function ExaminationForm() {
  const { commissionId, sujetId, candidatId } = useParams();

  const { data, isLoading, isError, error } = useGetExamination(commissionId, sujetId, candidatId);
  const createMut = useCreateExamination(commissionId, sujetId, candidatId);
  const updateMut = useUpdateExamination(commissionId, sujetId, candidatId);

  const [form, setForm] = useState(defaultForm);

  const exists = data != null; // GET peut renvoyer null si pas examiné

  useEffect(() => {
    if (data) {
      setForm({
        noteDossier: data.noteDossier ?? "",
        noteEntretien: data.noteEntretien ?? "",
        decision: data.decision ?? "LA",
        publier: !!data.publier,
        valider: !!data.valider,
      });
    } else {
      setForm(defaultForm);
    }
  }, [data]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      noteDossier: form.noteDossier === "" ? null : Number(form.noteDossier),
      noteEntretien: form.noteEntretien === "" ? null : Number(form.noteEntretien),
    };

    if (exists) updateMut.mutate(payload);
    else createMut.mutate(payload);
  };

  const saving = createMut.isPending || updateMut.isPending;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* ✅ PAS d'ID dans le titre */}
        <h3 className="m-0">Examination</h3>

        <Link to={`/professeur/commissions/${commissionId}/sujets/${sujetId}/candidats`} className="btn btn-outline-secondary btn-sm">
          Retour
        </Link>
      </div>

      {isLoading ? (
        <div className="alert alert-info">Chargement...</div>
      ) : isError ? (
        <div className="alert alert-danger">
          Erreur
          <div className="small mt-2 text-muted">{error?.response?.data?.message || error?.message || ""}</div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={onSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Note dossier</label>
                <input type="number" name="noteDossier" className="form-control" value={form.noteDossier} onChange={onChange} step="0.1" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Note entretien</label>
                <input type="number" name="noteEntretien" className="form-control" value={form.noteEntretien} onChange={onChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Décision</label>
                <select name="decision" className="form-select" value={form.decision} onChange={onChange}>
                  {DECISIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 d-flex align-items-end gap-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="publier" checked={form.publier} onChange={onChange} />
                  <label className="form-check-label">Publier</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="valider" checked={form.valider} onChange={onChange} />
                  <label className="form-check-label">Valider</label>
                </div>
              </div>

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-primary" disabled={saving}>
                  {exists ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
