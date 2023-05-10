import './UrlInput.scss';
import { setBaseUrl, resetDocs } from '../../redux/slices/docs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent } from 'react';

function UrlInput() {
  const value = useAppSelector((store) => store.docs.baseUrl);
  const dispatch = useAppDispatch();

  const onChangeClick = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBaseUrl(e.target.value));
    dispatch(resetDocs());
  };

  return (
    <div className="url-input">
      <input type="text" value={value} onChange={onChangeClick} />
    </div>
  );
}

export default UrlInput;
