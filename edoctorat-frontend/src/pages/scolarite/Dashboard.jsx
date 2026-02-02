import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import { useScolariteDashboardStats } from "../../hooks/scolarite/useDashboard";

function getWeekDays() {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function ScolariteDashboard() {
  const navigate = useNavigate();
  const { data: stats, isLoading } = useScolariteDashboardStats();

  const todayLabel = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const week = useMemo(() => getWeekDays(), []);
  const today = new Date().toDateString();

  return (
    <div className="container-fluid">
      <div className="row g-4" style={{ minHeight: "calc(100vh - 86px)" }}>
        {/* LEFT */}
        <div className="col-lg-7">
          <div className="mb-3">
            <h1 className="display-6 mb-1">Bonjour</h1>
            <div className="text-muted">{todayLabel}</div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <button
                type="button"
                className="dashboard-kpi-card w-100 text-start"
                onClick={() => navigate("/scolarite/inscriptions")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="kpi-label">Inscriptions</div>
                    <div className="kpi-value">{isLoading ? "…" : stats?.inscriptionsCount ?? 0}</div>
                    <div className="kpi-link">Gérer les inscriptions →</div>
                  </div>

                  <div className="kpi-icon">
                    <ClipboardCheck size={26} />
                  </div>
                </div>
              </button>
            </div>

            <div className="col-md-6 d-none d-md-block" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-5 d-flex">
          <div className="calendar-card w-100">
            <div className="calendar-head">
              <div>
                <div className="calendar-title">Calendrier</div>
                <div className="calendar-sub">Semaine en cours</div>
              </div>
            </div>

            <div className="calendar-grid-tiles">
              {week.map((d) => {
                const active = d.toDateString() === today;
                const dayName = d.toLocaleDateString("fr-FR", { weekday: "short" });
                const dayNum = d.getDate();

                return (
                  <div key={d.toISOString()} className={`calendar-tile ${active ? "active" : ""}`}>
                    <div className="tile-dow">{dayName}.</div>
                    <div className="tile-num">{dayNum}</div>
                  </div>
                );
              })}
            </div>

            <div className="calendar-footer-hint">
              <span className="text-muted small">
                Double-cliquez sur une inscription pour valider/refuser.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
