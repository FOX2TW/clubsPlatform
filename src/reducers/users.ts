import { GET_USER_INFO } from "@/constants/index";

const INITIAL_STATE = {
  userInfo: {}
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
}
