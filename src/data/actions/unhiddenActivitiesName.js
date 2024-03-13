let getUnhiddenActivitiesName = {
  type: "GETUNHIDDENACTIVITIESNAME",
  action: (data) => {
    return { type: "GETUNHIDDENACTIVITIESNAME", data };
  },
};
let addNewUnhiddenActivity = {
  type: "ADDNEWUNHIDDENACTIVITY",
  action: (data) => {
    return { type: "ADDNEWUNHIDDENACTIVITY", data };
  },
};let deleteUnhiddenActivity = {
  type: "DELETEUNHIDDENACTIVITY",
  action: (data) => {
    return { type: "DELETEUNHIDDENACTIVITY", data };
  },
};

let actions = {getUnhiddenActivitiesName,addNewUnhiddenActivity,deleteUnhiddenActivity};
export default actions;
