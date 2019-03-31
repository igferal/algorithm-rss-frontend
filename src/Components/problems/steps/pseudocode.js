import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const  PseudocodeStep = ({ props }) => (
  <div className="pseudocode">
    <SyntaxHighlighter language="python" style={docco}>
      {props.pseudocode}
    </SyntaxHighlighter>
  </div>
);

export default PseudocodeStep;
