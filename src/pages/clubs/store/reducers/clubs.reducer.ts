import {GET_CLUBS} from "../actions/clubs.action";

const INITIAL_STATE = {
  clubs: []
}

export default function clubs (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLUBS:
      return {
        ...state,
        clubs: action.payload
      };
    default:
      return state
  }
}
