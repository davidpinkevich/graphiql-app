import './UrlInput.scss';
import { setBaseUrl } from '../../redux/slices/docs';
import { useAppDispatch, useAppSelector } from '../../hooks';

function UrlInput() {
  const value = useAppSelector((store) => store.docs.baseUrl);
  const dispatch = useAppDispatch();

  return (
    <div className="url-input">
      <input type="text" value={value} onChange={(e) => dispatch(setBaseUrl(e.target.value))} />
    </div>
  );
}

export default UrlInput;
