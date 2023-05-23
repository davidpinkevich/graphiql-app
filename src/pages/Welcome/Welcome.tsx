import './Welcome.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../redux/store';
import { onAuthChange } from '../../redux/slices/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

function Welcome() {
  const dispatch = useDispatch<AppDispatch>();
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      Welcome to GraphQL
      <div className="header__actions">
        {!user && (
          <button
            className="button"
            onClick={() => {
              dispatch(onAuthChange('signup'));
              navigate('/authorization');
            }}
          >
            Sign Up
          </button>
        )}
        {!user && (
          <button
            className="button"
            onClick={() => {
              dispatch(onAuthChange('signin'));
              navigate('/authorization');
            }}
          >
            Sign In
          </button>
        )}
        {user && (
          <button className="button" onClick={() => navigate('/main')}>
            Go to Main Page
          </button>
        )}
      </div>
    </div>
  );
}

export default Welcome;
