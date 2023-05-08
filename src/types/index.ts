export type TMirrorArea = {
  text: string;
};

export type TButtonSideBar = {
  hiiden: boolean;
  hiddenSide: () => void;
};

export type TButtonsOptions = {
  variables: boolean;
  chooseOption: (arg: boolean) => void;
};

export type TAreaText = {
  className: string;
  mirror: string;
};

export type TSpanMirror = {
  className: string;
  text: string;

import { IntrospectionField, IntrospectionInputValue } from 'graphql';

export type FieldProps = {
  elem: IntrospectionField | IntrospectionInputValue;
  onFieldClick: (elem: IntrospectionField | IntrospectionInputValue) => void;
};

export type ArgumentProps = {
  arg: IntrospectionInputValue;
  onArgumentClick: (arg: IntrospectionInputValue) => void;
};
