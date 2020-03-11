import * as clubServices from "@/services/clubs";
import {
  APPROVE_CLUB,
  APPROVE_JOIN_CLUB,
  CANCEL_JOIN_CLUB,
  CREATE_CLUB,
  DELETE_CLUB,
  DELETE_CLUB_MEMBER,
  EDIT_CLUB,
  GET_CLUB_APPLY,
  GET_CLUB_APPROVE,
  GET_CLUB_DETAIL,
  GET_CLUB_TYPES,
  GET_CLUBS,
  GET_JOIN_CLUB_APPLY,
  GET_JOIN_CLUB_APPROVE,
  GET_MY_CLUBS,
  JOIN_CLUB,
  QUIT_CLUB
} from "@/constants/index";

import { Club, ClubList, ClubTypes, JoinClub } from "@/types/index";

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
        payload: {
          id,
          detail: res.data
        }
      })
    );
}

export function editClub(clubDetail: Club) {
  return dispatch =>
    clubServices
      .fetchUpdateClub(clubDetail)
      .then(res =>
        dispatch({
          type: EDIT_CLUB,
          clubDetail: clubDetail
        })
      )
      .then(() => dispatch(getClubs()));
}

export function createClub(club: Club) {
  return dispatch =>
    clubServices
      .fetchCreateClub(club)
      .then(res =>
        dispatch({
          type: CREATE_CLUB
        })
      )
      .then(() => dispatch(getClubs()));
}

export function getMyclubs() {
  return dispatch =>
    clubServices.fetchMyClubs().then(res =>
      dispatch({
        type: GET_MY_CLUBS,
        payload: res.data
      })
    );
}

export function deleteClubMember(userId: number, clubId: number) {
  return dispatch => {
    clubServices
      .deleteClubMember(userId, clubId)
      .then(res =>
        dispatch({
          type: DELETE_CLUB_MEMBER
        })
      )
      .then(() => dispatch(getClubDetail(clubId)));
  };
}

export function getClubApply() {
  return dispatch => {
    clubServices.getClubApply().then(res =>
      dispatch({
        type: GET_CLUB_APPLY,
        payload: res.data
      })
    );
  };
}

export function getJoinClubApply() {
  return dispatch => {
    clubServices.getJoinClubApply().then(res =>
      dispatch({
        type: GET_JOIN_CLUB_APPLY,
        payload: res.data
      })
    );
  };
}

export function getClubApprove() {
  return dispatch => {
    clubServices.getClubApprove().then(res =>
      dispatch({
        type: GET_CLUB_APPROVE,
        payload: res.data
      })
    );
  };
}

export function getJoinClubApprove() {
  return dispatch => {
    clubServices.getJoinClubApprove().then(res =>
      dispatch({
        type: GET_JOIN_CLUB_APPROVE,
        payload: res.data
      })
    );
  };
}

export function joinClub(join) {
  console.log(join);
  return dispatch => {
    clubServices
      .joinClub(join)
      .then(res =>
        dispatch({
          type: JOIN_CLUB
        })
      )
      .then(() => dispatch(getClubDetail(join.clubId)));
  };
}

export function approveClub(approveResult) {
  return dispatch => {
    clubServices
      .approveClub(approveResult)
      .then(res =>
        dispatch({
          type: APPROVE_CLUB
        })
      )
      .then(() => dispatch(getClubApprove()))
      .then(() => dispatch(getClubs()));
  };
}

export function approveJoinClub(approveResult) {
  return dispatch => {
    clubServices
      .approveJoinClub(approveResult)
      .then(res =>
        dispatch({
          type: APPROVE_JOIN_CLUB
        })
      )
      .then(() => dispatch(getJoinClubApprove()))
      .then(() => dispatch(getClubDetail(approveResult.clubId)));
  };
}

export function cancelCreateClub(id) {
  return dispatch =>
    clubServices
      .fetchDeleteClub(id)
      .then(res =>
        dispatch({
          type: DELETE_CLUB
        })
      )
      .then(() => dispatch(getClubApply()));
}

export function cancelJoinClub(id) {
  return dispatch =>
    clubServices
      .fetchCancelJoinClub(id)
      .then(res =>
        dispatch({
          type: CANCEL_JOIN_CLUB
        })
      )
      .then(() => dispatch(getJoinClubApply()));
}

export function quitClub(clubId) {
  return dispatch =>
    clubServices
      .fetchQuitClub(clubId)
      .then(res =>
        dispatch({
          type: QUIT_CLUB
        })
      )
      .then(() => dispatch(getClubs()));
}
