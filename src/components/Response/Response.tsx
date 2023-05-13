import { useSelector } from 'react-redux';

import { TStore } from '../../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './response.scss';

function Response() {
  const response = useSelector((state: TStore) => state.editor.response);
  const loadingData = useSelector((state: TStore) => state.editor.loadingData);

  let content = response;

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
        message: 'Oops! Somethimg went wrong',
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
    </section>
  );
}

export default Response;
