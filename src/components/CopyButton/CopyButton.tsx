import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '../../types';
import copy from '../../assets/copy.svg';
import './CopyButton.scss';

function CopyButton() {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const { textMain } = useSelector((state: TStore) => state.editor);
  function copyText() {
    navigator.clipboard.writeText(textMain);
  }
  function popupTooltip(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.type === 'mouseenter') {
      setTooltip(true);
    } else if (event.type === 'mouseleave') {
      setTooltip(false);
    }
  }
  return (
    <button
      onClick={copyText}
      onMouseEnter={popupTooltip}
      onMouseLeave={popupTooltip}
      className="editor__copy"
    >
      {tooltip && <div className="editor__copy-tooltip">Copy query (Shift + Ctrl + C)</div>}
      <div className="editor__copy-container">
        <img src={copy} />
      </div>
    </button>
  );
}

export default CopyButton;
