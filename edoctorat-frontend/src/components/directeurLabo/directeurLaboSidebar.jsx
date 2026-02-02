import { NavLink } from "react-router";
import { LISTE_SUJETS_ROUTE, LIST_COMMISSIONS_ROUTE, PRESELECTION_ENTRETIENS_ROUTE, RESULTATS_ENTRETIEN_ROUTE, LIST_CANDIDAT_LABO_ROUTE } from "../../routes/constants";

export const DirecteurLaboSidebar = () => {
  const activeStyle = {
        fontWeight : "bold",
        textDecoration : "underline",
  };
  return (
    <aside className="bg-light border-end" style={{width: '250px'}}>
      <nav className="p-3">
        <ul className="list-unstyled">
          <li className="mb-2">
            <NavLink 
                     className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                     to="."
                     end
                     style={({isActive}) => isActive ? activeStyle : null}
                >
                Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
                     className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                     to={LISTE_SUJETS_ROUTE}
                     style={({isActive}) => isActive ? activeStyle : null}
                >
                Sujets
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
                     className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                     to={LIST_CANDIDAT_LABO_ROUTE}
                     style={({isActive}) => isActive ? activeStyle : null}
                >
                Candidats
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
                     className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                     to={LIST_COMMISSIONS_ROUTE}
                     style={({isActive}) => isActive ? activeStyle : null}
                >
                Commissisons
            </NavLink>
          </li>
          <li className="mb-2">
             <NavLink 
                     className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                     to={PRESELECTION_ENTRETIENS_ROUTE}
                     style={({isActive}) => isActive ? activeStyle : null}
                >
                Présélection / Convocation
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
                     className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                     to={RESULTATS_ENTRETIEN_ROUTE}
                     style={({isActive}) => isActive ? activeStyle : null}
                >
                Résultats
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </aside>
  );
}