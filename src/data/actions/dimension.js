const setDimensionType = {
  type: "SETDIMENSIONTYPE",
  action: (data) => ({ data, type: "SETDIMENSIONTYPE" }),
};
const setDimensionSendRequest = {
  type: "SETDIMENSIONSENDREQUEST",
  action: (data) => ({ data, type: "SETDIMENSIONSENDREQUEST" }),
};

const setDimensions = {
  type: "SETDIMENTIONS",
  action: (data) => ({ data, type: "SETDIMENTIONS" }),
};
const editDimensions = {
  type: "EDITDIMENTIONS",
  action: (data) => ({ data, type: "EDITDIMENTIONS" }),
};
const clickEye = {
  type: "CLICKEYE",
  action: (data) => ({ data, type: "CLICKEYE" }),
};
const action = {
  setDimensionType,
  setDimensions,
  setDimensionSendRequest,
  editDimensions,
  clickEye,
};
export default action;
