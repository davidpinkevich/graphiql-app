import './Header.scss';
import { useEffect, useState } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header__actions">
        <button className="button signup-btn">Sign Up</button>
        <button className="button signin-btn">Sign In</button>
        <button className="button signout-btn">Sign Out</button>
      </div>
    </header>
  );
}

export default Header;
