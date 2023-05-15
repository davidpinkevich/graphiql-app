import './UrlInput.scss';
import { setBaseUrl, resetDocs } from '../../redux/slices/docs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

function UrlInput() {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const value = useAppSelector((store) => store.docs.baseUrl);
  const dispatch = useAppDispatch();

  const popupTooltip = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.type === 'mouseenter') {
      setTooltip(true);
    } else if (event.type === 'mouseleave') {
      setTooltip(false);
    }
  };

  const onChangeClick = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBaseUrl(e.target.value));
    dispatch(resetDocs());
  };

  const { t } = useTranslation();

  return (
    <div onMouseEnter={popupTooltip} onMouseLeave={popupTooltip} className="url-input">
      {tooltip && <div className="editor__input-tooltip">{t('tooltips.link')}</div>}
      <input type="text" value={value} onChange={onChangeClick} />
    </div>
  );
}

export default UrlInput;
