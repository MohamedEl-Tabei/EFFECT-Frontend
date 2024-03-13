import signup from "../../services/signup";
import request from "../../api";
import addNewActivity from "../../services/addNewActivity";
import getAllActivities from "../../services/getAllActivities";
import getOnePageOfActivities from "../../services/getOnePageOfActivities";
import searchActivities from "../../services/searchActivities";
import updateUser from "../../services/updateUser";
import login from "../../services/login";
import sendResetLink from "../../services/sendResetLink";
import getUnhiddenActivitiesName from "../../services/getUnhiddenActivitiesName";
import addNewDoneActivity from "../../services/addNewDoneActivity";
import setWkUpTime from "../../services/setWkuptime";
import getTodayDoneActivities from "../../services/getTodayDoneActivity";
import deleteWKupTime from "../../services/deleteWKupTime";
import deleteOneTodayActivity from "../../services/deleteOneTodayActivity";
import editWKupTime from "../../services/editWKupTime";
import editDoneActivity from "../../services/editDoneActivity";
import addNewGoal from "../../services/addNewgoal";
import getOnePageOfGoals from "../../services/getOnePageOfGoals";
import searchGoals from "../../services/searchGoals";
import deleteOneActivity from "../../services/deleteOneActivity";
import deleteOneGoal from "../../services/deleteOneGoal";
import editActivity from "../../services/editActivity"
import getUnachievedGoals from "../../services/getUnachievedGoals";
import setDateOfAchievement from "../../services/setDateOfAchievement";
const service = {
  signup,
  request,
  addNewActivity,
  getAllActivities,
  getOnePageOfActivities,
  searchActivities,
  updateUser,
  login,
  sendResetLink,
  getUnhiddenActivitiesName,
  addNewDoneActivity,
  setWkUpTime,
  getTodayDoneActivities,
  deleteWKupTime,
  deleteOneTodayActivity,
  editWKupTime,
  editDoneActivity,
  addNewGoal,
  getOnePageOfGoals,
  searchGoals,
  deleteOneActivity,
  deleteOneGoal,
  editActivity,
  getUnachievedGoals,setDateOfAchievement
};
export default service;
