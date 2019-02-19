import React from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import { Button } from "antd";
import "./knapSack.css";

class KnapSackComponent extends React.Component {
  state = {
    isDragging: false
  };
  render() {
    return (
      <section className="main-container">
        <h1>KnapSack</h1>
        <Stage width={window.innerWidth - 100} height={window.innerHeight - 100}>
          <Layer>
            <Rect
              x={20}
              y={50}
              width={100}
              height={100}
              shadowBlur={10}
              draggable
              fill={this.state.isDragging ? "green" : "black"}
              onDragStart={() => {
                this.setState({
                  isDragging: true
                });
              }}
              onDragEnd={() => {
                this.setState({
                  isDragging: false
                });
              }}
            />
            <Text text="Draggable Text" x={50} y={50} />
          </Layer>
        </Stage>
        <div className="buttons">
          <Button type="primary" >
            Resolver
          </Button>
          <Button type="primary">
            Pista
          </Button>
        </div>
      </section>
    );
  }
}

export default KnapSackComponent;
