import React from "react";
import AuthGuardedComponent from "../AuthGuardedComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table, Divider } from "antd";
import "./friends.css";
import { notify } from "reapop";
import { getFriendRequests } from "../../actions";

class FriendsFinderComponent extends AuthGuardedComponent {
  componentDidMount() {
    super.componentDidMount();
    this.updateRedux();
  }

  updateRedux = () => {
    this.customAxios
      .get("http://156.35.98.107:5000/friendRequest")
      .then(res => {
        this.props.dispatch(getFriendRequests(res.data.friendRequests));
      })
      .catch(err => console.log(err));
  };

  acceptFriend = user => {
    this.customAxios
      .get(`http://156.35.98.107:5000/acceptFriend/${user.id}`)
      .then(res => {
        this.props.dispatch(
          notify({
            title: "RSA",
            message: `Ahora eres amigo de ${user.name}`,
            status: "success",
            dismissible: true,
            dismissAfter: 3000
          })
        );
        this.updateRedux();
      })
      .catch(err => {
        console.log(err);
      });
  };

  rejectFriend = user => {
    this.customAxios
      .get(`http://156.35.98.107:5000/rejectFriend/${user.id}`)
      .then(res => {
        this.props.dispatch(
          notify({
            title: "RSA",
            message: `Petición de ${user.name} rechazada`,
            status: "success",
            dismissible: true,
            dismissAfter: 3000
          })
        );
        this.updateRedux();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const columns = [
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
              <a onClick={() => this.acceptFriend(user)}>Aceptar</a>
              <Divider type="vertical" />
              <a onClick={() => this.rejectFriend(user.id)}>Rechazar</a>
            </span>
          );
        }
      }
    ];

    return (
      <div className="container">
        <img src={process.env.PUBLIC_URL + "/images/friends.svg"} alt="Landing pic" />
        <section className="table-friends">
          <h1>Peticiones de Amistad</h1>
          <Table columns={columns} dataSource={Object.values(this.props.friendsRequests)} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user, friendsRequests: state.friendRequests };
};

export default withRouter(connect(mapStateToProps)(FriendsFinderComponent));
