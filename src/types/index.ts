import { IntrospectionField, IntrospectionInputValue } from 'graphql';

export type FieldProps = {
  elem: IntrospectionField | IntrospectionInputValue;
  onFieldClick: (elem: IntrospectionField | IntrospectionInputValue) => void;
};

export type ArgumentProps = {
  arg: IntrospectionInputValue;
  onArgumentClick: (arg: IntrospectionInputValue) => void;
};
