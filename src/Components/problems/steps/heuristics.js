import React, { Component } from "react";
import ReactStars from "react-stars";

export default class heuristic extends Component {
  render() {
    return (
      <>
        <div className="inline">
          Heuristico 1 <ReactStars value={5} count={5} size={24} color2={"#ffd700"} />
        </div>
        <div className="inline">
          Heuristico 2 <ReactStars  value={3} count={5} size={24} color2={"#ffd700"} />
        </div>
        <div className="inline">
          Heuristico 3 <ReactStars  value={2} count={5} size={24} color2={"#ffd700"} />
        </div>
      </>
    );
  }
}
