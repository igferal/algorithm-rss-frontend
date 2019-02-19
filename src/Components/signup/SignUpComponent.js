import React, { Component } from "react";
import { Input, Icon, Button } from "antd";
import "./signUp.css";
import customAxios from "../Utils/customHttp";
class SignUpComponent extends Component {
  state = {
    username: "",
    email: "",
    name: "",
    surname: "",
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
    customAxios
      .post("http://localhost:5000/signUp", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        name: this.state.name,
        surname: this.state.surname
      })
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props);

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
          <Input
            placeholder="Email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
          />

          <Input
            placeholder="Nombre"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />

          <Input
            placeholder="Apellido"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={e => this.setState({ surname: e.target.value })}
            value={this.state.surname}
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

export default SignUpComponent;
