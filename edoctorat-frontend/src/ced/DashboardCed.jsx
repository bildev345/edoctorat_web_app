import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Importi axios instance dyalk hna
// Ila 3ndk context dyal Auth, sta3mlo, sinon n9dro n-simuliw smiya
import { useAuth } from "../../context/AuthContext";
import { FileText, Users, Gavel, GraduationCap, BarChart3, LayoutDashboard } from "lucide-react";

// Fonction bach njibo ayam l-osbou3 (nefs logique)
function getWeekDays() {
    const now = new Date();
    const day = now.getDay(); // 0 = Dimanche
    const diffToMonday = (day === 0 ? -6 : 1) - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);

    return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
}

export const DashboardCed = () => {
    const navigate = useNavigate();
    // const { user } = useAuth(); // Ila kheddam b AuthContext

    // State bach nkhzno les stats
    const [stats, setStats] = useState({
        sujetsCount: 0,
        candidatsCount: 0,
        commissionsCount: 0,
        inscritsCount: 0,
        resultatsCount: 0
    });
    const [loading, setLoading] = useState(true);

    // 1. Fetching Data (Direct bla hook custom)
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Hna dir l-endpoint li 3ndk f backend, matalan: /ced/dashboard-stats
                // Ila mazal ma 3ndkch, ghir khalli hadchi bach y-testi l-affichage
                const response = await api.get('/ced/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Erreur chargement stats:", error);
                // Fallback data ila kan erreur (ghir bach yban design zwin)
                setStats({
                    sujetsCount: 12,
                    candidatsCount: 45,
                    commissionsCount: 3,
                    inscritsCount: 28,
                    resultatsCount: 0
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Date d lyoum
    const todayLabel = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const week = useMemo(() => getWeekDays(), []);
    const today = new Date().toDateString();

    // 2. Les Cards dyal CED (Routes mbddlin 3la Prof)
    const cards = [
        { label: "Sujets de Thèse", value: stats.sujetsCount, Icon: FileText, to: "/ced/sujets" },
        { label: "Postulants", value: stats.candidatsCount, Icon: Users, to: "/ced/candidats" },
        { label: "Commissions", value: stats.commissionsCount, Icon: Gavel, to: "/ced/commissions" },
        { label: "Inscrits Finaux", value: stats.inscritsCount, Icon: GraduationCap, to: "/ced/inscrits" },
        { label: "Résultats", value: stats.resultatsCount, Icon: BarChart3, to: "/ced/resultats" },
    ];

    return (
        <div className="container-fluid py-4"> {/* Zedt py-4 chwiya d l-espace */}
            <div className="row g-4" style={{ minHeight: "calc(100vh - 86px)" }}>

                {/* === GAUCHE : STATS === */}
                <div className="col-lg-7">
                    <div className="mb-4">
                        <h1 className="display-6 fw-bold text-dark mb-1">
                            Espace Directeur CED
                        </h1>
                        <div className="text-muted text-capitalize">{todayLabel}</div>
                    </div>

                    <div className="row g-3">
                        {cards.map(({ label, value, Icon, to }, index) => (
                            <div className="col-md-6" key={index}>
                                <button
                                    type="button"
                                    className="dashboard-kpi-card w-100 text-start" // Class CSS li 3titini f index.css
                                    onClick={() => navigate(to)}
                                >
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="kpi-label">{label}</div>
                                            <div className="kpi-value my-2">
                                                {loading ? <span className="spinner-border spinner-border-sm"/> : value}
                                            </div>
                                            <div className="kpi-link small text-primary">
                                                Gérer les {label.toLowerCase()} <i className="bi bi-arrow-right ms-1"></i>
                                            </div>
                                        </div>

                                        <div className="kpi-icon p-3 rounded-circle bg-light text-primary">
                                            <Icon size={28} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* === DROITE : CALENDRIER === */}
                <div className="col-lg-5 d-flex">
                    <div className="calendar-card w-100 p-4 bg-white rounded-4 shadow-sm border">
                        {/* Header Calendrier */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h5 className="fw-bold mb-0 text-dark">Calendrier</h5>
                                <small className="text-muted">Semaine en cours</small>
                            </div>
                            <div className="p-2 bg-light rounded-circle text-primary">
                                <LayoutDashboard size={20} />
                            </div>
                        </div>

                        {/* GRILLE 7 JOURS */}
                        <div className="calendar-grid-tiles" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '10px' }}>
                            {week.map((d) => {
                                const isToday = d.toDateString() === today;
                                const dayName = d.toLocaleDateString("fr-FR", { weekday: "short" });
                                const dayNum = d.getDate();

                                return (
                                    <div
                                        key={d.toISOString()}
                                        className={`calendar-tile d-flex flex-column align-items-center justify-content-center p-3 rounded-3 border transition-all ${
                                            isToday ? "bg-dark text-white shadow" : "bg-white text-dark"
                                        }`}
                                        style={{ height: '100px', cursor: 'pointer', transition: '0.2s' }}
                                    >
                                        <div className={`text-uppercase small mb-1 ${isToday ? 'text-white-50' : 'text-muted'}`}>
                                            {dayName}.
                                        </div>
                                        <div className="fs-3 fw-bold">{dayNum}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer Calendrier */}
                        <div className="mt-4 pt-3 border-top">
                            <div className="d-flex align-items-start gap-2">
                                <i className="bi bi-info-circle text-primary mt-1"></i>
                                <p className="text-muted small mb-0">
                                    Cet aperçu vous permet de suivre l'avancement des inscriptions et des commissions doctorales pour cette semaine.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}