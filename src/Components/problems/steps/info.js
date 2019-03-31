import React from "react";

const InfoStep = ({ props }) => (
  <div className="info">
    <p>{props.description}</p>
    <img alt={props.name} src={props.image} />
  </div>
);
export default InfoStep;
