import API from "@/constants/api";
import fetch from "@/utils/request";

export const fetchClubTypes = () => {
  return fetch(API.getClubType);
};

export const fetchMyClubs = () => {
  return fetch(API.getInvolvedClubs);
};

export const fetchClubs = () => {
  return fetch(API.getClubs);
};

export const fetchClubDetail = id => {
  const url = API.getClubDetailInfo.replace("<clubId>", id);
  return fetch(url);
};

export const fetchCreateClub = club => {
  return fetch(API.createClub, { method: "POST", data: club });
};

export const fetchUpdateClub = club => {
  return fetch(API.updateClub, { method: "PUT", data: club });
};

export const fetchDeleteClub = id => {
  const url = API.deleteClub.replace("<clubId>", id);
  return fetch(url, { method: "DELETE" });
};

export const deleteClubMember = (userId, clubId) => {
  const url = API.deleteClubMember
    .replace("<userId>", userId)
    .replace("<clubId>", clubId);
  return fetch(url, { method: "DELETE" });
};

export const getClubApply = () => {
  return fetch(API.getClubApply);
};

export const getJoinClubApply = () => {
  return fetch(API.getJoinClubApply);
};

export const getClubApprove = () => {
  return fetch(API.getClubApprove);
};

export const getJoinClubApprove = () => {
  return fetch(API.getJoinClubApprove);
};

export const joinClub = join => {
  return fetch(API.joinClub, { method: "POST", data: join });
};

export const approveClub = approveResult => {
  return fetch(API.approveClub, { method: "PUT", data: approveResult });
};

export const approveJoinClub = approveResult => {
  return fetch(API.approveJoinClub, { method: "PUT", data: approveResult });
};

export const fetchCancelJoinClub = id => {
  const url = API.cancelJoinClub.replace("<clubId>", id);
  return fetch(url, { method: "DELETE" });
};

export const fetchQuitClub = id => {
  const url = API.quitClub.replace("<clubId>", id);
  return fetch(url, { method: "DELETE" });
};
