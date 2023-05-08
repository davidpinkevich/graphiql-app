import { getElementType } from '../utils';
import { FieldProps } from '../../../types';
import { useAppSelector } from '../../../hooks';
import Arrow from '../Arrow';

function Field({ elem, onFieldClick }: FieldProps) {
  const currentFieldName = useAppSelector((store) => store.docs.currentFieldName);

  return (
    <div className="docs-content__field" onClick={() => onFieldClick(elem)}>
      <span
        className={currentFieldName === 'Query' ? 'field-name_red' : 'field-name'}
      >{`${elem.name}(...): `}</span>
      <span className="type-name">{getElementType(elem)}</span>
      <span className="right-arrow">
        <Arrow />
      </span>
    </div>
  );
}

export default Field;
