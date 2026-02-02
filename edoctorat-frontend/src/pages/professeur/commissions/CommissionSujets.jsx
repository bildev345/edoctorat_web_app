import { Link, useParams } from "react-router-dom";
import { FileDown } from "lucide-react";
import { useSujetsCommission } from "../../../hooks/professeur/useCommissions";
import { downloadPvPdf } from "../../../api/professeurApi/commissions";

export default function CommissionSujets() {
  const { commissionId } = useParams();
  const { data, isLoading, isError, error } = useSujetsCommission(commissionId);

  const sujets = Array.isArray(data) ? data : [];

  const handleDownload = async (sujetId) => {
    try {
      const blob = await downloadPvPdf({ commissionId, sujetId });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pv_sujet_${sujetId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Erreur téléchargement PV");
    }
  };

  if (isLoading) return <div className="alert alert-info">Chargement...</div>;

  if (isError)
    return (
      <div className="alert alert-danger">
        Erreur
        <div className="small mt-2 text-muted">{error?.response?.data?.message || error?.message || ""}</div>
      </div>
    );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* ✅ PAS d'ID dans le titre */}
        <h3 className="m-0">Sujets</h3>

        <Link to="/professeur/commissions" className="btn btn-outline-secondary btn-sm">
          Retour
        </Link>
      </div>

      <div className="table-responsive bg-white border rounded">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Titre</th>
              <th style={{ width: 220 }}>Candidats</th>
              <th style={{ width: 160 }}>PV</th>
            </tr>
          </thead>

          <tbody>
            {sujets.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted py-4">
                  Aucun sujet
                </td>
              </tr>
            ) : (
              sujets.map((s, idx) => {
                // ✅ évite undefined : certains backends renvoient id, d'autres sujetId
                const sujetId = s?.id ?? s?.sujetId;

                if (!sujetId) {
                  return (
                    <tr key={`noid-${idx}`}>
                      <td className="text-danger">Sujet sans ID (erreur data)</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  );
                }

                return (
                  <tr key={sujetId}>
                    <td className="fw-semibold">{s?.titre || "-"}</td>

                    <td>
                      <Link className="btn btn-sm btn-primary" to={`/professeur/commissions/${commissionId}/sujets/${sujetId}/candidats`}>
                        Voir candidats
                      </Link>
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleDownload(sujetId)}>
                        <FileDown size={16} className="me-2" />
                        PV
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
