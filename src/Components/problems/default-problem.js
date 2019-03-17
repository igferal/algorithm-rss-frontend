import React from "react";
import AuthGuardedComponent from "../AuthGuardedComponent";
import { Button } from "antd";
import { Wizard, Step, Controls } from "react-losen";
import PseudocodeStep from "./steps/pseudocode";
import InfoStep from "./steps/info";
import HeuristicStep from "./steps/heuristics";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./problems.css"
class DefaultProblem extends AuthGuardedComponent {
  componentDidMount() {
    super.componentDidMount();
    console.log(this.props);
  }

  render() {
    const game = () => this.props.game.render;
    return (
      <section className="main-container">
        <h1>Problema de La Mochila</h1>
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
              <Step name="Game">{this.props.game}</Step>

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

const mapStateToProps = state => {
  return { state: state.user };
};

export default withRouter(connect(mapStateToProps)(DefaultProblem));
