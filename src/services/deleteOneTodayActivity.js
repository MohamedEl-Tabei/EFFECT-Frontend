import actions from "../imports/Actions";
import services from "../imports/Services";
const deleteOneTodayActivity = (data) => async (dispatch) => {
  try {
    await services.request.request.post(
      "/doneActivity/deleteOneActivity",
      data,
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    if (data.name==="Sleep") {
      await dispatch(
        actions.todayDoneActivity.deleteAllTodayDoneActivity.action({
          items: [],
        })
      );
      await dispatch(actions.user.updateUser.action({ wkupTime: "" ,sleepTime:""}));
    } else
      await dispatch(
        actions.todayDoneActivity.deleteOneTodayActivity.action(data._id)
      );
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};

export default deleteOneTodayActivity;
