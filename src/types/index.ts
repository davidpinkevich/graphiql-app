import { IntrospectionField, IntrospectionInputValue } from 'graphql';
import { InitialStateType } from '../redux/slices/docs';

export type TInitialStateEditor = {
  textMain: string;
  textVariables: string;
  textHeaders: string;
  hiddenSide: boolean;
  chooseBtn: boolean;
  loadingData: string;
  response: string;
  timeResponse: number;
  postRequestClick: boolean;
};

export type TResponse = {
  url: string;
  query: string;
  variables?: string;
  headers?: string;
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

export interface ISingUpForm {
  name: string;
  email: string;
  password: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}
