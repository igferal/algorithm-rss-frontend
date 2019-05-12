import { ADD_MY_RANKINGS , REMOVE_MY_RANKINGS} from "../constants";

export default function userRankings(state = [], action) {
  switch (action.type) {
    case ADD_MY_RANKINGS:
      return { ...action.payload };
    case REMOVE_MY_RANKINGS:
      return [];
    default:
      return state;
  }
}
