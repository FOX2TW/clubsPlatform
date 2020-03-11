import {
  GET_CLUB_TYPES,
  EDIT_CLUB,
  GET_CLUB_DETAIL,
  GET_CLUBS,
  GET_MY_CLUBS,
  GET_CLUB_APPLY,
  GET_JOIN_CLUB_APPLY,
  GET_CLUB_APPROVE,
  GET_JOIN_CLUB_APPROVE
} from "@/constants/index";

const INITIAL_STATE = {
  types: [],
  clubs: [],
  clubDetail: {},
  myClubs: [],
  clubApply: [],
  joinClubApply: [],
  clubApprove: [],
  joinClubApprove: []
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
        clubDetail: {
          ...state.clubDetail,
          [action.payload.id]: action.payload.detail
        }
      };
    case GET_MY_CLUBS:
      return {
        ...state,
        myClubs: action.payload
      };
    case GET_CLUB_APPLY:
      return {
        ...state,
        clubApply: action.payload
      };
    case GET_JOIN_CLUB_APPLY:
      return {
        ...state,
        joinClubApply: action.payload
      };
    case GET_CLUB_APPROVE:
      return {
        ...state,
        clubApprove: action.payload
      };
    case GET_JOIN_CLUB_APPROVE:
      return {
        ...state,
        joinClubApprove: action.payload
      };
    default:
      return state;
  }
}
