import actions from "../imports/Actions";
import services from "../imports/Services";
const editActivity = (data) => async (dispatch) => {
  try {
    await services.request.request.put("/activity/editActivity", data, {
      headers: {
        "x-authToken": data.token,
      },
    });
    await dispatch(actions.dimension.editDimensions.action(data));

    if (data.oldName) {
      await dispatch(
        actions.unhiddenActivitiesNames.deleteUnhiddenActivity.action(
          data.oldName
        )
      );
      let item;
      let items = [];
      while (data.todayDoneActivity.length) {
        item = data.todayDoneActivity.pop();
        if (item.activityName === data.oldName)
          items.push({ ...item, activityName: data.oldName });
        else items.push({ ...item });
      }
      await dispatch(
        actions.todayDoneActivity.setTodayDoneActivities.action({ items })
      );
    }
    if (data.oldColor) {
      let item;
      let items = [];
      while (data.todayDoneActivity.length) {
        item = data.todayDoneActivity.pop();
        if (item.color === data.oldColor)
          items.push({ ...item, color: data.oldColor });
        else items.push({ ...item });
      }
      await dispatch(
        actions.todayDoneActivity.setTodayDoneActivities.action({ items })
      );
    } else {
      if (data.hidden) {
        await dispatch(
          actions.unhiddenActivitiesNames.deleteUnhiddenActivity.action(
            data.key.name
          )
        );
      } else {
        await dispatch(
          actions.unhiddenActivitiesNames.addNewUnhiddenActivity.action(
            data.key.name
          )
        );
      }
    }
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
  }
};
export default editActivity;
