import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import logo from "./logo.svg";

import "./App.css";

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {this.props.data.loading === true
            ? "Loading"
            : this.props.data.allPosts.edges.map(data => (
                <ul key={data.node.title}>
                  <li>{data.node.title}</li>
                </ul>
              ))}
        </div>
      </div>
    );
  }
}

const repoQuery = gql`
  {
    allPosts {
      edges {
        node {
          title
          body
          author {
            username
          }
        }
      }
    }
  }
`;

const AppWithData = graphql(repoQuery, {
  options: {
    variables: {
      name: "medellinjs"
    }
  }
})(App);

export default AppWithData;
