import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App/App';
import CustomLoader from './components/Loader/Loader';
import store from './redux/store';

import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback={<CustomLoader />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
