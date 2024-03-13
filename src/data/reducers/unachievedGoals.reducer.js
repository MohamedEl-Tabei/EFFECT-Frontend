import actions from "../../imports/Actions";

const initialState = {
  names: [],
  firstTime: true,
};

const unachievedGoalsReducer = (state = initialState, action) => {
  let { type, data } = action;
  if (type === actions.unachievedGoals.getUnachievedGoals.type) {
    let names = [];
    while (data.length) {
      names.push(data.pop().key.name);
    }
    return { names, firstTime: false };
  }
  if (type === actions.unachievedGoals.addUnachievedGoal.type) {
    state.names.push(data.name);
  }
  if (type === actions.unachievedGoals.deleteUnachievedGoal.type) {
    let names = [];
    let name = "";
    while (state.names.length) {
      name = state.names.pop();
      if (name !== data.name) names.push(name);
    }
    return { ...state,names};
  }
  return { ...state };
};

export default unachievedGoalsReducer;
