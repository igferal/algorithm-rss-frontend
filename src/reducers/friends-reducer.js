import { ADD_USERS,REMOVE_USERS } from "../constants";

export default function friends(state = [], action) {
  switch (action.type) {
    case ADD_USERS:
      return { ...state, ...action.payload };
    case REMOVE_USERS:
      return [];
    default:
      return state;
  }
}
