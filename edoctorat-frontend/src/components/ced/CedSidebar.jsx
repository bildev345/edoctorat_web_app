import { NavLink } from "react-router-dom";
import { CED_ROUTE, CED_SUJETS, CED_CANDIDATS, CED_COMMISSIONS, CED_RESULTATS, CED_INSCRITS } from "../../routes/constants"; 

const CedSidebar = () => {
    const BASE = CED_ROUTE; 
    const navColor = "#0b2154"; // L-couleur li khtiti

    return (
        <div className="d-flex flex-column h-100 shadow-sm" 
             style={{ 
                width: "210px", 
                backgroundColor: "#ffffff", 
                borderRight: "1px solid #e9ecef"
             }}>
            
            <ul className="nav nav-pills flex-column mb-auto p-2">
                {[
                    { to: CED_SUJETS, icon: "bi-speedometer2", label: "Sujets" },
                    { to: CED_CANDIDATS, icon: "bi-people", label: "Candidats" },
                    { to: CED_COMMISSIONS, icon: "bi-calendar-event", label: "Commissions" },
                    { to: CED_RESULTATS, icon: "bi-clipboard-check", label: "Résultats" },
                    { to: CED_INSCRITS, icon: "bi-person-check", label: "Inscrits" }
                ].map((item, idx) => (
                    <li className="nav-item" key={idx}>
                        <NavLink 
                            to={`${BASE}/${item.to}`} 
                            style={({ isActive }) => ({
                                backgroundColor: isActive ? navColor : "transparent",
                                color: isActive ? "#ffffff" : "#0b2154", // 7ta l-mots li makhdaminch b nefss l-couleur
                                borderRadius: "6px",
                                fontSize: "0.9rem",
                                transition: "all 0.2s ease"
                            })}
                            // Zidna fw-bold hna bach kolchi ykon gras
                            className={({ isActive }) => `nav-link d-flex align-items-center py-2 px-3 mb-1 fw-bold`}
                        >
                            <i className={`bi ${item.icon} me-2`} style={{ fontSize: "1.1rem" }}></i>
                            <span>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { CedSidebar };