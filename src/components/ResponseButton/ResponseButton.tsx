import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../types';
import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';
import { AppDispatch } from '../../redux/store';
import {
  getData,
  clearResponse,
  changeLoading,
  getTimeResponse,
  clickRequest,
} from '../../redux/slices/editor';
import './ResponseButton.scss';

function ResponseButton() {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { loadingData, textMain, textVariables, textHeaders, postRequestClick } = useSelector(
    (state: TStore) => state.editor
  );
  const { baseUrl } = useSelector((state: TStore) => state.docs);
  useEffect(() => {
    if (postRequestClick) {
      buttonRef.current?.click();
      dispatch(clickRequest(false));
    }
  });

  function popupTooltip(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.type === 'mouseenter') {
      setTooltip(true);
    } else if (event.type === 'mouseleave') {
      setTooltip(false);
    }
  }

  async function getResponse() {
    const startTimer = new Date().getTime();
    dispatch(changeLoading());
    const request = {
      url: baseUrl,
      query: textMain,
      variables: textVariables,
      headers: textHeaders,
    };
    dispatch(clearResponse());
    await dispatch(getData(request));
    const endTimer = new Date().getTime();
    dispatch(getTimeResponse(endTimer - startTimer));
  }

  return (
    <button
      ref={buttonRef}
      disabled={loadingData === 'loading'}
      className="editor__btn"
      onClick={getResponse}
      onMouseEnter={popupTooltip}
      onMouseLeave={popupTooltip}
    >
      {tooltip && <div className="editor__btn-tooltip">Execute query (Ctrl + Enter)</div>}
      <div className="editor__btn-container">
        <img src={loadingData === 'start' || loadingData === 'error' ? play : pause} />
      </div>
    </button>
  );
}

export default ResponseButton;
