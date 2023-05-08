import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAreaText, TStore } from '../../../types';
import MirrorArea from '../MirrorAreaMain/MirrorAreaMain';
import MirrorAreaVariables from '../MirrorAreaVariables/MirrorAreaVariables';
import { getMainText, getVariablesText, getHeadersText } from '../../../redux/slices/editor';
import './TextArea.scss';

function TextArea({ className, mirror, headers }: TAreaText) {
  const typeArea = mirror === 'main' ? 'main' : headers ? 'headers' : 'variables';
  const { textMain, textVariables, textHeaders } = useSelector((state: TStore) => state.editor);
  const text = mirror === 'main' ? textMain : headers ? textHeaders : textVariables;
  const dispatch = useDispatch();
  function changeText(area: string, value: string) {
    switch (area) {
      case 'main':
        dispatch(getMainText(value));
        break;
      case 'variables':
        dispatch(getVariablesText(value));
        break;
      case 'headers':
        dispatch(getHeadersText(value));
        break;
    }
  }

  function changeValue(event: React.ChangeEvent<HTMLTextAreaElement>) {
    changeText(typeArea, event.target.value);
  }

  function changeKeyboard(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const area: HTMLTextAreaElement = event.currentTarget;
    const start = area.selectionStart;
    const end = area.selectionEnd;
    if (event.code === 'Tab') {
      event.preventDefault();
      area.value = area.value.substring(0, start) + '  ' + area.value.substring(end);
      area.selectionStart = area.selectionEnd = start + 2;
      changeText(typeArea, area.value);
    } else if (event.code === 'BracketLeft') {
      area.setRangeText('}', area.selectionStart, area.selectionEnd, 'start');
    } else if (event.code === 'Enter') {
      event.preventDefault();
      const textStart = area.value.substring(0, start);
      const firstStart = area.selectionStart;

      const currentBrackets = textStart.split('').filter((el) => el === '{').length;
      if (currentBrackets && textStart[area.selectionStart - 1] !== '{') {
        const newValue =
          area.value.substring(0, start) +
          '\n' +
          '  '.repeat(currentBrackets) +
          '  '.repeat(currentBrackets - 1) +
          area.value.substring(end);
        changeText(typeArea, newValue);
        setTimeout(
          () => (area.selectionStart = area.selectionEnd = firstStart + 2 * currentBrackets + 1),
          0
        );
      } else if (currentBrackets && textStart[area.selectionStart - 1] === '{') {
        const newValue =
          area.value.substring(0, start) +
          '\n' +
          '  '.repeat(currentBrackets) +
          '\n' +
          '  '.repeat(currentBrackets - 1) +
          area.value.substring(end);
        changeText(typeArea, newValue);
        setTimeout(
          () => (area.selectionStart = area.selectionEnd = firstStart + 2 * currentBrackets + 1),
          0
        );
      } else {
        const start = area.selectionStart;
        const end = area.selectionEnd;
        area.value = area.value.substring(0, start) + '\n' + area.value.substring(end);
        area.selectionStart = area.selectionEnd = start + 1;
        changeText(typeArea, area.value);
      }
    }
  }

  return (
    <>
      {mirror === 'main' ? <MirrorArea text={text} /> : <MirrorAreaVariables text={text} />}
      <textarea
        className={className}
        value={text}
        onKeyDown={changeKeyboard}
        onChange={changeValue}
        spellCheck={false}
      />
    </>
  );
}

export default TextArea;
