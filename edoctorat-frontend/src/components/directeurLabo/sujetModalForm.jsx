import { Save } from "lucide-react";
import { useState } from "react";
import {useFormations} from "../../hooks/directeurLabo/useFormation";
import {useProfs} from "../../hooks/directeurLabo/useProf";
export default function RecordModal({
  onSubmit,
  onClose,
  loading,
}) {
  const [form, setForm] = useState({
    titre: "",
    description : "",
    directeurId : -1,
    coDirecteurId : "",
    formationDoctoraleId : -1
  });
  console.log(form);
  const { data : formationsData } = useFormations();
  const { data : professeursData } = useProfs();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un sujet</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={loading}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, titre: e.target.value })
                    }
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                    disabled={loading}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Directeur</label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, directeurId: e.target.value })
                    }
                    required
                    disabled={loading}
                  >
                    {
                      professeursData?.map(prof => {
                        return (
                            <option 
                                key={prof.id}
                                value={prof.id}
                            >
                              {prof.fullName}
                            </option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">CoDirecteur(optionnel)</label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, coDirecteurId: e.target.value })
                    }
                    disabled={loading}
                  >
                    <option value="">Selectionner</option>
                    {
                      professeursData?.map(prof => {
                        return (
                            <option 
                                key={prof.id}
                                value={prof.id}
                            >
                              {prof.fullName}
                            </option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Formation doctorale</label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, formationDoctoraleId: e.target.value })
                    }
                    required
                    disabled={loading}
                  >
                    {
                      formationsData?.map(formation => {
                        return (
                            <option 
                                key={formation.id}
                                value={formation.id}
                            >
                              {formation.titre}
                            </option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-2" />
                  )}
                  <Save/>
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
