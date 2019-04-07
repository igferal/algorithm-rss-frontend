import React from "react";

const InfoStep = ({ props }) => (
  <div className="info">
    <img alt={props.name} src={props.image} />
    <p>{props.description}</p>
  </div>
);
export default InfoStep;
