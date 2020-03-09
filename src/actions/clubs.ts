import * as clubServices from "@/services/clubs";
import {
  GET_CLUB_TYPES,
  GET_CLUB_DETAIL,
  GET_CLUBS,
  EDIT_CLUB,
  GET_MY_CLUBS
} from "@/constants/index";

import { Club, ClubList, ClubTypes } from "@/types/index";

export const getClubTypes = () => {
  return dispatch =>
    clubServices.fetchClubTypes().then(res => {
      dispatch({
        type: GET_CLUB_TYPES,
        payload: res.data as ClubTypes
      });
    });
};

export function getClubs() {
  return dispatch =>
    clubServices.fetchClubs().then(res =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data as ClubList
      })
    );
}

export function getClubDetail(id: number) {
  return dispatch =>
    clubServices.fetchClubDetail(id).then(res =>
      dispatch({
        type: GET_CLUB_DETAIL,
        payload: res.data
      })
    );
}

export function editClub(clubDetail: Club) {
  return {
    type: EDIT_CLUB,
    clubDetail: clubDetail
  };
}

export function getMyclubs(userId: number) {
  return dispatch =>
    clubServices.fetchMyClubs(userId).then(res =>
      dispatch({
        type: GET_MY_CLUBS,
        payload: res.data
      })
    );
}
