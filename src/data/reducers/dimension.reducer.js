import actions from "../../imports/Actions";

const initialState = {
  type: "Activities",
  items: [],
  sendRequest: false,
  numberOfPages: 0,
  pageNumber: 1,
  clickEye: false,//for loaders of rename and hidden
};
const dimensionReducer = (state = initialState, action) => {
  let { data, type } = action;
  if (type === actions.dimension.setDimensions.type) {
    while (state.items.length) {
      state.items.pop();
    }
    return { ...state, ...data };
  }
  if (type === actions.dimension.setDimensionType.type) {
    return { ...state, type: data };
  }
  if (type === actions.dimension.setDimensionSendRequest.type) {
    return { ...state, sendRequest: false };
  }
  if (type === actions.dimension.clickEye.type) {
    return { ...state, clickEye: data };
  }
  if (type === actions.dimension.editDimensions.type) {
    let items = [];
    let item;
    while (state.items.length) {
      item = state.items.pop();
      if (item._id !== data._id) {
        items.push(item);
      } else {
        items.push({ ...item, ...data });
      }
    }
    items.sort((a, b) => a.key.name.localeCompare(b.key.name));
    return { ...state, items, clickEye: false };
  }
  return state;
};

export default dimensionReducer;
