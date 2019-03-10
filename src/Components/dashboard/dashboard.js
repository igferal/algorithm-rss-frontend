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
  }

  render() {
    return (
      <div>
        <Row>
          <br />
        </Row>
        <Row>
          <Col span={2} />
          <Col span={9}>
            <Card
              cover={<img className="img-fluid" alt="Mochila" src="https://cf.shopee.com.my/file/607f892ccaa0b7d0793e0b69a801cb2a" />}
              actions={[
                <span>
                  <Icon type="read" />
                  &nbsp;Apuntes
                </span>,
                <span
                  onClick={() => {
                    this.customAxios
                      .get("http://localhost:5000/secret")
                      .then(res => console.log(res))
                      .catch(err => console.log(err));
                  }}
                >
                  <Icon type="bar-chart" />
                  &nbsp;Rankings
                </span>,
                <span
                  onClick={() => {
                    this.props.history.push("/knapsack");
                  }}
                >
                  <Icon type="experiment" />
                  &nbsp;Practicar
                </span>
              ]}
            >
              <Meta
                avatar={<Avatar src="https://static.thenounproject.com/png/74649-200.png" />}
                title="Problema de la Mochila"
                description="La principal estrella de los problemas algoritmicos"
              />
            </Card>
          </Col>
          <Col span={2} />
          <Col span={9}>
            <Card
              cover={<img className="img-fluid" alt="Mochila" src="http://www.vencafesa.com/pics_fotosproductos/20/samba.jpg" />}
              actions={[
                <span>
                  <Icon type="read" />
                  &nbsp;Apuntes
                </span>,
                <span>
                  <Icon type="bar-chart" />
                  &nbsp;Rankings
                </span>,
                <span>
                  <Icon type="experiment" />
                  &nbsp;Practicar
                </span>
              ]}
            >
              <Meta
                avatar={<Avatar src="https://static.thenounproject.com/png/74649-200.png" />}
                title="Problema del cambio"
                description="Discovering how a vending machines works"
              />
            </Card>
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user };
};

export default withRouter(connect(mapStateToProps)(DashboardComponent));
