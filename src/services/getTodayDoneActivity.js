import actions from "../imports/Actions";
import service from "../imports/Services";

const getTodayDoneActivities = (data) => async (dispatch) => {
  try {
    let response = await service.request.request.post(
      "/doneActivity/getDoneActivityByDate",
      { date: Date() },
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    await dispatch(actions.todayDoneActivity.setTodayDoneActivities.action(response.data))
  } catch (error) {
    await dispatch(actions.error.setError.action(error.response.data))
  }
};
export default getTodayDoneActivities;
