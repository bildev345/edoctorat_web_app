import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDashboardStats } from "../../hooks/professeur/useDashboard";
import { FileText, Users, Gavel, GraduationCap, BarChart3 } from "lucide-react";

function getWeekDays() {
  const now = new Date();
  const day = now.getDay(); // 0 dim
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats();

  const fullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.nom && user?.prenom
      ? `${user.nom} ${user.prenom}`
      : "—";

  const todayLabel = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const week = useMemo(() => getWeekDays(), []);
  const today = new Date().toDateString();

  const cards = [
    { label: "Sujets", value: stats?.sujetsCount ?? 0, Icon: FileText, to: "/professeur/sujets" },
    { label: "Candidats", value: stats?.candidatsCount ?? 0, Icon: Users, to: "/professeur/candidats" },
    { label: "Commissions", value: stats?.commissionsCount ?? 0, Icon: Gavel, to: "/professeur/commissions" },
    { label: "Inscrits", value: stats?.inscriptionsCount ?? 0, Icon: GraduationCap, to: "/professeur/inscrits" },
    { label: "Résultats", value: stats?.resultatsCount ?? 0, Icon: BarChart3, to: "/professeur/resultats" },
  ];

  return (
    <div className="container-fluid">
      <div className="row g-4" style={{ minHeight: "calc(100vh - 86px)" }}>
        {/* LEFT */}
        <div className="col-lg-7">
          <div className="mb-3">
            <h1 className="display-6 mb-1">Bonjour {fullName}</h1>
            <div className="text-muted">{todayLabel}</div>
          </div>

          <div className="row g-3">
            {cards.map(({ label, value, Icon, to }) => (
              <div className="col-md-6" key={label}>
                <button
                  type="button"
                  className="dashboard-kpi-card w-100 text-start"
                  onClick={() => navigate(to)}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="kpi-label">{label}</div>
                      <div className="kpi-value">{isLoading ? "…" : value}</div>
                      <div className="kpi-link">Voir {label.toLowerCase()} →</div>
                    </div>

                    <div className="kpi-icon">
                      <Icon size={26} />
                    </div>
                  </div>
                </button>
              </div>
            ))}

            {/* pour équilibrer (5 cards) */}
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

            {/* ✅ GRILLE 7 jours comme ton dessin */}
            <div className="calendar-grid-tiles">
              {week.map((d) => {
                const active = d.toDateString() === today;
                const dayName = d.toLocaleDateString("fr-FR", { weekday: "short" });
                const dayNum = d.getDate();

                return (
                  <div
                    key={d.toISOString()}
                    className={`calendar-tile ${active ? "active" : ""}`}
                  >
                    <div className="tile-dow">{dayName}.</div>
                    <div className="tile-num">{dayNum}</div>
                  </div>
                );
              })}
            </div>

            {/* espace en bas (optionnel) */}
            <div className="calendar-footer-hint">
              <span className="text-muted small">
                Cliquez sur une section à gauche pour gérer vos données.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
