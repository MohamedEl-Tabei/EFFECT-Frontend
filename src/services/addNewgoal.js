import actions from "../imports/Actions";
import service from "../imports/Services";
const addNewGoal = (data) => async (dispatch) => {
  try {
    await service.request.request.post(
      "/goal/addNewGoal",
      {
        name: data.name,
        expectedDateToAchieve: data.expectedDateToAchieve,
      },
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    //dispatch for add to not acheived yet
    dispatch(actions.unachievedGoals.addUnachievedGoal.action(data))
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};
export default addNewGoal
