import { TButtonsOptions } from '../../../types';

function ButtonsOptions(props: TButtonsOptions) {
  return (
    <div className="editor__sidebar-options">
      <button
        className={
          props.variables ? 'editor__sidebar-var variables__active' : 'editor__sidebar-var'
        }
        onClick={() => props.chooseOption(true)}
      >
        Variables
      </button>
      <button
        className={
          !props.variables ? 'editor__sidebar-headers variables__active' : 'editor__sidebar-headers'
        }
        onClick={() => props.chooseOption(false)}
      >
        Headers
      </button>
    </div>
  );
}

export default ButtonsOptions;
