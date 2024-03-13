import actions from "../imports/Actions";
import service from "../imports/Services";

const setDateOfAchievement = (data) => async (dispatch) => {
  try {
    let response = await service.request.request.post(
      "goal/setDateOfAchievement",
      {
        pageNumber: data.pageNumber,
        goalId: data._id,
        date: data.date,
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
    if (data.date === "Not yet.")
      dispatch(
        actions.unachievedGoals.addUnachievedGoal.action({
          name: data.goalName,
        })
      );
    else
      dispatch(
        actions.unachievedGoals.deleteUnachievedGoal.action({
          name: data.goalName,
        })
      );
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};

export default setDateOfAchievement;
