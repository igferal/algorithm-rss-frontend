import React from "react";
import AuthGuardedComponent from "../AuthGuardedComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table, Divider, Tabs, Icon, Input, Button } from "antd";
import "./rankings.css";
import { notify } from "reapop";

class ExerciseRankings extends AuthGuardedComponent {
  componentDidMount() {
    super.componentDidMount();
    this.customAxios
      .get(`${process.env.REACT_APP_API_HOST}/bestResolutions/${this.props.location.state.exercise.id}`)
      .then(res => {
        console.log(res);
        this.setState({ resolutions: res.data.resolutions });
      })
      .catch(err => console.log(err));
  }

  state = {
    searchText: "",
    resolutions: []
  };

  resolutionCollumns = user => {
    return [
      {
        title: "User",
        dataIndex: "user",
        key: "user"
      },
      {
        title: "Tiempo empleado",
        dataIndex: "final_time",
        key: "final_time"
      },
      {
        title: "Dificultad",
        dataIndex: "difficulty",
        key: "difficulty"
      },
      {
        title: "Comienzo",
        dataIndex: "start_date",
        render: time => {
          return <span>{`${time.day}/${time.month}/${time.year} ${time.hour}:${time.minute}:${time.second}`}</span>;
        }
      },
      {
        title: "Final",
        dataIndex: "end_date",
        render: time => {
          return <span>{`${time.day}/${time.month}/${time.year} ${time.hour}:${time.minute}:${time.second}`}</span>;
        }
      }
    ];
  };

  render() {
    const resolutionCollumns = this.resolutionCollumns(null);
    return (
      <div className="container">
        <img src={process.env.PUBLIC_URL + "/images/exerciseranks.svg"} alt="Landing pic" />
        <section className="table-friends">
          <h1>Resultados {this.props.location.state.exercise.name}</h1>
          <Table columns={resolutionCollumns} dataSource={this.state.resolutions} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user, users: state.users };
};

export default withRouter(connect(mapStateToProps)(ExerciseRankings));
