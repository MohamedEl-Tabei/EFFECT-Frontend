const user=(state)=>state.userReducer
const error=(state)=>state.errorReducer
const dimension=(state)=>state.dimensionReducer
const unhiddenActivitiesName=(state)=>state.unhiddenActivitiesNameReducer
const todayDoneActivity=(state)=>state.todayDoneActivityReducer
const unachievedGoals=(state)=>state.unachievedGoalsReducer
const Selectors={user,error,dimension,unhiddenActivitiesName,todayDoneActivity,unachievedGoals}


export default Selectors