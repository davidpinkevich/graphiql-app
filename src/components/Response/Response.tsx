import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TStore } from '../../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Alert } from '@mui/material';

import './response.scss';

function Response() {
  const response = useSelector((state: TStore) => state.editor.response);
  const loadingData = useSelector((state: TStore) => state.editor.loadingData);

  const [isShowError, setIsShowError] = useState<boolean>(false);

  let content = response;

  useEffect(() => {
    if (loadingData === 'error') {
      setIsShowError(true);
    }
    const timer = loadingData === 'error' ? setTimeout(() => setIsShowError(false), 3000) : null;
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [loadingData]);

  if (loadingData === 'loading') {
    const loading = {
      loading: {
        message: 'Loading... Please wait',
      },
    };
    content = JSON.stringify(loading, null, 2);
  } else if (loadingData === 'error') {
    const error = {
      error: {
        message: 'Oops! Something went wrong',
      },
    };
    content = JSON.stringify(error, null, 2);
  }

  return (
    <section className="response">
      <SyntaxHighlighter
        language="json"
        style={dark}
        showLineNumbers
        showInlineLineNumbers
        className="response__json"
        customStyle={{ margin: 0 }}
      >
        {content}
      </SyntaxHighlighter>
      {isShowError && (
        <div className="response__alert">
          <Alert variant="filled" severity="error">
            Oops! Something went wrong, repeat your request!
          </Alert>
        </div>
      )}
    </section>
  );
}

export default Response;
