import React from "react";
import AuthGuardedComponent from "../../AuthGuardedComponent";
import { connect } from "react-redux";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import { LinearArray } from "../components/LinearArray";
import { TwoDArray } from "../components/TwoDArray";

class Visualizator extends AuthGuardedComponent {
  state = {
    values: [],
    weights: [],
    DP: [],
    maxWeight: 0,
    N: 0,
    positions: [],
    DPStates: [],
    currentPosition: 0
  };

  componentDidMount() {
    super.componentDidMount();
    console.log(this.props);
    const values = [
      { value: 1, state: "inactive" },
      { value: 4, state: "inactive" },
      { value: 5, state: "inactive" },
      { value: 7, state: "inactive" }
    ]; // The valuesue of all available items
    const weights = [
      { value: 1, state: "inactive" },
      { value: 3, state: "inactive" },
      { value: 4, state: "inactive" },
      { value: 5, state: "inactive" }
    ]; // The weights of available items
    const W = 7; // The maximum weight we can carry in our collection
    const N = values.length;
    const DP = new Array(N + 1);
    const positions = [];

    let index = 0;

    for (let i = 0; i < N + 1; i++) {
      DP[i] = new Array(W + 1);
      for (let j = 0; j < W + 1; j++) {
        DP[i][j] = { value: 0, state: "inactive" };
        positions[index] = { i, j };
        index++;
      }
    }

    this.setState({ values, weights, DP, W, N, positions });
  }

  jsonCopy = src => {
    return JSON.parse(JSON.stringify(src));
  };

  doTimeoutOperation = async (i, j) => {
    const { values, weights, DP } = this.state;
    if (i === 0 || j === 0) {
      /*
        If we have no items or maximum weight we can take in collection is 0
        then the total weight in our collection is 0
        */
      DP[i][0].value = 0;
      DP[i][j].state = "marked";
      this.setState({ DP });
      await this.sleep(300);
      DP[i][j].state = "inactive";
      this.setState({ DP });

      // }
    } else if (weights[i - 1].value <= j) {
      const A = values[i - 1].value + DP[i - 1][j - weights[i - 1].value].value;
      const B = DP[i - 1][j].value;
      /*
        find the maximum of these two values
        and take which gives us a greater weight
         */

      weights[i - 1].state = "active";
      values[i - 1].state = "active";
      this.setState({ values, weights });

      await this.sleep(300);
      DP[i - 1][j - weights[i - 1].value].state = "active";
      DP[i - 1][j].state = "active";
      this.setState({ DP });
      await this.sleep(300);

      if (A > B) {
        DP[i][j].value = A;
        // visualize {
        DP[i][j].state = "marked";
        this.setState({ DP });
        await this.sleep(300);

        // }
      } else {
        DP[i][j].value = B;

        // visualize {
        DP[i][j].state = "marked";
        this.setState({ DP });
        await this.sleep(300);

        // }
      }

      DP[i][j].state = "inactive";
      weights[i - 1].state = "inactive";
      values[i - 1].state = "inactive";
      DP[i - 1][j - weights[i - 1].value].state = "inactive";
      DP[i - 1][j].state = "inactive";

      // }
    } else {
      // leave the current item from our collection
      DP[i][j].value = DP[i - 1][j].value;
      DP[i][j].state = "marked";
      this.setState({ DP });
      await this.sleep(300);
      DP[i][j].state = "inactive";
      this.setState({ DP });
    }
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  execute = async () => {
    const { W, N, DP } = this.state;

    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= W; j++) {
        await this.doTimeoutOperation(i, j);
        await this.sleep(300);
      }
    }
    console.log(` Best value we can achieve is ${DP[N][W].value}`);
  };

  back = async () => {
    const { currentPosition, positions, DPStates } = this.state;
    const { i, j } = positions[currentPosition - 2];
    const previousState = this.jsonCopy(DPStates[`${currentPosition - 2}`]);
    await this.setState({ DP: previousState });
    await this.doTimeoutOperation(i, j);
    this.setState({ currentPosition: currentPosition - 1 });
  };

  forward = async () => {
    const { currentPosition, positions, DPStates, DP } = this.state;
    const { i, j } = positions[currentPosition];
    await this.doTimeoutOperation(i, j);
    DPStates[`${currentPosition}`] = this.jsonCopy(DP);
    this.setState({ ...DPStates, currentPosition: currentPosition + 1 });
  };

  render() {
    const { values, weights, DP, currentPosition, positions } = this.state;

    return (
      <div>
        <div style={styles.centeredDiv}>
          <p>Valores</p>
          <LinearArray vector={values} />
        </div>
        <div style={styles.centeredDiv}>
          <p>Pesos</p>
          <LinearArray vector={weights} />
        </div>
        <div style={styles.centeredDiv}>
          <p>Matriz</p>
          <TwoDArray values={DP} />
        </div>

        <div style={styles.buttonsDiv}>
          <span>{`${currentPosition} of ${positions.length}`}</span>
          <Button
            type="primary"
            disabled={currentPosition <= 1}
            onClick={() => {
              this.back();
            }}
          >
            Back
          </Button>
          <Button
            type="primary"
            disabled={currentPosition === positions.length - 1}
            onClick={() => {
              this.forward();
            }}
          >
            Forward
          </Button>

          <Button
            type="primary"
            onClick={() => {
              this.execute();
            }}
          >
            Run All
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  centeredDiv: {
    margin: "1%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonsDiv: {
    marginTop: "4%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
};

const mapStateToProps = state => {
  return { state: state.user, exercises: state.exercises };
};

export default withRouter(connect(mapStateToProps)(Visualizator));
