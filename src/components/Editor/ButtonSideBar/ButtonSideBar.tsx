import { TButtonSideBar } from '../../../types';
import svgUp from '../../../assets/up.svg';
import svgDown from '../../../assets/down.svg';

function ButtonSideBar(props: TButtonSideBar) {
  return (
    <button className="editor__sidebar-btn" onClick={props.hiddenSide}>
      {props.hiiden ? <img src={svgDown} /> : <img src={svgUp} />}
    </button>
  );
}

export default ButtonSideBar;
