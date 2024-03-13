import service from "../imports/Services";
import actions from "../imports/Actions";
const setWkUpTime = (data) => async (dispatch) => {
  try {
    let response=await service.request.request.post(
      "/doneActivity/setWkupTime",
      {
        wakeup: {
          date: Date(),
          endTime: data.wkupTime,
          startTime: data.wkupTime,
        },
        sleep: {
          date: Date(),
          endTime: data.sleepTime,
          startTime: data.sleepTime,
        },
      },
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    await dispatch(
      actions.user.updateUser.action({
        wkupTime: data.wkupTime,
        sleepTime: data.sleepTime,
      })
    );
    await dispatch(
      actions.todayDoneActivity.setTodayDoneActivities.action([
        {
          activityName: "Wake Up",
          startTime: data.wkupTime,
          endTime: data.wkupTime,
          note: "Good morning",
          date: Date().slice(0, 15),
          emotion: 0,
          relatedGoals: [" "],
        },
      ])
    );
    await dispatch(
      actions.todayDoneActivity.setTodayDoneActivities.action([
        {
          activityName: "Sleep",
          startTime: data.sleepTime,
          endTime: data.sleepTime,
          note: "Good night",
          date: Date().slice(0, 15),
          emotion: 0,
          relatedGoals: [" "],
          _id:response.data.sleepId
        },
      ])
    );
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};
export default setWkUpTime;
