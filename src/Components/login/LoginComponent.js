import React, { Component } from "react";
import { Input, Icon, Button } from "antd";
import "./logincomponent.css";
import customAxios from "../Utils/customHttp";
import { connect } from "react-redux";
import { notify } from "reapop";
import { withRouter } from "react-router-dom";
import { addUser } from "../../actions";
import { getExercises, getUsers, getFriends, getFriendRequests } from "../../actions";

class LoginComponent extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    let isLogged = this.props.state.access_token !== undefined;
    if (isLogged) {
      this.props.history.push("/dashboard");
    }
  }

  constructor() {
    super();
    this.sendForm = this.sendForm.bind(this);
  }

  onChangeUserName = e => {
    this.setState({ username: e.target.value });
  };

  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  showError = () => {
    this.props.dispatch(
      notify({
        title: "RSA",
        message: "Error al inciar sesión, compruebe sus credenciales",
        status: "error",
        dismissible: true,
        dismissAfter: 3000
      })
    );
  };

  fillRedux = async token => {
    customAxios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    customAxios
      .get(`${process.env.REACT_APP_API_HOST}/exercises`)
      .then(res => {
        this.props.dispatch(getExercises(res.data.exercises));
      })
      .catch(err => console.log(err));
    customAxios
      .get(`${process.env.REACT_APP_API_HOST}usersNotFriend`)
      .then(res => {
        this.props.dispatch(getUsers(res.data.users));
      })
      .catch(err => console.log(err));
    customAxios
      .get(`${process.env.REACT_APP_API_HOST}/friends`)
      .then(res => {
        this.props.dispatch(getFriends(res.data.friends));
      })
      .catch(err => console.log(err));
    customAxios
      .get(`${process.env.REACT_APP_API_HOST}/friendRequest`)
      .then(res => {
        this.props.dispatch(getFriendRequests(res.data.friendRequests));
      })
      .catch(err => console.log(err));
  };

  sendForm() {
    customAxios
      .post(`${process.env.REACT_APP_API_HOST}/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.data.user) {
          this.props.dispatch(
            addUser({ user: response.data.user, access_token: response.data.access_token, refresh_token: response.data.refresh_token })
          );

          this.fillRedux(response.data.access_token);

          this.props.history.push("/dashboard");
        } else {
          this.showError();
        }
      })
      .catch(err => {
        console.log(err);
        this.showError();
      });
  }

  render() {
    return (
      <section className="form-container">
        <form className="loginForm" action="">
          <img src={process.env.PUBLIC_URL + "/images/auth.svg"} alt="Landing pic" />
          <div>
            <h1>Iniciar sesión</h1>
            <Input
              placeholder="Nombre de usuario"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              onChange={this.onChangeUserName}
              value={this.state.username}
            />
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Algo que no sea 123..."
              onChange={this.onChangePassword}
              value={this.state.password}
            />

            <Button type="primary" className="btn-padding" onClick={this.sendForm} block>
              Login
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user };
};

export default withRouter(connect(mapStateToProps)(LoginComponent));
