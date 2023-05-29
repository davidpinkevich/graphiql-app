import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Welcome from '../../pages/Welcome/Welcome';
import Authorization from '../../pages/Authorization/Authorization';
import Main from '../../pages/Main/Main';
import NotFound from '../../pages/NotFound/NotFound';
import './global.css';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Welcome />} />
            <Route path="authorization" element={<Authorization />} />
            <Route path="main" element={<Main />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
