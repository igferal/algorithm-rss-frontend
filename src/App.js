import React, { Component } from "react";
import LoginComponent from "./Components/login/LoginComponent";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import SignUpComponent from "./Components/signup/SignUpComponent";
import LandingComponent from "./Components/landing/LandingComponent";
import NavBarComponent from "./Components/navbar/NavBarComponent";

class App extends Component {
  render() {
    return (
      
        <Router>
          <div>
            <NavBarComponent />
            <Switch>
              <Route path="/" component={LandingComponent} exact={true} />
              <Route path="/signup" component={SignUpComponent} exact={true} />
              <Route path="/login" component={LoginComponent} exact={true} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
     
    );
  }
}



export default App;
