import './Main.scss';
import Editor from '../../components/Editor/Editor';
import React, { ComponentType, Suspense, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CustomLoader from '../../components/Loader/Loader';
import Response from '../../components/Response/Response';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const Docs = React.lazy(
  () => import('../../components/Docs/Docs') as Promise<{ default: ComponentType }>
);

function Main() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) navigate('/authorization');
  }, [user, loading]);

  return (
    <div className="graphql-container">
      <Sidebar />
      <Suspense fallback={<CustomLoader />}>
        <Docs />
      </Suspense>
      <Editor />
      <Response />
    </div>
  );
}

export default Main;
