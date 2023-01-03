import './styles1.css';
import 'bootstrap/js/dist/collapse.js';
import ButtonIcon from 'components/LogoutBtn';

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-primary main-nav">
        <div className="container-fluid">
          <a href="link" className="nav-logo-text">
            <h4>MovieFlix</h4>
          </a>

          <ButtonIcon />

          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
