import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../redux/store';
import { onAuthChange } from '../../redux/slices/auth';

import './Welcome.scss';

function Welcome() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      Welcome
      <div className="header__actions">
        <button
          className="button"
          onClick={() => {
            dispatch(onAuthChange('signup'));
            navigate('/authorization');
          }}
        >
          Sign Up
        </button>
        <button
          className="button"
          onClick={() => {
            dispatch(onAuthChange('signin'));
            navigate('/authorization');
          }}
        >
          Sign In
        </button>
        <button className="button" onClick={() => navigate('/main')}>
          Main
        </button>
      </div>
    </div>
  );
}

export default Welcome;
