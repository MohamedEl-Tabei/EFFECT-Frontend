import actions from "../imports/Actions";
import service from "../imports/Services";

const searchGoals = (data) => async (dispatch) => {
  try {
    let response = await service.request.request.post(
      "/goal/searchGoals",
      { search: data.search ,pageNumber:data.pageNumber},
      {
        headers: {
          "x-authToken": data.token,
        },
      }
    );
    await dispatch(
      actions.dimension.setDimensions.action({
        sendRequest: true,
        ...response.data,
        pageNumber:data.pageNumber
      })
    );
  } catch (error) {
    await dispatch(
      actions.dimension.setDimensions.action({
        sendRequest: true,

      }))
    dispatch(actions.error.setError.action(error.response.data));
  }
};
export default searchGoals
