import './styles1.css';
import history from 'util/history';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import { AuthContext } from 'AuthContext';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <>
      <nav className="navbar bg-primary main-nav">
        <Link to="/movies" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>

        {authContextData.authenticated ? (
          <div className="logout-button">
            <a href="#logout" onClick={handleLogoutClick}>
              SAIR
            </a>
          </div>
        ) : undefined}
      </nav>
    </>
  );
};

export default Navbar;
