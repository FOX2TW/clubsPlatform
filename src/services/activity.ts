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
