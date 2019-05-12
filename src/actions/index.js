import { ADD_USER, LOGOUT_USER, ADD_EXERCISES,REMOVE_EXERCISES ,ADD_USERS, ADD_FRIEND_REQUESTS, ADD_FRIENDS, REMOVE_USERS, ADD_MY_RANKINGS} from "../constants";
import { func } from "prop-types";

export function addUser(payload) {
  return { type: ADD_USER, payload };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}

export function removeExercises(){
  return {type : REMOVE_EXERCISES}
}


export function removeUsers(){
  return {type : REMOVE_USERS}
}

export function getExercises(payload) {
  return { type: ADD_EXERCISES, payload: payload };
}

export function getUsers(payload) {
  return { type: ADD_USERS, payload: payload };
}

export function getFriends(payload) {
  return { type: ADD_FRIENDS, payload: payload };
}

export function getFriendRequests(payload) {
  return { type: ADD_FRIEND_REQUESTS, payload: payload };
}

export function getMyRankings(payload) {
  return { type: ADD_MY_RANKINGS, payload: payload };
}



  

