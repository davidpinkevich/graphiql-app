import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import store from './redux/store/store';
import App from './components/App/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
