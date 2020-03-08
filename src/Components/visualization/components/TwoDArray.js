import React from "react";
import { LinearArray } from "./LinearArray";

export const TwoDArray = ({ values }) => {
  return (
    <div style={{ display: "column", flexDirection: "row", width: "100%", justifyContent: "center" }}>
      {values.map(vector => (
        <LinearArray key={`${Math.random() + 200}`} vector={vector} />
      ))}
    </div>
  );
};
