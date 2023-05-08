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
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setFieldName,
  setFieldArgs,
  addToHistory,
  removeFromHistory,
} from '../../redux/slices/docs';
import { getSchema } from '../../graphql/api';
import Description from './Description';
import Field from './Field';
import Argument from './Argument';

/**
 * TODO:
 * 1) Ссылку для возврата назад. Можно создать массив куда пушить имена элементов
 * и при клике на возврат брать последний элемент массива => SetCurrentField(имя) и готово,
 * ну и конечно же удалять этот элемент из массива.
 //* 2) создать sidebar с кнопкой открытия доки (потом мб что то еще будет добавляться сюда (мб история)),
 * можно создать переменную которую засуну в ртк,
 * при открытии изменяем стили на нормальные, при закрытии сдвигаем куда нибудь влево (хз) (чекну в примерах)
 */

function Docs() {
  const [schema, setSchema] = useState<IntrospectionSchema>();

  useEffect(() => {
    getSchema().then((data) => setSchema(data));
  }, []);

  const dispatch = useAppDispatch();
  const currentFieldName = useAppSelector((store) => store.docs.currentFieldName);
  const currentFieldArgs = useAppSelector((store) => store.docs.currentFieldArgs);
  const isOpen = useAppSelector((store) => store.docs.isOpen);
  const history = useAppSelector((store) => store.docs.history);

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
    }
    if (elementType.kind === 'NON_NULL') {
      if (elementType.ofType.kind === 'LIST') {
        if (elementType.ofType.ofType.kind === 'OBJECT') {
          elementTypeName = elementType.ofType.ofType.name;
        }
      }
    }

    if (elementTypeName !== '') {
      dispatch(setFieldName(elementTypeName));
      dispatch(addToHistory(elementTypeName));
      dispatch(setFieldArgs((elem as IntrospectionField).args as IntrospectionInputValue[]));
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
      dispatch(addToHistory(argTypeName));
      dispatch(setFieldArgs([]));
    }
  };

  const onBackClick = () => {
    dispatch(setFieldName(history[history.length - 2]));
    dispatch(removeFromHistory());
  };

  return (
    <div className={`graphql-docs docs ${!isOpen ? 'closed' : ''}`}>
      <div className="docs-header">
        <h2 className="docs-header__title">Docs</h2>
        {history.length > 1 && (
          <p className="docs-header__back" onClick={onBackClick}>
            &lt;&nbsp;{history[history.length - 2]}
          </p>
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
