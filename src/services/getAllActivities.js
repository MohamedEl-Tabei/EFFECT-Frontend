import services from "../imports/Services/index";
import actions from "../imports/Actions";
const getAllActivities = (data) => async (dispatch) => {
  try {
    let response =await services.request.request.get(
      "/activity/getAllActivities",
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    console.log(await response.data)
   await dispatch(actions.dimension.setDimensions.action({
    type:"Activities",items:response.data
   }))
  } catch (error) {
    dispatch(actions.error.setError.action(error))
  }
};

export default getAllActivities