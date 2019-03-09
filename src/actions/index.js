import { ADD_USER, LOGOUT_USER } from "../constants";

export function addUser(payload) {
  return { type: ADD_USER, payload };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}
