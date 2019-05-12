import React from "react";
import AuthGuardedComponent from "../AuthGuardedComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table, Divider, Tabs, Icon, Input, Button } from "antd";
import "./rankings.css";
import { notify } from "reapop";

const TabPane = Tabs.TabPane;

class UserRankingComponent extends AuthGuardedComponent {
  componentDidMount() {
    super.componentDidMount();
    this.customAxios();
    console.log(this.props);
  }

  state = {
    searchText: ""
  };

  resolutionCollumns = exercise => {
    return [
      {
        title: "Ejercicio",
        dataIndex: "exercise_name",

        render: () => {
          return <span>{exercise.name}</span>;
        }
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
          return <span>{`${time.day}/${time.month}/${time.year} ${time.hour}:${time.minute}:${time.second}` }</span>;
        }
      },
      {
        title: "Final",
        dataIndex: "end_date",
        render: time => {
          return <span>{`${time.day}/${time.month}/${time.year} ${time.hour}:${time.minute}:${time.second}` }</span>;
        }
      }
    ];
  };

  render() {
    return (
      <div className="container">
        <img src={process.env.PUBLIC_URL + "/images/myranks.svg"} alt="Landing pic" />
        <Tabs defaultActiveKey="0" style={{ width: "100%" }}>
          {Object.values(this.props.resolutions).map((resolution, index) => {
            const resolutionCollumns = this.resolutionCollumns(resolution.exercise);
            return (
              <TabPane
                tab={
                  <span>
                    <Icon type="usergroup-add" />
                    {resolution.exercise.name}
                  </span>
                }
                key={index.toString()}
              >
                <section className="table-friends">
                  <h1>Resultados en {resolution.exercise.name}</h1>
                  <Table columns={resolutionCollumns} dataSource={resolution.resolutions} />
                </section>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user, users: state.users, resolutions: state.userRankings };
};

export default withRouter(connect(mapStateToProps)(UserRankingComponent));
