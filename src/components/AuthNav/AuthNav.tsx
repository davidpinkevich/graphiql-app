import './authNav.scss';
import { useTranslation } from 'react-i18next';

type TAuthNavProps = {
  auth: 'signin' | 'signup';
  onChangeAuth: (auth: 'signin' | 'signup') => void;
};

function AuthNav({ auth, onChangeAuth }: TAuthNavProps) {
  const signInActive =
    auth === 'signin' ? 'auth-nav__item auth-nav__item_active' : 'auth-nav__item';
  const signUpActive =
    auth === 'signup' ? 'auth-nav__item auth-nav__item_active' : 'auth-nav__item';

  const { t } = useTranslation();

  return (
    <nav className="auth-nav">
      <ul className="auth-nav__list">
        <li className={signInActive} onClick={() => onChangeAuth('signin')}>
          {t('auth.signin')}
        </li>
        <li className={signUpActive} onClick={() => onChangeAuth('signup')}>
          {t('auth.signup')}
        </li>
      </ul>
    </nav>
  );
}

export default AuthNav;
