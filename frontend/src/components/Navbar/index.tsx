import './styles1.css';
import 'bootstrap/js/dist/collapse.js';
import history from 'util/history';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TokenData, getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';

type AuthData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

const Navbar = () => {
  const [authData, setAuthData] = useState<AuthData>({ authenticated: false });

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthData({
        authenticated: false,
      });
    }
  }, []);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <>
      <nav className="navbar bg-primary main-nav">
        <div className="container-fluid">
          <Link to="/" className="nav-logo-text">
            <h4>MovieFlix</h4>
          </Link>
          {authData.authenticated ? (
            <>
              <div className="logout-button">
                <a href="#logout" onClick={handleLogoutClick}>
                  SAIR
                </a>
              </div>
            </>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
