import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <>
      <header className="header">
        <nav>
          <NavLink to=".">Welcome</NavLink>
          <NavLink to="authorization">Authorization</NavLink>
          <NavLink to="main">Main</NavLink>
        </nav>
      </header>
    </>
  );
}

export default Header;
