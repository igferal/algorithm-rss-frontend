import { ADD_USER, LOGOUT_USER, ADD_EXERCISES,REMOVE_EXERCISES ,ADD_USERS} from "../constants";

export function addUser(payload) {
  return { type: ADD_USER, payload };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}

export function removeExercises(){
  return {type : REMOVE_EXERCISES}
}

export function getExercises(payload) {
  return { type: ADD_EXERCISES, payload: payload };
}

export function getUsers(payload) {
  return { type: ADD_USERS, payload: payload };
}

  

