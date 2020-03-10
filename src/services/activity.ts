import API from "@/constants/api";
import fetch from "@/utils/request";

export const fetchCreateAvtivity = data => {
  return fetch(API.createActivity, { method: "POST", data });
};

export const fetchActivities = () => {
  return fetch(API.getActivities);
};

export const fetchActivityDetail = activityId => {
  const url = API.getActivityDetail.replace("<activityId>", activityId);
  return fetch(url);
};

export const joinActivity = activityId => {
  const url = API.joinActivity.replace("<activityId>", activityId);
  return fetch(url, { method: "PUT" });
};

export const cancelJoinActivity = activityId => {
  const url = API.cancelJoinActivity.replace("<activityId>", activityId);
  return fetch(url, { method: "PUT" });
};
