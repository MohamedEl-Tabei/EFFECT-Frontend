import actions from "../../imports/Actions/index";
const initialState = {
  items: [],
  date: Date(),
};
const todayDoneActivityReducer = (state = initialState, action) => {
  let { type, data } = action;
  if (type === actions.todayDoneActivity.setTodayDoneActivities.type) {
    let items = [];
    let sleepTime = undefined;

    while (state.items.length) {
      let item = state.items.pop();
      if (item.activityName === "Sleep") {
        sleepTime = item;
      } else items.push(item);
    }
    while (data.length) {
      let item = data.pop();
      if (item.activityName === "Sleep") {
        sleepTime = item;
      } else items.push(item);
    }
    items.sort((a, b) => a.startTime.localeCompare(b.startTime));
    if (sleepTime) items.unshift(sleepTime);
    return {
      ...state,
      items,
    };
  } else if (
    type === actions.todayDoneActivity.deleteAllTodayDoneActivity.type
  ) {
    while (state.items.length) {
      state.items.pop();
    }
    return { ...state, ...data };
  } else if (type === actions.todayDoneActivity.deleteOneTodayActivity.type) {
    let items = [];
    let item;
    let sleepTime = undefined;
    while (state.items.length) {
      item = state.items.pop();
      if (item._id !== data) {
        if (item.activityName === "Sleep") {
          sleepTime = item;
        } else items.push(item);
      }
    }
    items.sort((a, b) => a.startTime.localeCompare(b.startTime));
    if (sleepTime) items.unshift(sleepTime);
    return {
      ...state,
      items,
    };
  } else if (type === actions.todayDoneActivity.editWKupTime.type) {
    let items = [];
    let item;
    let sleepItem=undefined
    while (state.items.length) {
      item = state.items.pop();

      if (item.activityName=== "Wake Up") {
        items.push({ ...item, startTime: data, endTime: data });
      } else {

        if (item.startTime >= data&&item.activityName!=="Sleep") items.push(item);
        else sleepItem=item
      }
    }
    items.sort((a, b) => a.startTime.localeCompare(b.startTime))
    items.unshift(sleepItem)
    return {
      ...state,
      items ,
    };
  } else if (type === actions.todayDoneActivity.editDoneActivity.type) {
    let items = [];
    let item;
    let sleepTime = undefined;
    while (state.items.length) {
      item = state.items.pop();
      if (item.activityName === "Sleep") {
        if (item._id === data._id) {
          sleepTime = { ...item, ...data };
        } else {
          sleepTime = item;
        }
      } else {
        if (item._id === data._id) {
          items.push({ ...item, ...data });
        } else {
          items.push(item);
        }
      }
    }
    items.sort((a, b) => a.startTime.localeCompare(b.startTime));
    items.unshift(sleepTime);
    return {
      ...state,
      items,
    };
  }
  if (type === actions.todayDoneActivity.deleteTodayDoneActivityByName.type) {
    let items = [];
    let item;
    let sleepTime = undefined;
    while (state.items.length) {
      item = state.items.pop();
      if (item.activityName !== data) {
        if (item.activityName === "Sleep") sleepTime = item;
        else items.push(item);
      }
    }
    items.sort((a, b) => a.startTime.localeCompare(b.startTime));
    items.unshift(sleepTime);
    return {
      ...state,
      items,
    };
  }
  if (
    type === actions.todayDoneActivity.deleteTodayActivityWhenDeleteGoal.type
  ) {
    let deleteDoneActivityId = [];
    let goalName = data.name;
    let related = state.items.filter((i) => i.relatedGoals.includes(goalName));
    related.forEach((r) => {
      let index = state.items.indexOf(r);
      let newRG = [];
      while (state.items[index].relatedGoals.length) {
        let rg = state.items[index].relatedGoals.pop();
        if (rg !== goalName) newRG.push(rg);
      }
      while (newRG.length) {
        state.items[index].relatedGoals.push(newRG.pop());
      }
      if (!state.items[index].relatedGoals.length) {
        deleteDoneActivityId.push(r._id);
      }
    });
    if (deleteDoneActivityId.length) {
      let newItems = [];
      while (state.items.length) {
        let item = state.items.pop();
        if (!deleteDoneActivityId.includes(item._id)) {
          newItems.push(item);
        }
      }
      return { ...state, items: newItems };
    }
  }
  return state;
};
export default todayDoneActivityReducer;
