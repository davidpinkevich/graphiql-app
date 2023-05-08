import React, { useState } from 'react';
import { TAreaText } from '../../../types';
import MirrorArea from '../MirrorAreaMain/MirrorAreaMain';
import MirrorAreaVariables from '../MirrorAreaVariables/MirrorAreaVariables';
import './TextArea.scss';

function TextArea({ className, mirror }: TAreaText) {
  const [text, setText] = useState<string>('');

  function changeValue(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = event.target.value;
    setText(text);
  }

  function changeKeyboard(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const area: HTMLTextAreaElement = event.currentTarget;
    const start = area.selectionStart;
    const end = area.selectionEnd;
    if (event.code === 'Tab') {
      event.preventDefault();
      area.value = area.value.substring(0, start) + '  ' + area.value.substring(end);
      area.selectionStart = area.selectionEnd = start + 2;
      setText(area.value);
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
        setText(newValue);
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
        setText(newValue);
        setTimeout(
          () => (area.selectionStart = area.selectionEnd = firstStart + 2 * currentBrackets + 1),
          0
        );
      } else {
        const start = area.selectionStart;
        const end = area.selectionEnd;
        area.value = area.value.substring(0, start) + '\n' + area.value.substring(end);
        area.selectionStart = area.selectionEnd = start + 1;
        setText(area.value);
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
