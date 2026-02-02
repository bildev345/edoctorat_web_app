import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useCandidats } from "../../../hooks/professeur/useCandidats";

const PAGE_SIZE = 10;

export default function ListCandidats() {
  const { data, isLoading, isError, error } = useCandidats();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const list = Array.isArray(data) ? data : [];

  const getSujetTitre = (c) =>
    c?.titreSujet ??
    c?.sujetTitre ??
    c?.titre_sujet ??
    c?.sujet?.titre ??
    "-";

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return list;

    return list.filter((c) => {
      const hay = [
        c?.cne,
        c?.nom,
        c?.prenom,
        getSujetTitre(c),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(s);
    });
  }, [list, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(page, 1), totalPages);
  const start = (pageSafe - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  if (isLoading) return <div className="alert alert-info">Chargement...</div>;
  if (isError)
    return (
      <div className="alert alert-danger">
        Erreur lors du chargement
        <div className="small mt-2 text-muted">
          {error?.message || error?.response?.data?.message || ""}
        </div>
      </div>
    );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Mes Candidats</h3>

        <div className="position-relative" style={{ width: 380 }}>
          <Search
            size={18}
            className="position-absolute"
            style={{ left: 10, top: 10, color: "#888" }}
          />
          <input
            className="form-control ps-5"
            placeholder="Rechercher (CNE, nom, sujet...)"
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
              <th style={{ width: 180 }}>CNE</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Sujet</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  Aucun candidat
                </td>
              </tr>
            ) : (
              rows.map((c) => (
                <tr key={String(c.candidatId ?? c.cne)}>
                  <td>
                    <Link
                      to={`/professeur/candidats/${c.candidatId}`}
                      className="text-decoration-none fw-semibold"
                    >
                      {c.cne}
                    </Link>
                  </td>
                  <td>{c.nom}</td>
                  <td>{c.prenom}</td>
                  <td className="fw-semibold">{getSujetTitre(c)}</td>
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
