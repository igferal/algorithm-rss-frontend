import React from "react";
import AuthGuardedComponent from "../AuthGuardedComponent";
import "./dashboard.css";
import { Row, Col } from "antd";
import { Card, Icon, Avatar } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const { Meta } = Card;

class DashboardComponent extends AuthGuardedComponent {
  componentDidMount() {
    super.componentDidMount();
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Row>
          <br />
        </Row>
        {Object.values(this.props.exercises).map(exercise => {
          return (
            <>
              <Row key={exercise.id}>
                <Col className="gutter-row" span={6} />
                <Col className="gutter-row" span={12}>
                  <Card
                    cover={<img className="img-fluid" alt="Mochila" src={exercise.image} />}
                    actions={[
                      <span
                        onClick={() => {
                          const win = window.open(
                            "http://www.diku.dk/OLD/publikationer/tekniske.rapporter/1995/95-1.ps.gz",
                            "_blank"
                          );
                          win.focus();
                        }}
                      >
                        <Icon type="read" />
                        &nbsp;Apuntes
                      </span>,
                      <span
                        onClick={() => {
                          this.props.history.push("/exerciseRankings", { exercise: exercise });
                        }}
                      >
                        <Icon type="bar-chart" />
                        &nbsp;Rankings
                      </span>,
                      <span
                        onClick={() => {
                          this.props.history.push("/resolveExercise", { exercise: exercise });
                        }}
                      >
                        <Icon type="experiment" />
                        &nbsp;Practicar
                      </span>
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src="https://static.thenounproject.com/png/74649-200.png" />}
                      title={exercise.name}
                      description={exercise.subtitle}
                    />
                  </Card>
                </Col>
                <Col span={6} />
              </Row>
              <Row>
                <br />
              </Row>
            </>
          );
        })}
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user, exercises: state.exercises };
};

export default withRouter(connect(mapStateToProps)(DashboardComponent));
