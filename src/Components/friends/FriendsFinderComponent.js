import React from "react";
import AuthGuardedComponent from "../AuthGuardedComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table, Divider, Tabs, Icon } from "antd";
import "./friends.css";
import { notify } from "reapop";
import { getUsers, getFriends } from "../../actions";

const TabPane = Tabs.TabPane;

class FriendsFinderComponent extends AuthGuardedComponent {
  componentDidMount() {
    super.componentDidMount();
    this.updateRedux();
  }

  updateRedux = () => {
    this.customAxios
      .get("http://localhost:5000/usersNotFriend")
      .then(res => {
        this.props.dispatch(getUsers(res.data.users));
      })
      .catch(err => console.log(err));

    this.customAxios
      .get("http://localhost:5000/friends")
      .then(res => {
        this.props.dispatch(getFriends(res.data.friends));
      })
      .catch(err => console.log(err));
  };

  errorMessage = message => {
    this.props.dispatch(
      notify({
        title: "RSA",
        message: message,
        status: "error",
        dismissible: true,
        dismissAfter: 3000
      })
    );
  };

  sendFriendshipRequest = user => {
    this.customAxios
      .get(`http://localhost:5000/addFriend/${user.id}`)
      .then(res => {
        if (res.data.message) {
          this.props.dispatch(
            notify({
              title: "RSA",
              message: "Petición de amistad enviada",
              status: "success",
              dismissible: true,
              dismissAfter: 3000
            })
          );
          this.updateRedux();
        } else {
          this.errorMessage("Ya habías mandado una petición a ese usuario");
        }
      })
      .catch(err => {});
  };

  findFriendsColumns = () => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Surname",
        dataIndex: "surname",
        key: "surname"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Posibilidades",
        key: "action",
        render: user => {
          return (
            <span>
              <a
                onClick={() => {
                  this.sendFriendshipRequest(user);
                }}
              >
                Petición de amistad
              </a>
            </span>
          );
        }
      }
    ];
  };

  friendsColumns = () => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Surname",
        dataIndex: "surname",
        key: "surname"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Posibilidades",
        key: "action",
        render: user => {
          return (
            <span>
              <a onClick={() => {}}>Eliminar Amigo</a>
              <Divider type="vertical" />
              <a onClick={() => {}}>Ver Rankings</a>
            </span>
          );
        }
      }
    ];
  };

  render() {
    const findFriendsColumns = this.findFriendsColumns();
    const friendsColumns = this.friendsColumns();
    return (
      <div className="container">
        <img src={process.env.PUBLIC_URL + "/images/findfriends.svg"} alt="Landing pic" />
        <Tabs defaultActiveKey="2" style={{ width: "100%" }}>
          <TabPane
            tab={
              <span>
                <Icon type="usergroup-add" />
                Todos Los usuarios
              </span>
            }
            key="1"
          >
            <section className="table-friends">
              <h1>Buscar Amigos</h1>
              <Table columns={findFriendsColumns} dataSource={Object.values(this.props.users)} />
            </section>
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="team" />
                Mis Amigos
              </span>
            }
            key="2"
          >
            <section className="table-friends">
              <h1>Mis Amigos</h1>
              <Table columns={friendsColumns} dataSource={Object.values(this.props.friends)} />
            </section>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user, users: state.users, friends: state.friends };
};

export default withRouter(connect(mapStateToProps)(FriendsFinderComponent));
