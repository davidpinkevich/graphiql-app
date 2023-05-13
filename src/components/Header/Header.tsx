import './Header.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
        <button className="button signup-btn">{t('auth.signup')}</button>
        <button className="button signin-btn">{t('auth.signin')}</button>
        <button className="button signout-btn">{t('auth.signout')}</button>
      </div>
    </header>
  );
}

export default Header;
