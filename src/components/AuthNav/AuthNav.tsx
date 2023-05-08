import './authNav.scss';

type TAuthNavProps = {
  auth: 'signin' | 'signup';
  onChangeAuth: (auth: 'signin' | 'signup') => void;
};

function AuthNav({ auth, onChangeAuth }: TAuthNavProps) {
  const signInActive =
    auth === 'signin' ? 'auth-nav__item auth-nav__item_active' : 'auth-nav__item';
  const signUpActive =
    auth === 'signup' ? 'auth-nav__item auth-nav__item_active' : 'auth-nav__item';

  return (
    <nav className="auth-nav">
      <ul className="auth-nav__list">
        <li className={signInActive} onClick={() => onChangeAuth('signin')}>
          SIGN IN
        </li>
        <li className={signUpActive} onClick={() => onChangeAuth('signup')}>
          SIGN UP
        </li>
      </ul>
    </nav>
  );
}

export default AuthNav;
