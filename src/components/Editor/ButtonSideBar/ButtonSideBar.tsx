import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../../types';
import { hiddenSidebar } from '../../../redux/slices/editor';
import svgUp from '../../../assets/up.svg';
import svgDown from '../../../assets/down.svg';

function ButtonSideBar() {
  const { hiddenSide } = useSelector((state: TStore) => state.editor);
  const dispatch = useDispatch();

  return (
    <button className="editor__sidebar-btn" onClick={() => dispatch(hiddenSidebar(!hiddenSide))}>
      {hiddenSide ? <img src={svgDown} /> : <img src={svgUp} />}
    </button>
  );
}

export default ButtonSideBar;
