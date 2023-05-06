import { v4 } from 'uuid';
import { TMirrorArea } from '../../../types';
import { GRAPH_REQ } from '../../../constants';
import SpanMirror from '../SpanMirror/SpanMirror';
import './MirrorArea.scss';

function MirrorArea({ text }: TMirrorArea) {
  const regexpWord = /[a-zA-Z]{1,}/;
  const regexpBracket = /[\(\)\{\}\$\:\!]/;

  return (
    <div className="editor__mirror">
      {text.split('\n').map((str, index) => (
        <div key={v4()} className="editor__mirror-item">
          <span className="editor__mirror-item-index">{index + 1}</span>
          <span className="editor__mirror-item-string">
            {str.split(/\b/).map((item, id) => {
              if (regexpBracket.test(item)) {
                return <SpanMirror key={v4()} className="editor__mirror-bracket" text={item} />;
              } else if (index === 0 && id === 2) {
                return <SpanMirror key={v4()} className="editor__mirror-main" text={item} />;
              } else if (GRAPH_REQ.filter((word) => word === item).length) {
                return <SpanMirror key={v4()} className="editor__mirror-req" text={item} />;
              } else if (regexpWord.test(item)) {
                return <SpanMirror key={v4()} className="editor__mirror-word" text={item} />;
              } else {
                return item;
              }
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MirrorArea;
