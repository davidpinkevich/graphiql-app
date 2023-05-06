import React, { useState } from 'react';
import MirrorArea from '../MirrorArea/MirrorArea';
import './TextArea.scss';

function TextArea() {
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
      }
    }
  }

  return (
    <>
      <MirrorArea text={text} />
      <textarea
        className="editor__area"
        value={text}
        onKeyDown={changeKeyboard}
        onChange={changeValue}
        spellCheck={false}
      />
    </>
  );
}

export default TextArea;
