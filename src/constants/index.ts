// actions
export const GET_CLUB_TYPES = "GET_CLUB_TYPES";
export const GET_CLUBS = "GET_CLUBS";
export const GET_CLUB_DETAIL = "GET_CLUB_DETAIL";
export const EDIT_CLUB = "EDIT_CLUB";
export const GET_MY_CLUBS = "GET_MY_CLUBS";
export const CREATE_CLUB = "CREATE_CLUB";
export const DELETE_CLUB_MEMBER = "DELETE_CLUB_MEMBER";
export const GET_CLUB_APPLY = "GET_CLUB_APPLY";
export const GET_JOIN_CLUB_APPLY = "GET_JOIN_CLUB_APPLY";
export const GET_CLUB_APPROVE = "GET_CLUB_APPROVE";
export const GET_JOIN_CLUB_APPROVE = "GET_JOIN_CLUB_APPROVE";
export const JOIN_CLUB = "JOIN_CLUB";
export const APPROVE_CLUB = "APPROVE_CLUB";
export const APPROVE_JOIN_CLUB = "APPROVE_JOIN_CLUB";
export const DELETE_CLUB = "DELETE_CLUB";
export const CANCEL_JOIN_CLUB = "CANCEL_JOIN_CLUB";
export const QUIT_CLUB = "QUIT_CLUB";
export const EDIT_ACTIVITY = "EDIT_ACTIVITY";

export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITY_DETAIL = "GET_ACTIVITY_DETAIL";

export const JOIN_ACTIVITY = "JOIN_ACTIVITY";
export const CANCEL_JOIN_ACTIVITY = "CANCEL_JOIN_ACTIVITY";
export const GET_CLUB_ACTIVITY = "GET_CLUB_ACTIVITY";
export const GET_USER_INFO = "GET_USER_INFO";

// page constant

export const ACTIVITY_STATUS = {
  0: "", // 正在招募中未开始（当前时间在招募时间之前）
  1: "", // 招募结束（当前时间在招募时间跟开始时间之间）
  2: "", // 已开始 （当前时间在开始时间跟结束时间之间）
  3: "" // 已结束 （当前时间在结束时间之后）
};
