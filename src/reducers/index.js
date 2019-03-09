import { combineReducers } from "redux";
import exercises from "./exercise-reducer";
import user from "./user-reducer";

export default combineReducers({
  exercises,
  user
});
