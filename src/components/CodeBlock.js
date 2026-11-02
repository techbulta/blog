import React, { useState } from 'react';
import { Highlight } from 'prism-react-renderer';
import './CodeBlock.css';

// Dark theme built from the tokens: comments subtle grey, strings mint,
// keywords and values saffron (same colors as the reference code sample).
const theme = {
  plain: { color: 'var(--color-on-dark)', backgroundColor: 'var(--color-ink)' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--color-on-dark-subtle)' } },
    { types: ['string', 'char', 'attr-value', 'regex', 'inserted'], style: { color: 'var(--color-mint)' } },
    {
      types: ['keyword', 'function', 'builtin', 'number', 'boolean', 'constant', 'tag', 'selector', 'class-name', 'deleted'],
      style: { color: 'var(--color-accent)' },
    },
  ],
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span>{language || 'code'}</span>
        <button type="button" className="code-copy" onClick={handleCopy} aria-label="Copy code">
          {copied ? 'Copied' : 'Copy'}
        </button>
        <span className="visually-hidden" aria-live="polite">{copied ? 'Code copied' : ''}</span>
      </div>
      <Highlight code={code} language={language || 'text'} theme={theme}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => <span key={key} {...getTokenProps({ token })} />)}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export default CodeBlock;
