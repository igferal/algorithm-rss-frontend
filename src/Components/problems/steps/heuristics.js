import React from "react";
import ReactStars from "react-stars";

const HeuristicStep = ({ props }) => {
  return (
    <section className="heuristics">
      <div className="img-div">
        <img src={process.env.PUBLIC_URL + "/images/code.svg"} alt="Landing pic" />
      </div>
      <div className="options">
        {props.map(heuristic => {
          return (
            <div className="heuristic">
              <h1>{heuristic.description}</h1> <ReactStars value={heuristic.rate} count={5} size={24} color2={"#ffd700"} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeuristicStep;
