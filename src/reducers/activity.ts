import { GET_ACTIVITIES, GET_ACTIVITY_DETAIL } from "@/constants/index";

const INITIAL_STATE = {
  activities: [],
  activity: {}
};

export default function activity(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      };
    case GET_ACTIVITY_DETAIL:
      return {
        ...state,
        activity: action.payload
      };
    default:
      return state;
  }
}
