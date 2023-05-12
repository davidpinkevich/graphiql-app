import { TStore } from '../../../types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { hiddenSidebar, activeBtn } from '../../../redux/slices/editor';

function ButtonsOptions() {
  const { chooseBtn } = useSelector((state: TStore) => state.editor);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  return (
    <div className="editor__sidebar-options">
      <button
        className={chooseBtn ? 'editor__sidebar-var variables__active' : 'editor__sidebar-var'}
        onClick={() => {
          dispatch(hiddenSidebar(true));
          dispatch(activeBtn(true));
        }}
      >
        {t('options.variables')}
      </button>
      <button
        className={
          !chooseBtn ? 'editor__sidebar-headers variables__active' : 'editor__sidebar-headers'
        }
        onClick={() => {
          dispatch(hiddenSidebar(true));
          dispatch(activeBtn(false));
        }}
      >
        {t('options.headers')}
      </button>
    </div>
  );
}

export default ButtonsOptions;
