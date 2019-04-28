import React, { Component } from "react";
import { Stage, Layer, Shape, Rect, Image, Label, Text, Tag } from "react-konva";
import AuthGuardedComponent from "../../AuthGuardedComponent";
import { Button } from "antd";
import { notify } from "reapop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Konva from "konva";
import useImage from "use-image";
import "./knapsack.css";

const BagImage = props => {
  const [image] = useImage("https://i.imgur.com/UwbQ5VL.png");

  return <Image onDragEnd={props.onDragEnd} x={props.x} y={props.y} height={250} width={200} image={image} />;
};

class KnapSackComponent extends AuthGuardedComponent {
  haveIntersection = r1 => {
    const r2 = { width: 200, height: 250, x: window.innerWidth * 0.46, y: 0 };
    return !(r2.x > r1.x + 60 || r2.x + r2.width < r1.x || r2.y > r1.y + 60 || r2.y + r2.height < r1.y);
  };

  onDragEnd = e => {
    if (this.haveIntersection(e.target.attrs)) {
      this.setState({ insideBag: [...this.state.insideBag, parseInt(e.target.attrs.name)], shouldReRender: false });
    } else {
      let { insideBag } = this.state;
      let index = insideBag.indexOf(parseInt(e.target.attrs.name));
      insideBag.splice(index, 1);
      this.setState({ insideBag: insideBag });
    }
  };

  state = {
    resolution: {},
    elements: [],
    insideBag: [],
    shouldReRender: true,
    bagSize: 0,
    difficulty: false
  };

  componentDidMount() {
    super.componentDidMount();
  }

  getExerciseData = () => {
    this.customAxios
      .put("http://localhost:5000/knapsack", { difficulty: this.state.difficulty })
      .then(res =>
        this.setState({
          elements: res.data.items,
          bagSize: res.data.bagSize
        })
      )
      .catch();
  };

  startExercise = () => {
    let mode = window.confirm("Quieres hacerlo en modo dificil");
    mode ? this.setState({ difficulty: true }) : this.setState({ difficulty: false });

    this.customAxios
      .put("http://localhost:5000/initResolution", {
        exercise_id: 1,
        difficulty: this.state.difficulty ? 2 : 1
      })
      .then(res => {
        this.setState({ resolution: res.data.resolution });
        this.getExerciseData();
      });
  };

  sendResolutionTime = () => {
    this.customAxios
      .post("http://localhost:5000/endResolution", {
        resolution_id: this.state.resolution.id
      })
      .then(res => {
        console.log(res);
        if (res.data.resolution !== false) {
          alert(`Has tardado ${res.data.resolution.final_time} segundos en resolver el ejercicio, looser`);
        } else {
          this.props.dispatch(
            notify({
              title: "RSA",
              message: "Ya se había enviado la resolución a ese ejercicio.",
              status: "error",
              dismissible: true,
              dismissAfter: 3000
            })
          );
        }
      });
  };

  endExercise = () => {
    let totalWeight = 0;
    let totalBenefit = 0;
    this.state.insideBag.forEach(element => {
      totalWeight += this.state.elements[element].weight;
      totalBenefit += this.state.elements[element].benefit;
    });
    if (totalWeight > this.state.bagSize) {
      alert("Te has excedido en el peso");
    } else {
      let res = window.confirm("Quieres enviar la solución");
      if (res) {
        this.getAnswer(totalBenefit);
      }
    }
  };

  getYPosition = () => {
    return window.innerHeight * 0.8 - Math.floor(Math.random() * (window.innerHeight * 0.4));
  };

  getAnswer = currentWeight => {
    this.customAxios
      .post("http://localhost:5000/knapsack", {
        resolution: this.state.insideBag.map(element => this.state.elements[element]),
        elements: this.state.elements,
        bagWeight: this.state.bagSize
      })
      .then(res => {
        if (currentWeight === res.data.resolution) {
          alert("Enhorabuna, has encontrado la solución correcta");
        } else {
          console.log(currentWeight);
          console.log(res.data.resolution);
          alert(`Te has quedado a ${Math.abs(res.data.resolution - currentWeight)} de la solución óptima`);
        }
        this.sendResolutionTime();
      })
      .catch(err => console.error(err));
  };

  getItems = () => {
    return this.state.elements.map((element, index) => {
      return (
        <Text
          onDragEnd={this.onDragEnd}
          fontSize={60}
          x={Math.floor(Math.random() * (window.innerWidth * 0.8))}
          y={this.getYPosition()}
          fontFamily="FontAwesome"
          text={`\t   ${element.icon}\n ${element.benefit}B ${element.weight}P`}
          fill={Konva.Util.getRandomColor()}
          draggable
          name={index.toString()}
          key={index}
        />
      );
    });
  };

  shouldComponentUpdate() {
    if (this.state.elements.length > 0) return false;
    else return true;
  }

  render() {
    const items = this.getItems();
    return (
      <>
        <Stage width={window.innerWidth} height={window.innerHeight * 0.9}>
          <Layer>
            <BagImage x={window.innerWidth * 0.46} y={0} />
            <Text fontSize={42} x={window.innerWidth * 0.4} y={252} text={`Peso máximo mochila : ${this.state.bagSize}`} fill={"black"} />
            <Label
              padding={40}
              wrap={true}
              fill={Konva.Util.getRandomColor()}
              onDragEnd={this.onDragEnd}
              draggable
              text="Draggable Text"
              x={50}
              y={50}
            />
            {items}
          </Layer>
        </Stage>
        <div className="buttons">
          <Button onClick={this.startExercise}> Start</Button>
          <Button onClick={this.endExercise}> Acabar</Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user };
};

export default withRouter(connect(mapStateToProps)(KnapSackComponent));
