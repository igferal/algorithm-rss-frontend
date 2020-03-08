import React from "react";

const stateColors = {
  inactive: "#2E4057",
  active: "#00A1E4",
  marked: "#FFBA08"
};

export const LinearArray = ({ vector }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center" }}>
      {vector.map(element => (
        <div
          key={`${Math.random() + 200}`}
          style={{
            display: "flex",
            color : "white",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40px",
            minWidth: "40px",
            backgroundColor: stateColors[element.state],
            borderColor: "black",
            textAlign: "center",
            borderWidth: 1,
            borderStyle: "solid"
          }}
        >
          {element.value}
        </div>
      ))}
    </div>
  );
};
