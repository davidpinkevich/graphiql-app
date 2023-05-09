import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../types';
import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';
import { AppDispatch } from '../../redux/store';
import { getData, clearResponse, changeLoading } from '../../redux/slices/editor';
import './ResponseButton.scss';

function ResponseButton() {
  const dispatch = useDispatch<AppDispatch>();
  const { loadingData, textMain, textVariables, textHeaders } = useSelector(
    (state: TStore) => state.editor
  );
  function getResponse() {
    dispatch(changeLoading());
    const request = {
      url: 'https://rickandmortyapi.com/graphql',
      query: textMain,
      variables: textVariables,
      headers: textHeaders,
    };
    dispatch(clearResponse());
    dispatch(getData(request));
  }

  return (
    <button disabled={loadingData === 'loading'} className="editor__btn" onClick={getResponse}>
      <div className="editor__btn-container">
        <img src={loadingData === 'start' || loadingData === 'error' ? play : pause} />
      </div>
    </button>
  );
}

export default ResponseButton;
