import { Component } from "react";
import customAxios from "axios";

class AuthGuardedComponent extends Component {
  constructor(props) {
    super(props);
    this.customAxios = customAxios;
  }

  componentDidMount() {
    let isLogged = this.props.state.access_token !== undefined;
    if (!isLogged) {
      this.props.history.push("/");
    } else {
      customAxios.defaults.headers.common = { Authorization: `Bearer ${this.props.state.access_token}` };
    }
  }
}

export default AuthGuardedComponent;
