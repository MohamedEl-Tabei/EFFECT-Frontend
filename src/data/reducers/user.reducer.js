import actions from "../../imports/Actions";
import service from "../../imports/Services";
let token = document.cookie.slice(4, document.cookie.length);

const initialState = await (async () => {
  try {
    let response = await service.request.request.post(
      "/user/getUserByToken",
      { date: Date() },
      {
        headers: {
          "x-authToken": token,
        },
      }
    );
    return await {
      ...response.data,
      token,
      isAuth: true,
      sendRequest: false,
    };
  } catch (error) {
    return {
      name: "",
      token: "",
      dateOfBirth: "",
      profilePicture: "",
      email: "",
      isAuth: false,
      sendRequest: false,
      wkupTime: "",
      sleepTime:""
    };
  }
})();

/**/

const userReducer = (state = initialState, action) => {
  const { type, data } = action;
  if (type === actions.user.signup.type) {
    return { ...state,...data };
  }
  if (type === actions.user.updateUser.type) {
    return { ...state, ...data };
  }
  return state;
};
export default userReducer;
