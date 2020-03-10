import * as clubServices from "@/services/clubs";
import {
  CREATE_CLUB,
  DELETE_CLUB_MEMBER,
  EDIT_CLUB, GET_CLUB_APPLY, GET_CLUB_APPROVE,
  GET_CLUB_DETAIL,
  GET_CLUB_TYPES,
  GET_CLUBS, GET_JOIN_CLUB_APPLY,
  GET_MY_CLUBS, JOIN_CLUB
} from "@/constants/index";

import {Club, ClubList, ClubTypes, JoinClub} from "@/types/index";

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

export function getClubApply() {
  return dispatch => {
    clubServices.getClubApply().then(res =>
      dispatch({
        type: GET_CLUB_APPLY,
        payload: res.data
      })
    )
  }
}

export function getJoinClubApply() {
  return dispatch => {
    clubServices.getJoinClubApply().then(res =>
      dispatch({
        type: GET_JOIN_CLUB_APPLY,
        payload: res.data
      })
    )
  }
}

export function getClubApprove() {
  return dispatch => {
    clubServices.getClubApprove().then(res =>
      dispatch({
        type: GET_CLUB_APPROVE,
        payload: res.data
      })
    )
  }
}

export function getJoinClubApprove() {
  return dispatch => {
    clubServices.getJoinClubApprove().then(res =>
      dispatch({
        type: GET_JOIN_CLUB_APPLY,
        payload: res.data
      })
    )
  }
}


export function joinClub(join) {
  console.log(join)
  return dispatch => {
    clubServices.joinClub(join).then(res =>
      dispatch({
        type: JOIN_CLUB,
      })
    ).then(() =>
      dispatch(getClubDetail(join.clubId))
    )
  }
}
