import actions from "../imports/Actions";
import service from "../imports/Services";

const deleteOneGoal = (data) => async (dispatch) => {
  try {
    let response = await service.request.request.post(
      "goal/deleteOneGoal",
      {
        pageNumber: data.pageNumber,
        type: "goal", //to specify the models in server
        _id: data._id,
      },
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    dispatch(
      actions.dimension.setDimensions.action({
        numberOfPages: response.data.numberOfPages,
        items: response.data.pageOfGoals,
        pageNumber: data.pageNumber,
        sendRequest: true,
      })
    );
    dispatch(actions.unachievedGoals.deleteUnachievedGoal.action({name:data.goalName}))
    dispatch(actions.todayDoneActivity.deleteTodayActivityWhenDeleteGoal.action({name:data.goalName}))
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};

export default deleteOneGoal;
