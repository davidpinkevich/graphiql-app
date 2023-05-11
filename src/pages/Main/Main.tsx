import './Main.scss';
import Editor from '../../components/Editor/Editor';
import React, { ComponentType, Suspense } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CustomLoader from '../../components/Loader/Loader';
import Response from '../../components/Response/Response';

const Docs = React.lazy(
  () => import('../../components/Docs/Docs') as Promise<{ default: ComponentType }>
);

function Main() {
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
