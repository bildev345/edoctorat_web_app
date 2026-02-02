import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

const CedHeader = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="bg-primary text-white py-3 shadow-sm">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col">
                        <h1 className="h4 mb-0 fw-bold">Centre d'Études Doctorales</h1>
                    </div>
                    <div className="col-auto">
                        {user && (
                            <div className="d-flex align-items-center gap-3">
                                <span className="fw-medium">
                                    {user.nom} {user.prenom}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-light btn-sm"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export { CedHeader };
