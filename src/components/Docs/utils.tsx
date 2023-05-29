import { IntrospectionField, IntrospectionInputValue, IntrospectionInputTypeRef } from 'graphql';

export const getElementType = (elem: IntrospectionField | IntrospectionInputValue) => {
  const elementType = elem.type;

  if (elementType.kind === 'OBJECT' || elementType.kind === 'SCALAR') return elementType.name;

  if (elementType.kind === 'LIST') {
    if (elementType.ofType.kind === 'OBJECT' || elementType.ofType.kind === 'SCALAR') {
      return `[${elementType.ofType.name}]`;
    }
  }

  if (elementType.kind === 'NON_NULL') {
    if (elementType.ofType.kind === 'LIST') {
      if (elementType.ofType.ofType.kind === 'OBJECT') {
        return elementType.ofType.ofType.name;
      }
    }

    if (elementType.ofType.kind === 'SCALAR') {
      return `${elementType.ofType.name}!`;
    }
  }
};

export const getArgumentType = (arg: IntrospectionInputValue) => {
  const argType: IntrospectionInputTypeRef = arg.type;

  if (argType.kind === 'SCALAR' || argType.kind === 'INPUT_OBJECT') return argType.name;

  if (argType.kind === 'NON_NULL') {
    if (argType.ofType.kind === 'SCALAR') {
      return `${argType.ofType.name}!`;
    }

    if (argType.ofType.kind === 'LIST') {
      if (argType.ofType.ofType.kind === 'NON_NULL') {
        if (argType.ofType.ofType.ofType.kind === 'SCALAR') {
          return `[${argType.ofType.ofType.ofType.name}!]!`;
        }
      }
    }
  }
};
