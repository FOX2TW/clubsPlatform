import * as clubServices from "@/services/clubs";
import {
  CREATE_CLUB,
  DELETE_CLUB_MEMBER,
  EDIT_CLUB,
  GET_CLUB_DETAIL,
  GET_CLUB_TYPES,
  GET_CLUBS,
  GET_MY_CLUBS
} from "@/constants/index";

import {Club, ClubList, ClubTypes} from "@/types/index";

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
  return dispatch =>
    clubServices.fetchUpdateClub(clubDetail).then(res =>
      dispatch({
        type: EDIT_CLUB,
        clubDetail: clubDetail
      })
    ).then(() => dispatch(getClubs()));
}

export function createClub(club: Club) {
  return dispatch =>
    clubServices.fetchCreateClub(club).then(res =>
      dispatch({
        type: CREATE_CLUB
      })
    ).then(() => dispatch(getClubs()));
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

export function deleteClubMember(userId: number, clubId: number) {
  return dispatch => {
    clubServices.deleteClubMember(userId, clubId).then(res =>
      dispatch({
        type: DELETE_CLUB_MEMBER
      })
    ).then(() =>
      dispatch(getClubDetail(clubId))
    );
  }

}
