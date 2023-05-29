import { useSelector } from 'react-redux';
import { TStore } from '../../types';
import './TimerResponse.scss';

function TimerResponse() {
  const { timeResponse, loadingData } = useSelector((state: TStore) => state.editor);
  return (
    <div className="editor__timer">
      {timeResponse && loadingData === 'error' ? (
        <div className="editor__timer-pass">
          <span>PASS</span>
          <span>{timeResponse}ms</span>
        </div>
      ) : timeResponse && loadingData === 'start' ? (
        <div className="editor__timer-hit">
          <span>HIT</span>
          <span>{timeResponse}ms</span>
        </div>
      ) : null}
    </div>
  );
}

export default TimerResponse;
