import React from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import { Button } from "antd";
import { Wizard, Step, Controls } from "react-losen";
import "./knapSack.css";
import PseudocodeStep from "../steps/pseudocode";
import InfoStep from "../steps/info";
import HeuristicStep from "../steps/heuristics";

class KnapSackComponent extends React.Component {
  state = {
    isDragging: false
  };
  render() {
    return (
      <section className="main-container">
        <h1>KnapSack</h1>
        <Wizard
          render={() => (
            <>
              <Step name="Info">
                <InfoStep />
              </Step>
              <Step name="heuristics">
                <HeuristicStep />
              </Step>
              <Step name="Pseudocode">
                <PseudocodeStep />
              </Step>
              <Step name="Game">
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
              </Step>

              <Controls
                render={(onNext, onPrevious, isFirstStep) => (
                  <div className="buttons">
                    <Button onClick={onPrevious} disabled={isFirstStep}>
                      Previous
                    </Button>
                    <Button onClick={onNext}>Next</Button>
                  </div>
                )}
              />
            </>
          )}
        />
      </section>
    );
  }
}

export default KnapSackComponent;
