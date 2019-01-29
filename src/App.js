import React, { Component } from "react";
import LoginComponent from "./Components/login/LoginComponent";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import SignUpComponent from "./Components/signup/SignUpComponent";

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <Router>
        <Switch>
          <Route path="/" component={LoginComponent} exact={true} />
          <Route path="/signup" component={SignUpComponent} exact={true} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
