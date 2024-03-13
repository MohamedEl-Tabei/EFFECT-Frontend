import actions from "../imports/Actions";
import service from "../imports/Services";

const deleteOneActivity = (data) => async (dispatch) => {
  try {
    let response = await service.request.request.post(
      "activity/deleteOneActivity",
      {
        pageNumber: data.pageNumber,
        type: "activity", //to specify the models in server
        _id: data._id,
      },
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    await dispatch(
      actions.dimension.setDimensions.action({
        numberOfPages: response.data.numberOfPages,
        items: response.data.pageOfActivities,
        pageNumber: data.pageNumber,
        sendRequest: true,
      })
    );
    await dispatch(
      actions.todayDoneActivity.deleteTodayDoneActivityByName.action(data.name)
    )
    await dispatch(
      actions.unhiddenActivitiesNames.deleteUnhiddenActivity.action(data.name)
    )
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};

export default deleteOneActivity;
