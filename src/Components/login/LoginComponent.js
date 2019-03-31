import React, { Component } from "react";
import { Input, Icon, Button } from "antd";
import "./logincomponent.css";
import customAxios from "../Utils/customHttp";
import { connect } from "react-redux";
import { notify } from "reapop";
import { withRouter } from "react-router-dom";
import { addUser } from "../../actions";
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

  sendForm() {
    customAxios
      .post("http://localhost:5000/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.data.user) {
          this.props.dispatch(
            addUser({ user: response.data.user, access_token: response.data.access_token, refresh_token: response.data.refresh_token })
          );
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
        <form action="">
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

          <Button type="primary" onClick={this.sendForm} block>
            Login
          </Button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user };
};

export default withRouter(connect(mapStateToProps)(LoginComponent));
