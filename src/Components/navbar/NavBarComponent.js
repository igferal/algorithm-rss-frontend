import React, { Component } from "react";

import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

class NavBarComponent extends React.Component {
  state = {
    current: "mail"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">
            <Icon type="home" />
            RSA
          </Link>
        </Menu.Item>

        <Menu.Item key="login">
          {" "}
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
