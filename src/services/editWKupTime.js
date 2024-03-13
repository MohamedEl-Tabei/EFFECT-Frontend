import actions from "../imports/Actions";
import service from "../imports/Services";
const editWKupTime = (data) => async (dispatch) => {
  try {
    await service.request.request.put(
      "/doneActivity/editWKupTime",
      { time: data.time, date: Date() },
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    await dispatch(actions.todayDoneActivity.editWKupTime.action(data.time))
    await dispatch(actions.user.updateUser.action({wkupTime:data.time}))
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};
export default editWKupTime