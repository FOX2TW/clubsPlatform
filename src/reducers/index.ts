import { combineReducers } from 'redux'
import counter from './counter'
import clubs from "../pages/clubs/store/reducers/clubs.reducer";

export default combineReducers({
  counter,
  clubs
})
