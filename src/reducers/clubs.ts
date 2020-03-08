import {
  GET_CLUB_TYPES,
  EDIT_CLUB,
  GET_CLUB_DETAIL,
  GET_CLUBS
} from "@/constants";

const INITIAL_STATE = {
  types: [],
  clubs: [],
  clubDetail: {}
};

export default function clubs(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLUB_TYPES:
      return {
        ...state,
        types: action.payload
      };
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
        clubDetail: { ...action.clubDetail }
      };
    default:
      return state;
  }
}
