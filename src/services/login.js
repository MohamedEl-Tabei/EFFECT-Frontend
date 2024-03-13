import service from "../imports/Services";
import actions from "../imports/Actions";
const login = (data) => async (dispatch) => {
  try {
    let response = await service.request.request.post("/user/login", {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      date:Date()
    });
    let token = await response.headers["x-authtoken"];
    document.cookie = `eff=${await token};expires=${Date().replace(
      new Date().getFullYear(),
      new Date().getFullYear() + 10
    )}`;
    dispatch(
      actions.user.updateUser.action({
        ...data,
        ...response.data,
        token,
        isAuth: true,
        sendRequest:false
      })
    );
  } catch (error) {
    dispatch(actions.error.setError.action(error.response.data));
    dispatch(actions.user.updateUser.action({sendRequest:false}));

  }
};

export default login;
