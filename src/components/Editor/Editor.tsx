import { useSelector } from 'react-redux';
import { TStore } from '../../types';
import TextArea from './TextArea/TextArea';
import ButtonSideBar from './ButtonSideBar/ButtonSideBar';
import ButtonsOptions from './ButtonsOptions/ButtonsOptions';
import TimerResponse from '../TimerResponse/TimerResponse';
import CopyButton from '../CopyButton/CopyButton';
import ResponseButton from '../ResponseButton/ResponseButton';
import './Editor.scss';

function Editor() {
  const { chooseBtn, hiddenSide, timeResponse } = useSelector((state: TStore) => state.editor);
  return (
    <>
      <section className="editor">
        <ResponseButton />
        <CopyButton />
        <div className="editor__main-container">
          <TextArea className="editor__area" mirror="main" headers={false} />
        </div>
        <div className={hiddenSide ? 'editor__sidebar sidebar__view' : 'editor__sidebar'}>
          <div className="editor__sidebar-buttons">
            {!!timeResponse && <TimerResponse />}
            <ButtonsOptions />
            <ButtonSideBar />
          </div>
          <div
            className={
              chooseBtn
                ? 'editor__variables-container'
                : 'editor__variables-container variables__hidden'
            }
          >
            <TextArea className="editor__variables" mirror="variables" headers={false} />
          </div>
          <div
            className={
              !chooseBtn
                ? 'editor__variables-container'
                : 'editor__variables-container variables__hidden'
            }
          >
            <TextArea className="editor__variables" mirror="variables" headers />
          </div>
        </div>
      </section>
    </>
  );
}

export default Editor;
