import * as activityService from "@/services/activity";
import {
  CREATE_ACTIVITY,
  GET_ACTIVITIES,
  GET_ACTIVITY_DETAIL
} from "@/constants/index";
import { Activity, Activities } from "@/types/index";

export function createActivity(data: Activity) {
  return dispatch =>
    activityService.fetchCreateAvtivity(data).then(() =>
      dispatch({
        type: CREATE_ACTIVITY
      })
    );
}

export function getActivities() {
  return dispatch =>
    activityService.fetchActivities().then(res =>
      dispatch({
        payload: res.data as Activities,
        type: GET_ACTIVITIES
      })
    );
}

export function getActivityDetail(activityId: string) {
  return dispatch =>
    activityService.fetchActivityDetail(activityId).then(res =>
      dispatch({
        payload: res.data as Activity,
        type: GET_ACTIVITY_DETAIL
      })
    );
}
