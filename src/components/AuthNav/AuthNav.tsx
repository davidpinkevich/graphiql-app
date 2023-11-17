import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store';
import { onAuthChange } from '../../redux/slices/auth';

import './authNav.scss';
import { useTranslation } from 'react-i18next';

function AuthNav() {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch<AppDispatch>();

  const signInActive =
    auth === 'signin' ? 'auth-nav__item auth-nav__item_active' : 'auth-nav__item';
  const signUpActive =
    auth === 'signup' ? 'auth-nav__item auth-nav__item_active' : 'auth-nav__item';

  const { t } = useTranslation();

  return (
    <nav className="auth-nav">
      <ul className="auth-nav__list">
        <li className={signInActive} onClick={() => dispatch(onAuthChange('signin'))}>
          {t('auth.signin')}
        </li>
        <li className={signUpActive} onClick={() => dispatch(onAuthChange('signup'))}>
          {t('auth.signup')}
        </li>
      </ul>
    </nav>
  );
}

export default AuthNav;
