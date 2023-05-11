import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './response.scss';

function Response() {
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
        []
      </SyntaxHighlighter>
    </section>
  );
}

export default Response;
