import { IntrospectionField, IntrospectionInputValue } from 'graphql';
import { InitialStateType } from '../redux/slices/docs';

export type TInitialStateEditor = {
  textMain: string;
  textVariables: string;
  textHeaders: string;
  hiddenSide: boolean;
  chooseBtn: boolean;
};

export type TStore = {
  editor: TInitialStateEditor;
  docs: InitialStateType;
};

export type TMirrorArea = {
  text: string;
};

export type TAreaText = {
  className: string;
  mirror: string;
  headers: boolean;
};

export type TSpanMirror = {
  className: string;
  text: string;
};

export type FieldProps = {
  elem: IntrospectionField | IntrospectionInputValue;
  onFieldClick: (elem: IntrospectionField | IntrospectionInputValue) => void;
};

export type ArgumentProps = {
  arg: IntrospectionInputValue;
  onArgumentClick: (arg: IntrospectionInputValue) => void;
};
