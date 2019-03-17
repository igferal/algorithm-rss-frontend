import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./navbar.css";

const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

class NavBarComponent extends React.Component {
  state = {
    user: {}
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  logout = () => {
    this.setState({ user: {} });
    this.props.dispatch(logoutUser());
    console.log(this.state);
  };

  render() {
    let isLogged = this.props.state.access_token !== undefined;

    return isLogged ? (
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
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="user" />
              {`${this.props.state.user.name} - ${this.props.state.user.surname}`}
            </span>
          }
        >
          <MenuItemGroup title="Amigos">
            <Menu.Item key="peticiones">
              <Icon type="usergroup-add" /> Peticiones de amistad
            </Menu.Item>
            <Menu.Item key="amigos">
              <Icon type="team" /> Amigos
            </Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Otros">
            <Menu.Item key="rankings">
              <Icon type="line-chart" /> Rankings
            </Menu.Item>
            <Menu.Item key="profile">
              <Icon type="user" /> Editar Perfil
            </Menu.Item>
            <Menu.Item key="logout" onClick={this.logout}>
              <Link to="/">
                <Icon type="disconnect" />
                Logout
              </Link>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
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
const mapStateToProps = state => {
  return { state: state.user };
};
export default withRouter(connect(mapStateToProps)(NavBarComponent));
