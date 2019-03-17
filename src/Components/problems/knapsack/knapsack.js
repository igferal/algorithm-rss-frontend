import React from "react";
import { Stage, Layer, Text, Rect } from "react-konva";

export default (
  <Stage width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
    <Layer>
      <Rect x={20} y={50} width={100} height={100} shadowBlur={10} draggable fill={"green"} />
      <Text text="Draggable Text" x={50} y={50} />
    </Layer>
  </Stage>
);
