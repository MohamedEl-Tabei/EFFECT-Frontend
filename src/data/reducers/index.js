import userReducer from "./user.reducer";
import errorReducer from "./error.reducer";
import dimensionReducer from "./dimension.reducer";
import unhiddenActivitiesNameReducer from "./unhiddenActivities.reducer";
import todayDoneActivityReducer from "./todayDoneActivity.reducer";
import unachievedGoalsReducer from "./unachievedGoals.reducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  userReducer,
  errorReducer,
  dimensionReducer,
  unhiddenActivitiesNameReducer,
  todayDoneActivityReducer,
  unachievedGoalsReducer
});
export default rootReducer;
