import { combineReducers } from "redux";
import clubs from "./clubs";
import activity from "./activity";
import users from "./users";

export default combineReducers({
  users,
  clubs,
  activity
});
