import { TSpanMirror } from '../../../types';

function SpanMirror({ text, className }: TSpanMirror): JSX.Element {
  return <span className={className}>{text}</span>;
}

export default SpanMirror;
