import { ADD_USERS, REMOVE_USERS } from "../constants";

export default function users(state = [], action) {
  switch (action.type) {
    case ADD_USERS:
      return { ...action.payload };
    case REMOVE_USERS:
      return [];
    default:
      return state;
  }
}
