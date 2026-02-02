import { Search, X } from "lucide-react";

export default function FiltersBar({
  search,
  onSearchChange,
  right,
  onReset,
  placeholder = "Rechercher...",
}) {
  return (
    <div className="card card-clean mb-3">
      <div className="card-body d-flex flex-column flex-md-row gap-2 align-items-md-center justify-content-between">
        <div className="input-group" style={{ maxWidth: 520 }}>
          <span className="input-group-text bg-white">
            <Search size={18} />
          </span>
          <input
            className="form-control"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={onReset} title="Reset">
            <X size={16} />
          </button>
        </div>

        {/* zone droite (ex: filtre formation doctorale, boutons etc.) */}
        <div className="d-flex gap-2 align-items-center">{right}</div>
      </div>
    </div>
  );
}
