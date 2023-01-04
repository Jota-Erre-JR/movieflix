import './styles1.css';
import 'bootstrap/js/dist/collapse.js';
import ButtonIcon from 'components/LogoutBtn';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-primary main-nav">
        <div className="container-fluid">
          <Link to="/" className="nav-logo-text">
            <h4>MovieFlix</h4>
          </Link>

          <ButtonIcon />

          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
