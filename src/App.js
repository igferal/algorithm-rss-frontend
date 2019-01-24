import React, { Component } from "react";
import LoginComponent from "./Components/login/LoginComponent";


class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <LoginComponent/>
      </div>
    );
  }
}




export default App;
