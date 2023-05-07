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
import { setFieldName, setFieldArgs } from '../../redux/slices/docs';
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
  console.log(schema);

  useEffect(() => {
    getSchema().then((data) => setSchema(data));
  }, []);

  const currentFieldName = useAppSelector((store) => store.docs.currentFieldName);
  const currentFieldArgs = useAppSelector((store) => store.docs.currentFieldArgs);
  const isOpen = useAppSelector((store) => store.docs.isOpen);
  const dispatch = useAppDispatch();

  const currentField = schema?.types.find(
    (field) => field.name === currentFieldName
  ) as IntrospectionObjectType;
  const currentInputField = schema?.types.find(
    (field) => field.name === currentFieldName
  ) as IntrospectionInputObjectType;

  const onFieldClick = (elem: IntrospectionField | IntrospectionInputValue) => {
    const elementType = elem.type;

    if (elementType.kind === 'OBJECT') {
      dispatch(setFieldName(elementType.name));
    }
    if (elementType.kind === 'LIST') {
      if (elementType.ofType.kind === 'OBJECT') {
        dispatch(setFieldName(elementType.ofType.name));
      }
    }
    if (elementType.kind === 'NON_NULL') {
      if (elementType.ofType.kind === 'LIST') {
        if (elementType.ofType.ofType.kind === 'OBJECT') {
          dispatch(setFieldName(elementType.ofType.ofType.name));
        }
      }
    }
    if (elementType.kind === 'SCALAR') {
      dispatch(setFieldName(elementType.name));
    }

    dispatch(setFieldArgs((elem as IntrospectionField).args as IntrospectionInputValue[]));
  };

  const onArgumentClick = (arg: IntrospectionInputValue) => {
    const argType: IntrospectionInputTypeRef = arg.type;
    if (argType.kind === 'NON_NULL') {
      if (argType.ofType.kind === 'SCALAR') {
        dispatch(setFieldName(argType.ofType.name));
      }

      if (argType.ofType.kind === 'LIST') {
        if (argType.ofType.ofType.kind === 'NON_NULL') {
          if (argType.ofType.ofType.ofType.kind === 'SCALAR') {
            dispatch(setFieldName(argType.ofType.ofType.ofType.name));
          }
        }
      }
    }

    if (argType.kind === 'SCALAR' || argType.kind === 'INPUT_OBJECT') {
      dispatch(setFieldName(argType.name));
    }

    dispatch(setFieldArgs([]));
  };

  return (
    <div className={`graphql-docs docs ${!isOpen ? 'closed' : ''}`}>
      <div className="docs-header">
        <h2 className="docs-header__title">Docs</h2>
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
