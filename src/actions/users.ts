import * as usersService from "@/services/users";
import { GET_USER_INFO } from "@/constants/index";
import { User } from "@/types/index";

export function getUserInfo(userId: string) {
  return dispatch =>
    usersService.getUserInfo(userId).then(res =>
      dispatch({
        type: GET_USER_INFO,
        payload: res.data as User
      })
    );
}
