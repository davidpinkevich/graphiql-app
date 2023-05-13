import './Docs.scss';
import {
  IntrospectionSchema,
  IntrospectionObjectType,
  IntrospectionInputObjectType,
  IntrospectionField,
  IntrospectionInputTypeRef,
  IntrospectionInputValue,
} from 'graphql';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setFieldName,
  setFieldArgs,
  addToHistory,
  removeFromHistory,
  FieldType,
} from '../../redux/slices/docs';
import { getSchema } from '../../graphql/api';
import Description from './Description';
import Field from './Field';
import Argument from './Argument';
import svgDown from '../../assets/down.svg';

function Docs() {
  const dispatch = useAppDispatch();
  const currentFieldName = useAppSelector((store) => store.docs.currentFieldName);
  const isOpen = useAppSelector((store) => store.docs.isOpen);
  const history = useAppSelector((store) => store.docs.history);
  const baseUrl = useAppSelector((store) => store.docs.baseUrl);

  const [schema, setSchema] = useState<IntrospectionSchema>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getSchema(baseUrl)
      .then((data) => {
        setSchema(data);
        setIsError(false);
      })
      .catch(() => setIsError(true));
  }, [baseUrl]);

  const currentField = schema?.types.find(
    (field) => field.name === currentFieldName
  ) as IntrospectionObjectType;
  const currentInputField = schema?.types.find(
    (field) => field.name === currentFieldName
  ) as IntrospectionInputObjectType;

  const onFieldClick = (elem: IntrospectionField | IntrospectionInputValue) => {
    const elementType = elem.type;
    let elementTypeName = '';

    if (elementType.kind === 'OBJECT' || elementType.kind === 'SCALAR') {
      elementTypeName = elementType.name;
    }
    if (elementType.kind === 'LIST') {
      if (elementType.ofType.kind === 'OBJECT') {
        elementTypeName = elementType.ofType.name;
      }

      if (elementType.ofType.kind === 'SCALAR') {
        elementTypeName = elementType.ofType.name;
      }
    }
    if (elementType.kind === 'NON_NULL') {
      if (elementType.ofType.kind === 'LIST') {
        if (elementType.ofType.ofType.kind === 'OBJECT') {
          elementTypeName = elementType.ofType.ofType.name;
        }
      }

      if (elementType.ofType.kind === 'SCALAR') {
        elementTypeName = elementType.ofType.name;
      }
    }

    if (elementTypeName !== '') {
      dispatch(setFieldName(elementTypeName));
      dispatch(
        addToHistory({
          name: elementTypeName,
          args: (elem as IntrospectionField).args as IntrospectionInputValue[],
        })
      );
    }
  };

  const onArgumentClick = (arg: IntrospectionInputValue) => {
    const argType: IntrospectionInputTypeRef = arg.type;
    let argTypeName = '';

    if (argType.kind === 'SCALAR' || argType.kind === 'INPUT_OBJECT') {
      argTypeName = argType.name;
    }

    if (argType.kind === 'NON_NULL') {
      if (argType.ofType.kind === 'SCALAR') {
        argTypeName = argType.ofType.name;
      }

      if (argType.ofType.kind === 'LIST') {
        if (argType.ofType.ofType.kind === 'NON_NULL') {
          if (argType.ofType.ofType.ofType.kind === 'SCALAR') {
            argTypeName = argType.ofType.ofType.ofType.name;
          }
        }
      }
    }

    if (argTypeName !== '') {
      dispatch(setFieldName(argTypeName));
      dispatch(addToHistory({ name: argTypeName, args: [] }));
    }
  };

  let currentFieldArgs: Array<IntrospectionInputValue> = [];
  if (history && history[history.length - 1] && history[history.length - 1].args) {
    currentFieldArgs = history[history.length - 1].args;
  }

  const onBackClick = () => {
    dispatch(setFieldName(history[history.length - 2].name));
    dispatch(removeFromHistory());
  };

  const { t } = useTranslation();

  if (isError) return;

  return (
    <div className={`graphql-docs docs ${!isOpen ? 'closed' : ''}`}>
      <div className="docs-header">
        <h2 className="docs-header__title">{t('docs')}</h2>
        {history.length > 1 && (
          <div className="docs-header__back" onClick={onBackClick}>
            <img
              src={svgDown}
              width="30px"
              height="30px"
              style={{ transform: 'rotate(90deg)' }}
              alt="left arrow"
            />
            <p>{history[history.length - 2].name}</p>
          </div>
        )}
      </div>
      <div className="docs-content">
        {(currentField || currentInputField) &&
          (currentField.fields ? (
            <>
              <h2 className="docs-content__title">{currentFieldName}</h2>
              <div className="docs-content__fields">
                {currentField.fields.map((elem, id) => (
                  <Field key={`${elem.name}-${id}`} elem={elem} onFieldClick={onFieldClick} />
                ))}
              </div>
            </>
          ) : currentInputField.inputFields ? (
            <>
              <h2 className="docs-content__title">{currentFieldName}</h2>
              <div className="docs-content__fields">
                {currentInputField.inputFields.map((elem, id) => (
                  <Field key={`${elem.name}-${id}`} elem={elem} onFieldClick={onFieldClick} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="docs-content__title">{currentFieldName}</div>
              <Description str={currentField.description || ''} />
              <div className="docs-content__type">
                <span className="field-name">{currentField.kind.toLowerCase()}</span>
                <span className="type-name">{currentField.name}</span>
              </div>
            </>
          ))}
        {currentFieldArgs && JSON.stringify(currentFieldArgs) !== '[]' && (
          <>
            <h2 className="docs-content__subtitle">Arguments</h2>
            <div className="docs-content__args">
              {currentFieldArgs.map((arg, id) => (
                <Argument key={`${arg.name}-${id}`} arg={arg} onArgumentClick={onArgumentClick} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Docs;
