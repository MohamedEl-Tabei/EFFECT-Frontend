let getUnachievedGoals = {
  type: "UNACHIEVEDGOALS",
  action: (data) => ({ type: "UNACHIEVEDGOALS", data }),
};
let addUnachievedGoal={
  type:"ADDUNACHIEVEDGOAL",
  action:(data)=>({type:"ADDUNACHIEVEDGOAL",data})
}
let deleteUnachievedGoal={
  type:"DELETEUNACHIEVEDGOAL",
  action:(data)=>({type:"DELETEUNACHIEVEDGOAL",data})
}
let actions = { getUnachievedGoals ,addUnachievedGoal,deleteUnachievedGoal};
export default actions;
