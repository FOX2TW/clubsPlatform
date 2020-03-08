import { GET_CLUB_TYPES } from "@/constants";

const INITIAL_STATE = {
  types: []
};

export default function club(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLUB_TYPES:
      return {
        ...state,
        types: action.payload
      };
    default:
      return state;
  }
}
