import React, { Component } from "react";
import ReactStars from "react-stars";

export default class heuristic extends Component {
  render() {
    return (
      <section className="heuristics">
        <div className="heuristic">
          <h2>Heuristico 1</h2> <ReactStars value={5} count={5} size={24} color2={"#ffd700"} />
        </div>
        <div className="heuristic">
          <h2>Heuristico 2</h2> <ReactStars value={3} count={5} size={24} color2={"#ffd700"} />
        </div>
        <div className="heuristic">
          <h2>Heuristico 3</h2> <ReactStars value={2} count={5} size={24} color2={"#ffd700"} />
        </div>
      </section>
    );
  }
}
