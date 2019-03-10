import React, { Component } from "react";
import { Input, Icon, Button } from "antd";
import "./signUp.css";
import customAxios from "../Utils/customHttp";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUser } from "../../actions";
import { notify } from "reapop";

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

  showError = message => {
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

  sendForm() {
    const re = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/
    ;
    if (!re.test(this.state.email.toLowerCase())) {
      this.showError("Email Incorrecto");
      this.setState({ email: "" });
      return;
    }

    customAxios
      .post("http://localhost:5000/signUp", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        name: this.state.name,
        surname: this.state.surname
      })
      .then(response => {
        console.log(response);
        if (response.data.user) {
          this.props.dispatch(
            addUser({ user: response.data.user, access_token: response.data.access_token, refresh_token: response.data.refresh_token })
          );
          this.props.history.push("/dashboard");
        } else {
          this.showError("Error creando usuario, compruebe sus datos");
        }
      })
      .catch(err => {
        console.error(err);
        this.showError("Error creando usuario, compruebe sus datos");
      });
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

const mapStateToProps = state => {
  return { state: state.user };
};

export default withRouter(connect(mapStateToProps)(SignUpComponent));
