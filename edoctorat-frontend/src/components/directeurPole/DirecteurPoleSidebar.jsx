import { NavLink } from "react-router-dom"; // Note: usually from 'react-router-dom', not 'react-router'
import { 
    CALENDRIER_POLE_ROUTE, 
    CANDIDATS_POLE_ROUTE, 
    COMMISSIONS_POLE_ROUTE, 
    COMMUNIQUER_POLE_ROUTE, 
    INSCRIPTIONS_POLE_ROUTE, // <--- Updated import
    SUJETS_POLE_ROUTE 
} from "../../routes/constants";

export const DirecteurPoleSidebar = () => {
  const activeStyle = {
        fontWeight : "bold",
        textDecoration : "underline",
  };

  return (
    <aside className="bg-light border-end" style={{width: '250px', minHeight: '100vh'}}>
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
                  to={SUJETS_POLE_ROUTE}
                  style={({isActive}) => isActive ? activeStyle : null}
                >
                Sujets
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
                  className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                  to={CANDIDATS_POLE_ROUTE}
                  style={({isActive}) => isActive ? activeStyle : null}
                >
                Candidats
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
                  className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                  to={COMMISSIONS_POLE_ROUTE}
                  style={({isActive}) => isActive ? activeStyle : null}
                >
                Commissions
            </NavLink>
          </li>
          <li className="mb-2">
             <NavLink 
                  className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                  to={CALENDRIER_POLE_ROUTE}
                  style={({isActive}) => isActive ? activeStyle : null}
                >
                Calendrier
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink 
                  className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                  to={COMMUNIQUER_POLE_ROUTE}
                  style={({isActive}) => isActive ? activeStyle : null}
                >
                Communiquer
            </NavLink>
          </li>
          <li className="mb-2">
            {/* Updated to point to INSCRIPTIONS */}
            <NavLink 
                  className="text-decoration-none text-dark d-block p-2 rounded hover-bg-secondary"
                  to={INSCRIPTIONS_POLE_ROUTE}
                  style={({isActive}) => isActive ? activeStyle : null}
                >
                Inscriptions
            </NavLink>
          </li> 
        </ul>
      </nav>
    </aside>
  );
}