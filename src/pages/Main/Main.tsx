import './Main.scss';
import Docs from '../../components/Docs/Docs';
import Sidebar from '../../components/Sidebar/Sidebar';

function Main() {
  return (
    <div className="graphql-container">
      {/* Потом переделать */}
      <Sidebar />
      <Docs />
    </div>
  );
}

export default Main;
