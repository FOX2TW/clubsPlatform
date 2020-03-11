import API from "@/constants/api";
import fetch from "@/utils/request";

export const getUserInfo = userId => {
  const url = API.getUserInfo.replace("<userId>", userId);
  return fetch(url);
};
