import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <nav>
        <NavLink to=".">Welcome</NavLink>
        <NavLink to="authorization">Authorization</NavLink>
        <NavLink to="main">Main</NavLink>
      </nav>
      <Footer />
    </>
  );
}

export default MainLayout;
