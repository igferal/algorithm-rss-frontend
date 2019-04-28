import React from "react";
import AuthGuardedComponent from "../AuthGuardedComponent";
import { Button } from "antd";
import { Wizard, Step, Controls } from "react-losen";
import PseudocodeStep from "./steps/pseudocode";
import InfoStep from "./steps/info";
import HeuristicStep from "./steps/heuristics";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./problems.css";

class DefaultProblem extends AuthGuardedComponent {
  componentDidMount() {
    super.componentDidMount();
  }

  getCurrentGame = game => {
    switch (game) {
      case "bag":
        this.props.history.push("/knap");
        break;
      default:
        this.props.history.push("/knap");
        break;
    }
  };

  render() {
    return (
      <section className="main-container">
        <h1>Problema de La Mochila</h1>
        <Wizard
          render={() => (
            <>
              <Step name="Info">
                <InfoStep props={this.props.location.state.exercise} />
              </Step>
              <Step name="heuristics">
                <HeuristicStep props={this.props.location.state.exercise.heuristics} />
              </Step>
              <Step name="Pseudocode">
                <PseudocodeStep props={this.props.location.state.exercise} />
              </Step>
              <Controls
                render={(onNext, onPrevious, isFirstStep, isLastStep) => (
                  <div className="buttons">
                    <Button onClick={onPrevious} disabled={isFirstStep}>
                      Previo
                    </Button>
                    <Button
                      onClick={() => {
                        if (isLastStep) {
                          this.getCurrentGame("bag");
                        } else {
                          onNext();
                        }
                      }}
                    >
                      Siguiente
                    </Button>
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
