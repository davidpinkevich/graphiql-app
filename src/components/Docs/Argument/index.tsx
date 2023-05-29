import { getArgumentType } from '../utils';
import { ArgumentProps } from '../../../types';
import Arrow from '../Arrow';

function Argument({ arg, onArgumentClick }: ArgumentProps) {
  return (
    <div className="docs-content__arg" onClick={() => onArgumentClick(arg)}>
      <span className="field-name">{`${arg.name}(...): `}</span>
      <span className="type-name">{getArgumentType(arg)}</span>
      <span className="right-arrow">
        <Arrow />
      </span>
    </div>
  );
}

export default Argument;
