"use client";

import { defaultProps } from "prism-react-renderer";
import Highlight from "prism-react-renderer";

export default function CodeBlockRenderer({ code, language }) {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language || "javascript"}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} p-4 rounded overflow-auto`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => {
                const { key: _, ...tokenProps } = getTokenProps({ token });
                return (
                  <span key={key} {...tokenProps} />
                );
              })}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}