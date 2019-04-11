import {  REMOVE_USERS, ADD_FRIEND_REQUESTS } from "../constants";

export default function friendRequests(state = [], action) {
  switch (action.type) {
    case ADD_FRIEND_REQUESTS:
      return { ...state, ...action.payload };
    case REMOVE_USERS:
      return [];
    default:
      return state;
  }
}
