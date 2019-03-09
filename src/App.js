import React, { Component } from "react";
import LoginComponent from "./Components/login/LoginComponent";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import SignUpComponent from "./Components/signup/SignUpComponent";
import LandingComponent from "./Components/landing/LandingComponent";
import NavBarComponent from "./Components/navbar/NavBarComponent";
import DashboardComponent from "./Components/dashboard/dashboard";
import KnapSackComponent from "./Components/problems/knapback/knapsack";
import { Provider } from "react-redux";
import PropTypes from 'prop-types'

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <NavBarComponent />
        <Switch>
          <Route path="/" component={LandingComponent} exact={true} />
          <Route path="/signup" component={SignUpComponent} exact={true} />
          <Route path="/login" component={LoginComponent} exact={true} />
          <Route path="/dashboard" component={DashboardComponent} exact={true} />
          <Route path="/knapsack" component={KnapSackComponent} exact={true} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;
