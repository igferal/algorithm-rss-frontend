import React from "react";
import NotificationsSystem from "reapop";
import theme from "reapop-theme-wybo";
import LoginComponent from "../Components/login/LoginComponent";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import SignUpComponent from "../Components/signup/SignUpComponent";
import LandingComponent from "../Components/landing/LandingComponent";
import NavBarComponent from "../Components/navbar/NavBarComponent";
import DashboardComponent from "../Components/dashboard/dashboard";
import KnapSackComponent from "../Components/problems/knapsack/knapsack";
import DefaultProblem from "../Components/problems/default-problem";
import FriendsFinderComponent from "../Components/friends/FriendsFinderComponent";
import FriendsRequestComponent from "../Components/friends/FriendsRequestComponent";
import UserRankings from "../Components/rankings/UserRankings";
import ExerciseRankings from "../Components/rankings/ExerciseRankings";
import KnapsackVisualizator from "../Components/visualization/knapsack/KnapsackVisualizator";

export const DefaultRoot = () => (
  <Router>
    <div>
      <NotificationsSystem theme={theme} />
      <NavBarComponent />
      <Switch>
        <Route path="/" component={LandingComponent} exact={true} />
        <Route path="/signup" component={SignUpComponent} exact={true} />
        <Route path="/profile" component={SignUpComponent} exact={true} />
        <Route path="/login" component={LoginComponent} exact={true} />
        <Route path="/dashboard" component={DashboardComponent} exact={true} />
        <Route path="/myRankings" component={UserRankings} exact={true} />
        <Route path="/exerciseRankings" component={ExerciseRankings} exact={true} />
        <Route path="/friends" component={FriendsFinderComponent} exact={true} />
        <Route path="/friendsRequests" component={FriendsRequestComponent} exact={true} />
        <Route path="/knap" component={KnapSackComponent} exact={true} />
        <Route path="/knap-visualizer" component={KnapsackVisualizator} exact={true} />
        <Route path="/resolveExercise" component={() => <DefaultProblem game={KnapSackComponent} />} exact={true} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
);
