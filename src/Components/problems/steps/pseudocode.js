import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const PseudocodeStep = ({ props }) => (
  <div className="pseudocode">
   
    <SyntaxHighlighter language="python" style={docco}>
      {props.pseudocode}
    </SyntaxHighlighter>
    <img src={process.env.PUBLIC_URL + "/images/pseudo.svg"} alt="Landing pic" />
  </div>
);

export default PseudocodeStep;
