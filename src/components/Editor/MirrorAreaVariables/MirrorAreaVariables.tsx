import { v4 } from 'uuid';
import { TMirrorArea } from '../../../types';
import SpanMirror from '../SpanMirror/SpanMirror';
import { DIGITS } from '../../../constants';
import './MirrorAreaVariables.scss';

function MirrorAreaVariables({ text }: TMirrorArea) {
  const regexpNumber = /^\d{1,}$/;
  const regexpBracket = /[\(\)\{\}\$\:\;\!\"]{1}/;
  return (
    <div className="editor__mirror-variables">
      {text.split('\n').map((str, index) => (
        <div key={v4()} className="editor__mirror-item">
          <span className="editor__mirror-item-index">{index + 1 + '.'}</span>
          <span className="editor__mirror-item-string">
            {str.split(/\b/).map((item) => {
              if (regexpBracket.test(item)) {
                return <SpanMirror key={v4()} className="editor__mirror-string" text={item} />;
              } else if (DIGITS.filter((word) => word === item).length) {
                return <SpanMirror key={v4()} className="editor__mirror-undefined" text={item} />;
              } else if (regexpNumber.test(item)) {
                return <SpanMirror key={v4()} className="editor__mirror-number" text={item} />;
              } else {
                return <SpanMirror key={v4()} className="editor__mirror-text" text={item} />;
              }
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MirrorAreaVariables;
