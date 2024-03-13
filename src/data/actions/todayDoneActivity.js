const setTodayDoneActivities = {
  type: "TODAYDONEACTIVITIES",
  action: (data) => {
    return { type: "TODAYDONEACTIVITIES", data };
  },
};
const deleteAllTodayDoneActivity = {
  type: "DELETEALLTODAYDONEACTIVITY",
  action: (data) => {
    return { type: "DELETEALLTODAYDONEACTIVITY", data };
  },
};
const deleteTodayDoneActivityByName = {
  type: "DELETETODAYDONEACTIVITYBYNAME",
  action: (data) => {
    return { type: "DELETETODAYDONEACTIVITYBYNAME", data };
  },
};
const deleteOneTodayActivity = {
  type: "DELETEONETODAYDONEACTIVITY",
  action: (data) => {
    return { type: "DELETEONETODAYDONEACTIVITY", data };
  },
};
const editWKupTime = {
  type: "EDITWAKEUPTIME",
  action: (data) => {
    return { type: "EDITWAKEUPTIME", data };
  },
};
const editDoneActivity = {
  type: "EDITDONEACTIVITY",
  action: (data) => {
    return { type: "EDITDONEACTIVITY", data };
  },
};
const deleteTodayActivityWhenDeleteGoal = {
  type: "DELETEONETODAYDONEACTIVITYWHENDELETEGOAL",
  action: (data) => {
    return { type: "DELETEONETODAYDONEACTIVITYWHENDELETEGOAL", data };
  },
};
const actions = {
  setTodayDoneActivities,
  deleteAllTodayDoneActivity,
  deleteOneTodayActivity,
  editWKupTime,
  editDoneActivity,
  deleteTodayDoneActivityByName,
  deleteTodayActivityWhenDeleteGoal
};
export default actions;
