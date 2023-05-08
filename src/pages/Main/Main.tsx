import './Main.scss';
import React, { Suspense } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CustomLoader from '../../components/Loader/Loader';

const Docs = React.lazy(() => import('../../components/Docs/Docs'));

function Main() {
  return (
    <div className="graphql-container">
      {/* Потом переделать */}
      <Sidebar />
      <Suspense fallback={<CustomLoader />}>
        <Docs />
      </Suspense>
    </div>
  );
}

export default Main;
