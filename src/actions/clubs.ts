import * as clubServices from "@/services/clubs";
import { GET_CLUB_TYPES } from "@/constants";

export const getClubTypes = () => {
  return dispatch =>
    clubServices.fetchClubTypes().then(res => {
      console.log(res);
      dispatch({
        type: GET_CLUB_TYPES,
        payload: res.data
      });
    });
};
