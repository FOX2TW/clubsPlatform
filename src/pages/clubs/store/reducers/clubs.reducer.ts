import {EDIT_CLUB, GET_CLUB_DETAIL, GET_CLUBS} from "../actions/clubs.action";

const INITIAL_STATE = {
  clubs: [],
  clubDetail: {}
};

export default function clubs (state = INITIAL_STATE, action) {
  console.log(action, state)
  switch (action.type) {
    case GET_CLUBS:
      return {
        ...state,
        clubs: action.payload
      };
    case GET_CLUB_DETAIL:
      return {
        ...state,
        clubDetail: action.payload
      };
    case EDIT_CLUB:
      return {
        ...state,
        clubDetail: {...action.clubDetail}
      }
    default:
      return state
  }
}
