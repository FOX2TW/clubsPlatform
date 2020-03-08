import * as activityService from "@/services/activity";
import { CREATE_ACTIVITY } from "@/constants";
import { Activity } from "@/types";

export function createActivity(data: Activity) {
  return dispatch =>
    activityService.fetchCreateAvtivity(data).then(res =>
      dispatch({
        type: CREATE_ACTIVITY
      })
    );
}
