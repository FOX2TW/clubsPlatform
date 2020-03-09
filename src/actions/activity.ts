import * as activityService from "@/services/activity";
import { CREATE_ACTIVITY } from "@/constants/index";
import { Activity } from "@/types/index";

export function createActivity(data: Activity) {
  return dispatch =>
    activityService.fetchCreateAvtivity(data).then(res =>
      dispatch({
        type: CREATE_ACTIVITY
      })
    );
}
