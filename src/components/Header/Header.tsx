import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../redux/store';
import { onAuthChange } from '../../redux/slices/auth';

import './Header.scss';

function Header() {
  const dispatch = useDispatch<AppDispatch>();

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

  const navigate = useNavigate();

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header__actions">
        <button
          className="button signup-btn"
          onClick={() => {
            dispatch(onAuthChange('signup'));
            navigate('/authorization');
          }}
        >
          Sign Up
        </button>
        <button
          className="button signin-btn"
          onClick={() => {
            dispatch(onAuthChange('signin'));
            navigate('/authorization');
          }}
        >
          Sign In
        </button>
        <button className="button signout-btn">Sign Out</button>
      </div>
    </header>
  );
}

export default Header;
