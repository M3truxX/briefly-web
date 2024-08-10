import './navBar.css';
import logo from '../../img/logo.png';

function NavBar() {

  return (
    <div className="menu">
      <a href="#cover" className="brand">
        <img id="logo" src={logo} alt="Logo" />
        <h3 id="logo-text">Briefly</h3>
      </a>
    </div>
  )
}

export default NavBar;