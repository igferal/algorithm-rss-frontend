import { combineReducers } from "redux";
import exercises from "./exercise-reducer";
import friends from "./friends-reducer";

import user from "./user-reducer";
import { reducer as notificationsReducer } from "reapop";

export default combineReducers({
  exercises,
  user,
  friends,
  notifications: notificationsReducer()
});
