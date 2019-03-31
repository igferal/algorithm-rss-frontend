import React from "react";
import ReactStars from "react-stars";

const HeuristicStep = ({ props }) => {
  return (
    <section className="heuristics">
      {props.map(heuristic => {
        return (
          <div className="heuristic">
            <h2>{heuristic.description}</h2> <ReactStars value={heuristic.rate} count={5} size={24} color2={"#ffd700"} />
          </div>
        );
      })}
    </section>
  );
};

export default HeuristicStep;
