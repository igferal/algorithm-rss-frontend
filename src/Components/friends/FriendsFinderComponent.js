import React from "react";
import AuthGuardedComponent from "../AuthGuardedComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table, Divider, Tabs, Icon, Input, Button } from "antd";
import "./friends.css";
import { notify } from "reapop";
import { getUsers, getFriends } from "../../actions";
import Highlighter from "react-highlight-words";

const TabPane = Tabs.TabPane;

class FriendsFinderComponent extends AuthGuardedComponent {
  componentDidMount() {
    super.componentDidMount();
    this.updateRedux();
  }

  state = {
    searchText: ""
  };

  updateRedux = () => {
    this.customAxios
      .get("http://156.35.98.107:5000/usersNotFriend")
      .then(res => {
        this.props.dispatch(getUsers(res.data.users));
      })
      .catch(err => console.log(err));

    this.customAxios
      .get("http://156.35.98.107:5000/friends")
      .then(res => {
        this.props.dispatch(getFriends(res.data.friends));
      })
      .catch(err => console.log(err));
  };

  errorMessage = message => {
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

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  sendFriendshipRequest = user => {
    this.customAxios
      .get(`http://156.35.98.107:5000/addFriend/${user.id}`)
      .then(res => {
        if (res.data.message) {
          this.props.dispatch(
            notify({
              title: "RSA",
              message: "Petición de amistad enviada",
              status: "success",
              dismissible: true,
              dismissAfter: 3000
            })
          );
          this.updateRedux();
        } else {
          this.errorMessage("Ya habías mandado una petición a ese usuario");
        }
      })
      .catch(err => {});
  };

  removeFriendhip = user => {
    this.customAxios
      .get(`http://localhost:156.35.98.107/removeFriendship/${user.id}`)
      .then(res => {
        if (res.data.message) {
          this.props.dispatch(
            notify({
              title: "RSA",
              message: "Amistad eliminada",
              status: "success",
              dismissible: true,
              dismissAfter: 3000
            })
          );
          this.updateRedux();
        } else {
          this.errorMessage("Error eliminando amistad");
        }
      })
      .catch(err => {
        this.errorMessage("Error eliminando amistad");
      });
  };

  findFriendsColumns = () => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Surname",
        dataIndex: "surname",
        key: "surname"
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        ...this.getColumnSearchProps("username")
      },
      {
        title: "Posibilidades",
        key: "action",
        render: user => {
          return (
            <span>
              <a
                onClick={() => {
                  this.sendFriendshipRequest(user);
                }}
              >
                Petición de amistad
              </a>
            </span>
          );
        }
      }
    ];
  };

  friendsColumns = () => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Surname",
        dataIndex: "surname",
        key: "surname"
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        ...this.getColumnSearchProps("username")
      },
      {
        title: "Posibilidades",
        key: "action",
        render: user => {
          return (
            <span>
              <a
                onClick={() => {
                  this.removeFriendhip(user);
                }}
              >
                Eliminar Amigo
              </a>
              <Divider type="vertical" />
              <a onClick={() => {}}>Ver Rankings</a>
            </span>
          );
        }
      }
    ];
  };

  render() {
    const findFriendsColumns = this.findFriendsColumns();
    const friendsColumns = this.friendsColumns();
    return (
      <div className="container">
        <img src={process.env.PUBLIC_URL + "/images/findfriends.svg"} alt="Landing pic" />
        <Tabs defaultActiveKey="2" style={{ width: "100%" }}>
          <TabPane
            tab={
              <span>
                <Icon type="usergroup-add" />
                Todos Los usuarios
              </span>
            }
            key="1"
          >
            <section className="table-friends">
              <h1>Buscar Amigos</h1>
              <Table columns={findFriendsColumns} dataSource={Object.values(this.props.users)} />
            </section>
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="team" />
                Mis Amigos
              </span>
            }
            key="2"
          >
            <section className="table-friends">
              <h1>Mis Amigos</h1>
              <Table columns={friendsColumns} dataSource={Object.values(this.props.friends)} />
            </section>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user, users: state.users, friends: state.friends };
};

export default withRouter(connect(mapStateToProps)(FriendsFinderComponent));
