import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./navbar.css";

class NavBarComponent extends React.Component {
  state = {
    logged: localStorage.getItem("toke") !== undefined
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    return localStorage.getItem("token") !== null ? (
      <Menu className="header" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item className="main" key="home">
          <Link to="/">
            <Icon type="home" />
            RSA
          </Link>
        </Menu.Item>
        <Menu.Item key="dashboard">
          <Link to="/dashboard">
            <Icon type="dashboard" />
            Dashboard
          </Link>
        </Menu.Item>

        <Menu.Item
          key="logout"
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          <Link to="/">
            <Icon type="user" />
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu className="header" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item className="main" key="home">
          <Link to="/">
            <Icon type="home" />
            RSA
          </Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">
            <Icon type="user" />
            Iniciar Sesión
          </Link>
        </Menu.Item>
        <Menu.Item key="sigunp">
          <Link to="/signUp">
            <Icon type="user" />
            Registrarse
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
export default NavBarComponent;
