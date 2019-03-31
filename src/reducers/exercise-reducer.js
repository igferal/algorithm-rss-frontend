import { ADD_EXERCISES,REMOVE_EXERCISES } from "../constants";

export default function exercises(state = [], action) {
  switch (action.type) {
    case ADD_EXERCISES:
      return { ...state, ...action.payload };
    case REMOVE_EXERCISES:
      return [];
    default:
      return state;
  }
}
