import { ADD_USER, LOGOUT_USER } from "../constants";

const userInitialState = {
  user: {},
  access_token: undefined,
  refres_token: undefined
};

export default function user(state = userInitialState, action) {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, action.payload);
    case LOGOUT_USER:
      return Object.assign({}, {});
    default:
      return state;
  }
}
