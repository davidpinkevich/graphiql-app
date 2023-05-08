import { useState } from 'react';
import TextArea from './TextArea/TextArea';
import ButtonSideBar from './ButtonSideBar/ButtonSideBar';
import ButtonsOptions from './ButtonsOptions/ButtonsOptions';
import './Editor.scss';

function Editor() {
  const [btn, setBtn] = useState<boolean>(false);
  const [options, setOptions] = useState<boolean>(false);
  function hiddenSide() {
    setBtn(!btn);
  }
  function chooseOption(choose: boolean) {
    setOptions(choose);
    setBtn(true);
  }

  return (
    <section className="editor">
      <div className="editor__main-container">
        <TextArea className="editor__area" mirror="main" />
      </div>
      <div className={btn ? 'editor__sidebar sidebar__view' : 'editor__sidebar'}>
        <div className="editor__sidebar-buttons">
          <ButtonsOptions variables={options} chooseOption={chooseOption} />
          <ButtonSideBar hiddenSide={hiddenSide} hiiden={btn} />
        </div>
        <div
          className={
            options
              ? 'editor__variables-container'
              : 'editor__variables-container variables__hidden'
          }
        >
          <TextArea className="editor__variables" mirror="variables" />
        </div>
        <div
          className={
            !options
              ? 'editor__variables-container'
              : 'editor__variables-container variables__hidden'
          }
        >
          <TextArea className="editor__variables" mirror="variables" />
        </div>
      </div>
    </section>
  );
}

export default Editor;
