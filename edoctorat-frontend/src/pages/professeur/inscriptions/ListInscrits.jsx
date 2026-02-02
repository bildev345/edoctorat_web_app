import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useAllInscriptions } from "../../../hooks/professeur/useInscriptions";

const PAGE_SIZE = 10;

export default function ListInscrits() {
  const { data, isLoading, isError, error } = useAllInscriptions();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ Normalisation (au cas où certains champs arrivent avec d'autres noms)
  const normalized = useMemo(() => {
    const list = Array.isArray(data) ? data : [];
    return list.map((x) => ({
      cne: x?.cne ?? "-",
      nom: x?.nomCandidatArabe ?? x?.nom ?? "-",
      prenom: x?.prenomCandidatArabe ?? x?.prenom ?? "-",
      titre: x?.titre ?? x?.titreSujet ?? "-",
    }));
  }, [data]);

  const filtered = useMemo(() => {
    if (!search.trim()) return normalized;
    const s = search.toLowerCase();
    return normalized.filter((x) =>
      [x.cne, x.nom, x.prenom, x.titre]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s))
    );
  }, [normalized, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(page, 1), totalPages);
  const rows = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  if (isLoading) return <div className="alert alert-info">Chargement...</div>;

  if (isError)
    return (
      <div className="alert alert-danger">
        Erreur
        <div className="small mt-2 text-muted">
          {error?.response?.data?.message || error?.message || ""}
        </div>
      </div>
    );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Mes Inscrits</h3>

        <div className="position-relative" style={{ width: 320 }}>
          <Search size={18} className="position-absolute" style={{ left: 10, top: 10, color: "#888" }} />
          <input
            className="form-control ps-5"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="table-responsive bg-white border rounded">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>CNE</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Axe | Titre</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  Aucun inscrit
                </td>
              </tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={`${r.cne}-${idx}`}>
                  <td className="fw-semibold">{r.cne}</td>
                  <td>{r.nom}</td>
                  <td>{r.prenom}</td>
                  <td>{r.titre}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <small className="text-muted">
          {filtered.length} résultat(s) • Page {pageSafe}/{totalPages}
        </small>

        <div className="btn-group">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={pageSafe === 1}
            onClick={() => setPage(pageSafe - 1)}
          >
            Précédent
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={pageSafe === totalPages}
            onClick={() => setPage(pageSafe + 1)}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
