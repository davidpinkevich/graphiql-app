import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import AuthNav from '../../components/AuthNav/AuthNav';
import SignInForm from '../../components/SingInForm/SignInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import './authorization.scss';

function Authorization() {
  const auth = useSelector((state: RootState) => state.auth.auth);

  const currentForm = auth === 'signin' ? <SignInForm /> : <SignUpForm />;
  return (
    <section className="auth">
      <div className="auth__container">
        <div className="auth__view">
          <AuthNav />
          {currentForm}
        </div>
      </div>
    </section>
  );
}

export default Authorization;
