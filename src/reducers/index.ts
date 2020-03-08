import { combineReducers } from "redux";

import clubs from "../pages/clubs/store/reducers/clubs.reducer";
import club from "./clubs";

export default combineReducers({
  club,
  clubs
});
