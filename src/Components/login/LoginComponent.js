import React, { Component } from "react";
import { Input, Icon, Button } from "antd";
import "./logincomponent.css";
import customAxios from "../Utils/customHttp";
import { Alert } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUser } from "../../actions";
class LoginComponent extends Component {
  state = {
    username: "",
    password: "",
    errorOccurred: false
  };

  constructor() {
    super();
    this.sendForm = this.sendForm.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }

  onChangeUserName = e => {
    this.setState({ username: e.target.value });
  };

  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  sendForm() {
    customAxios
      .post("http://localhost:5000/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        this.props.dispatch(
          addUser({ user: response.data.user, access_token: response.data.access_token, refresh_token: response.data.refresh_token })
        );
        localStorage.setItem("token", response.data.access_token);

        this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorOccurred: true
        });
      });
  }

  render() {
    return (
      <section className="form-container">
        <form action="">
          <h1>Iniciar sesión</h1>
          <Alert message="Error inciando sesion, prueba de nuevo" type="error" showIcon className={this.state.errorOccurred ? "shown" : "hidden"} />
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
