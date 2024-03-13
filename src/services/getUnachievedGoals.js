import actions from "../imports/Actions";
import services from "../imports/Services";
const getUnachievedGoals = (data) => async (dispatch) => {
  try {
    let response = await services.request.request.get(
      "goal/getUnachievedGoals",
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    dispatch(actions.unachievedGoals.getUnachievedGoals.action(response.data));
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};
export default getUnachievedGoals;
