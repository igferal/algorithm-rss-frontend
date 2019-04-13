import React from "react";
import { Menu, Icon, Badge } from "antd";
import { Link } from "react-router-dom";
import { logoutUser, removeExercises } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getExercises, getUsers, getFriends, getFriendRequests, removeUsers } from "../../actions";
import customAxios from "axios";
import "./navbar.css";

const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

class NavBarComponent extends React.Component {
  state = {
    user: {}
  };

  componentDidMount() {
    let isLogged = this.props.state.access_token !== undefined;
    if (isLogged) {
      this.fillRedux();
    }
  }

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  logout = () => {
    this.setState({ user: {} });
    this.props.dispatch(logoutUser());
    this.props.dispatch(removeExercises());
    this.props.dispatch(removeUsers());
    console.log(this.state);
  };

  fillRedux = () => {
    customAxios.defaults.headers.common = { Authorization: `Bearer ${this.props.state.access_token}` };
    customAxios
      .get("http://localhost:5000/exercises")
      .then(res => {
        this.props.dispatch(getExercises(res.data.exercises));
      })
      .catch(err => console.log(err));
    customAxios
      .get("http://localhost:5000/usersNotFriend")
      .then(res => {
        this.props.dispatch(getUsers(res.data.users));
      })
      .catch(err => console.log(err));
    customAxios
      .get("http://localhost:5000/friends")
      .then(res => {
        this.props.dispatch(getFriends(res.data.friends));
      })
      .catch(err => console.log(err));
    customAxios
      .get("http://localhost:5000/friendRequest")
      .then(res => {
        this.props.dispatch(getFriendRequests(res.data.friendRequests));
      })
      .catch(err => console.log(err));
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
              <Link to="friendsRequests">
                <Badge style={{ backgroundColor: '#52c41a' }} offset={[-30,-1]} count={Object.values(this.props.requests).length}>
                  <Icon type="bell" theme="filled" />
                </Badge>
                Peticiones de amistad
              </Link>
            </Menu.Item>
            <Menu.Item key="amigos">
              <Link to="/friends">
                <Icon type="team" /> Amigos
              </Link>
            </Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Otros">
            <Menu.Item key="rankings">
              <Icon type="line-chart" /> Rankings
            </Menu.Item>
            <Menu.Item key="profile">
              <Link to="/profile">
                <Icon type="user" /> Editar Perfil
              </Link>
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
  return { state: state.user, requests: state.friendRequests };
};
export default withRouter(connect(mapStateToProps)(NavBarComponent));
