import actions from "../actions/unhiddenActivitiesName";
let initialState = {
  names: [],
  forFirst: true,
};
const unhiddenActivitiesNameReducer = (state = initialState, action) => {
  let { type, data } = action;
  if (type === actions.getUnhiddenActivitiesName.type) {
    return { ...data, forFirst: false };
  }
  if (type === actions.addNewUnhiddenActivity.type) {
    let newList = [];
    while (state.names.length) {
      newList.push(state.names.pop());
    }
    newList.push({ key: { name: data } });
    return {
      names: newList.sort((a, b) => a.key.name.localeCompare(b.key.name)),
      forFirst: false,
    };
  }
  if (type === actions.deleteUnhiddenActivity.type) {
    let newList = [];
    let name = "";
    while (state.names.length) {
      name = state.names.pop();
      if (name.key.name !== data) {
        newList.push(name);
      }
    }
    return {
      names: newList.sort((a, b) => a.key.name.localeCompare(b.key.name)),
      forFirst: false,
    };
  }
  return state;
};

export default unhiddenActivitiesNameReducer;
