import React, { Component } from "react";
import { Input, Icon, Button } from "antd";
import "./logincomponent.css";
import axios from "axios";
import { Alert } from "antd";

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

  onChangeUserName = e => {
    this.setState({ username: e.target.value });
  };

  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  sendForm() {
    axios
      .post("http://localhost:5000/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response)
        //localStorage.setItem("token",)
        this.props.history.push("/");
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
          <Alert
            message="Error inciando sesion, prueba de nuevo"
            type="error"
            showIcon
            className={this.state.errorOccurred ? "shown" : "hidden"}
          />
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

export default LoginComponent;
