import './Loader.scss';

import spinner from '/icons/spinner.svg';

function CustomLoader() {
  return (
    <div className="loader-wrapper">
      <img src={spinner} className="spinner" alt="spinner" />
    </div>
  );
}

export default CustomLoader;
