import './Main.scss';
import React, { ComponentType, Suspense } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CustomLoader from '../../components/Loader/Loader';

const Docs = React.lazy(
  () => import('../../components/Docs/Docs') as Promise<{ default: ComponentType }>
);

function Main() {
  return (
    <div className="graphql-container">
      {/* Потом переделать */}
      <Sidebar />
      {/* Пока не понятно, где нужно отображать fallback,
        поэтому он отображается возле сайдбара пока. */}
      <Suspense fallback={<CustomLoader />}>
        <Docs />
      </Suspense>
    </div>
  );
}

export default Main;
