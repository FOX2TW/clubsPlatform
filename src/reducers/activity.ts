import {
  GET_ACTIVITIES,
  GET_ACTIVITY_DETAIL,
  GET_CLUB_ACTIVITY
} from "@/constants/index";

const INITIAL_STATE = {
  activities: [],
  activity: {},
  clubActivity: {}
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
        activity: {
          ...state.activity,
          [action.payload.activityId]: action.payload.activity
        }
      };
    case GET_CLUB_ACTIVITY:
      return {
        ...state,
        clubActivity: {
          ...state.clubActivity,
          [action.payload.clubId]: action.payload.clubActivity
        }
      };
    default:
      return state;
  }
}
