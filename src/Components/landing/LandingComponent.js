import React, { Component } from "react";
import "./landing.css";
import image from "./landing.svg";
import { Button } from "antd";

class LandingComponent extends Component {
  render() {
    return (
      <section className="landing">
        <div className="landing-info">
          <h1>AlgFun</h1>
          <div>
            <p className="customText">Aprende conocimientos de diseño de algoritmos básicos, a la vez que te diviertes</p>
            <Button type="primary" onClick={() => this.props.history.push("/login")}>
              Login
            </Button>
            <p className="link" onClick={() => this.props.history.push("/signUp")}>Aún no tienes cuenta, registrate siguiendo este enlace</p>
          </div>
        </div>
        <div className="landing-pic">
          <img src={image} alt="Foto" />
        </div>
      </section>
    );
  }
}

export default LandingComponent;
