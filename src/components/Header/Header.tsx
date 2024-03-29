import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../firebase';
import { AppDispatch } from '../../redux/store';
import { onAuthChange } from '../../redux/slices/auth';

import './Header.scss';

function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const [isScrolled, setIsScrolled] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

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

  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  const nextLanguage = i18n.language === 'en' ? 'ru' : 'en';

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header__actions">
        <div className="button language lang-btn" onClick={() => changeLanguage(nextLanguage)}>
          {nextLanguage.toUpperCase()}
        </div>
        {!user && (
          <button
            className="button signup-btn"
            onClick={() => {
              dispatch(onAuthChange('signup'));
              navigate('/authorization');
            }}
          >
            {t('auth.signup')}
          </button>
        )}
        {!user && (
          <button
            className="button signin-btn"
            onClick={() => {
              dispatch(onAuthChange('signin'));
              navigate('/authorization');
            }}
          >
            {t('auth.signin')}
          </button>
        )}
        {user && (
          <button className="button signout-btn" onClick={() => logout()}>
            {t('auth.signout')}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
