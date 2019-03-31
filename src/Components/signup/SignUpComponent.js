import React, { Component } from "react";
import { Input, Icon, Button, Form } from "antd";
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
    currentPassword: "",
    newPassword: "",
    errorOccurred: false,
    triedToSend: false,
    label: "Crear usuario"
  };

  componentDidMount() {
    let isLogged = this.props.state.access_token !== undefined;

    if (isLogged) {
      let user = this.props.state.user;
      this.setState({
        username: user.username,
        email: user.email,
        surname: user.surname,
        name: user.name,
        label: "Editar Usuario"
      });
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

  checkForm = () => {
    this.setState({ triedToSend: true });

    const isLogged = this.props.state.access_token !== undefined;
    let passwordCorrect = true;
    if (isLogged) {
      passwordCorrect = true;
    } else {
      passwordCorrect = this.state.password !== "";
    }

    return this.checkEmail() && this.state.name !== "" && this.state.username !== "" && this.state.surname !== "" && passwordCorrect;
  };

  checkEmail = () => {
    const re = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;
    return re.test(this.state.email.toLowerCase());
  };

  signUp = () => {
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
  };

  updateUser = () => {
    customAxios
      .post("http://localhost:5000/updateUser", {
        username: this.state.username,
        password: this.state.currentPassword,
        newPassword: this.state.newPassword,
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
          this.props.dispatch(
            notify({
              title: "RSA",
              message: "Usuario actualizado correctamente",
              status: "sucess",
              dismissible: true,
              dismissAfter: 3000
            })
          );
        } else {
          this.showError(response.data.message);
        }
      })
      .catch(err => {
        console.error(err);
        this.showError("Error creando usuario, compruebe sus datos");
      });
  };

  sendForm() {
    if (!this.checkForm()) {
      this.showError("Complete los campos que generan error");
      return;
    }
    let isLogged = this.props.state.access_token !== undefined;

    if (isLogged) {
      this.updateUser();
    } else {
      this.signUp();
    }
  }

  validatePassword = () => {
    let isLogged = this.props.state.access_token !== undefined;

    if (isLogged) {
      return "success";
    } else {
      return this.state.password !== "" || !this.state.triedToSend ? "success" : "error";
    }
  };

  render() {
    console.log(this.props);

    return (
      <section className="form-container">
        <form action="">
          <h1>{this.state.label}</h1>
          {this.props.state.access_token === undefined ? (
            <Form.Item
              hasFeedback={this.state.triedToSend}
              validateStatus={this.state.username !== "" || !this.state.triedToSend ? "success" : "error"}
            >
              <Input
                placeholder="Nombre de usuario"
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                onChange={this.onChangeUserName}
                value={this.state.username}
              />
            </Form.Item>
          ) : (
            ""
          )}
          <Form.Item hasFeedback={this.state.triedToSend} validateStatus={this.checkEmail() || !this.state.triedToSend ? "success" : "error"}>
            <Input
              placeholder="Email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
          </Form.Item>
          <Form.Item hasFeedback={this.state.triedToSend} validateStatus={this.state.name !== "" || !this.state.triedToSend ? "success" : "error"}>
            <Input
              placeholder="Nombre"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </Form.Item>
          <Form.Item hasFeedback={this.state.triedToSend} validateStatus={this.state.surname !== "" || !this.state.triedToSend ? "success" : "error"}>
            <Input
              placeholder="Apellido"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              onChange={e => this.setState({ surname: e.target.value })}
              value={this.state.surname}
            />
          </Form.Item>
          {this.props.state.access_token === undefined ? (
            <Form.Item validateStatus={this.validatePassword}>
              <Input.Password
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Algo que no sea 123..."
                onChange={this.onChangePassword}
                value={this.state.password}
              />
            </Form.Item>
          ) : (
            <>
              <Form.Item>
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Contraseña Actual"
                  onChange={e => this.setState({ currentPassword: e.target.value })}
                  value={this.state.currentPassword}
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Nueva Contraseña"
                  onChange={e => this.setState({ newPassword: e.target.value })}
                  value={this.state.newPassword}
                />
              </Form.Item>
            </>
          )}
          <Button type="primary" onClick={this.sendForm} block>
            {this.state.label}
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
