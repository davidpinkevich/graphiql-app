import { useState } from 'react';

import AuthNav from '../../components/AuthNav/AuthNav';
import SignInForm from '../../components/SingInForm/SignInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import './authorization.scss';

function Authorization() {
  const [auth, setAuth] = useState<'signin' | 'signup'>('signin');

  const onChangeAuth = (auth: 'signin' | 'signup'): void => {
    setAuth(auth);
  };

  const currentForm = auth === 'signin' ? <SignInForm /> : <SignUpForm />;
  return (
    <section className="auth">
      <div className="auth__container">
        <div className="auth__view">
          <AuthNav auth={auth} onChangeAuth={onChangeAuth} />
          {currentForm}
        </div>
      </div>
    </section>
  );
}

export default Authorization;
