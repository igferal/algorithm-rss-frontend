import React from "react";
import AuthGuardedComponent from "../../AuthGuardedComponent";
import { connect } from "react-redux";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import { Tracer, Array1DTracer, Array2DTracer, LogTracer, Layout, VerticalLayout } from "algorithm-visualizer";





class Visualizator extends AuthGuardedComponent {
  state = {
    values: [],
    weights: [],
    DP: [],
    maxWeight: 0,
    N: 0
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

    for (let i = 0; i < N + 1; i++) {
      DP[i] = new Array(W + 1);
      for (let j = 0; j < W + 1; j++) {
        DP[i][j] = { value: 0, state: "inactive" };
      }
    }

    this.setState({ values, weights, DP, W, N });
  }

  doTimeoutOperation = async (i, j) => {
    const { values, weights, DP, W, N } = this.state;

    console.log("executing", `at ${new Date().getMilliseconds()}`);
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
        await this.sleep(500);
      }
    }
    console.log(` Best value we can achieve is ${DP[N][W].value}`);
  };

  render() {
    const { values, weights, DP } = this.state;
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
        <div style={styles.centeredDiv}>
          <Button
            type="primary"
            onClick={() => {
              this.execute();
            }}
          >
            Ejecutar
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
  }
};

const mapStateToProps = state => {
  return { state: state.user, exercises: state.exercises };
};

export default withRouter(connect(mapStateToProps)(Visualizator));
