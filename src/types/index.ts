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
};
