import actions from "../imports/Actions";
import service from "../imports/Services";
const addNewDoneActivity = (data) => async (dispatch) => {
  try {
 
    let response=await service.request.request.post(
      "/doneActivity/addNewDoneActivity",
      data,
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    await dispatch(actions.todayDoneActivity.setTodayDoneActivities.action([{...data,...response.data}]))
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};
export default addNewDoneActivity;
