import './Sidebar.scss';
import docsLogo from '/icons/book.svg';
import { useAppDispatch } from '../../hooks';
import { toggleOpen } from '../../redux/slices/docs';

function Sidebar() {
  const dispatch = useAppDispatch();

  return (
    <div className="graphql-sidebar">
      <div className="button doc-btn" onClick={() => dispatch(toggleOpen())}>
        <img src={docsLogo} alt="docs logo" width="40px" height="40px" />
      </div>
    </div>
  );
}

export default Sidebar;
