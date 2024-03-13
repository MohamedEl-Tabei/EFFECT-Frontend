import {
  Button,
  Card,
  CloseButton,
  FormControl,
  Form,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Selectors from "../imports/selectors";
import { useEffect, useRef, useState } from "react";
import service from "../imports/Services";
import actions from "../imports/Actions";
import Components from "../imports/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const ProfileEdit = (props) => {
  ///////////////////////////////////////redux
  const dispatch = useDispatch();
  const user = useSelector((s) => Selectors.user(s));
  const error = useSelector((s) => Selectors.error(s));
  const profilePictureRef = useRef(null);
  ///////////////////////////////////////states
  let [name, setName] = useState(user.name);
  let [profilePicture, setProfilePicture] = useState(user.profilePicture);
  let [birthday, setBirthday] = useState(user.birthday);
  let [email, setEmail] = useState(user.email);
  let [password, setPassword] = useState("");
  let [_password, _setPassword] = useState("");
  let [verifyPassword, setVerifyPassword] = useState(false);
  let [verifyEmail, setVerifyEmail] = useState(false);
  let [vToken, setVToken] = useState("");
  let [isSecretPassword, setIsSecretPassword] = useState(true);
  let [showForgotPass, setShowForgotPass] = useState(false);
  /////////////////////////////////////effect
  useEffect(() => setPassword(_password), [_password]);
  useEffect(
    () => setProfilePicture(user.profilePicture),
    [user.profilePicture]
  );
  /////////////////////////////////////handle
  const onChangeHandler = (e) => {
    e.currentTarget.title === "Name"
      ? setName(e.currentTarget.value)
      : e.currentTarget.title === "Email"
      ? setEmail(e.currentTarget.value)
      : e.currentTarget.title === "Birthday"
      ? setBirthday(e.currentTarget.value)
      : /*e.currentTarget.title==="Password"?*/ setPassword(
          e.currentTarget.value
        );
    dispatch(actions.error.setError.action(""));
  };
  const onSubmitHandler = async (e) => {
    if (verifyPassword) {
      e.preventDefault();
      _setPassword(password); /////////////////////////////////////

      if (email !== user.email) {
        dispatch(actions.user.updateUser.action({ sendRequest: true }));

        let response = await service.request.verifyRequest.post("/sendemail", {
          email,
        });
        if ((await response.data) === "Email has been sent") {
          setVerifyEmail(true);
          setVToken(response.headers["x-vtoken"]);
        }
      } else {
        dispatch(actions.user.updateUser.action({ sendRequest: true }));
        let imageForm = "";
        if (profilePicture !== user.profilePicture) {
          const form = new FormData(e.currentTarget);
          imageForm = form.get("image");
        }
        dispatch(
          service.updateUser({
            name,
            birthday,
            password,
            token: user.token,
            profilePicture,
            imageForm,
          })
        );
      }
    }
  };
  const onSubmitHandlerPassword = async (e) => {
    try {
      e.preventDefault();
      dispatch(actions.user.updateUser.action({ sendRequest: true }));
      let response = await service.request.request.post(
        "/user/verifyUser",
        { password: _password },
        {
          headers: {
            "x-authToken": user.token,
          },
        }
      );
      dispatch(actions.error.setError.action(""));
      setVerifyPassword(await response.data);
      await dispatch(actions.user.updateUser.action({ sendRequest: false }));

      if (!(await response.data)) throw new Error("Invalid password");
    } catch (error) {
      dispatch(actions.error.setError.action(error.message));
    }
  };
  return (
    <div
      className="d-flex aic jcc aic-xxsm-none aic-sm-none flex-column "
      style={{ height: "80vh" }}
    >
      <h3 className="fw-light text-center text-danger">{error}</h3>
      <div
        className="bg-paper-card bg-paper-sm-none d-flex tex-light m-shadow m-shadow-xxsm-none m-shadow-sm-none h-75  rounded-5 flex-column flex-md-row w-50  w-md-75 w-xxsm-100 relative pe-md-5 m-auto"
        style={{ height: "max-content", minWidth: "max-content" }}
      >
        <Form
          className={`modal d-${
            verifyPassword ? "none" : "flex"
          } jcc aic flex-column rounded-5 absolute z-2`}
          style={{ backgroundColor: "white" }}
          onSubmit={(e) => onSubmitHandlerPassword(e)}
        >
          <div className="bg-password" />
          <div className="relative">
            <FormControl
              className="rounded-5 p-4 "
              type={isSecretPassword ? "password" : "text"}
              style={{ width: 300, height: 50 }}
              placeholder="Password"
              value={_password}
              readOnly={user.sendRequest}
              onChange={(e) => {
                dispatch(actions.error.setError.action(""));

                _setPassword(e.currentTarget.value);
              }}
            />

            <div
              className=" absolute pointer h-100 d-flex aic jcc"
              style={{ top: 0, right: 20 }}
              onClick={() => setIsSecretPassword(!isSecretPassword)}
            >
              {user.sendRequest ? (
                <Spinner size="sm" />
              ) : (
                <FontAwesomeIcon icon={isSecretPassword ? faEyeSlash : faEye} />
              )}
            </div>
          </div>
          <div className="d-flex jcc my-3 text-m- ">
            <small
              className="pointer"
              onClick={() => {
                setShowForgotPass(true);
                document.cookie = `eff=;expires=${Date()};`;
                dispatch(
                  actions.user.updateUser.action({
                    token: "",
                    sendRequest: true,
                  })
                );
                dispatch(service.sendResetLink(user.email));
              }}
            >
              I forgot my password
            </small>
          </div>
        </Form>

        <div className="d-flex jcc aic  relative  border-end  border-5 rounded-start-5 border-xxsm-none border-sm-none  p-0 p-md-5 h-100 me-0 me-md-5">
          <div style={{ width: 230 }}>
            <Card.Img
              className="rounded-circle bg-light p-3 m-shadow"
              variant="top"
              src={
                user.profilePicture === profilePicture
                  ? profilePicture
                  : "2922280_27002.jpg"
              }
              style={{ width: 230, height: 230 }}
            />
            <div
              className={`${
                user.profilePicture === profilePicture
                  ? "d-none"
                  : "m-auto shadow wmc p-2 mt-3 rounded-3 bg-light text-center"
              }`}
            >
              {profilePicture.slice(0,20)}
            </div>
            <div
              className={`w-100 h-100 absolute rounded-start-5 bg-upload ${user.sendRequest?"d-none":""}`}
              style={{ top: 0, right: 0 }}
              onClick={() => {
                if (!user.sendRequest) profilePictureRef.current.click();
              }}
            />
          </div>
        </div>

        <Form
          className={`d-${
            verifyPassword ? "flex" : "none"
          }  jcc aic  w-100 py-3 `}
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <input
            name="image"
            ref={profilePictureRef}
            onChange={(e) => {
              if (!e.currentTarget.value.length)
                setProfilePicture(user.profilePicture);
              else {
                setProfilePicture(
                  e.currentTarget.value.slice(
                    e.currentTarget.value.lastIndexOf("\\") + 1
                  )
                );
              }
            }}
            type="file"
            className="d-none"
          />
          <Card.Body className=" d-flex  justify-content-around align-items-around h-100 py-4 flex-column ms-0 px-3 ms-md-5 ">
            {verifyPassword
              ? [
                  { Name: name },
                  { Email: email },
                  { Birthday: birthday },
                  { Password: password },
                ].map((v, i) => (
                  <div className="d-flex mb-3 mobile-d-block" key={i}>
                    <Card.Title
                      className="me-0 me-sm-3 d-flex aic"
                      style={{ width: 130 }}
                    >
                      {Object.keys(v)}
                    </Card.Title>
                    <Card.Title className="fw-light text-center w-100 ">
                      {Object.keys(v)[0] === "Password" ? (
                        <div className="relative">
                          <FormControl
                            type={isSecretPassword ? "password" : "text"}
                            placeholder="Password"
                            style={{ minWidth: 231 }}
                            title={Object.keys(v)}
                            onChange={(e) => onChangeHandler(e)}
                            required
                            value={password}
                          />
                          <div
                            className=" absolute pointer h-100 d-flex aic jcc fs-6"
                            style={{ top: 0, right: 18, color: "#999999" }}
                            onClick={() =>
                              setIsSecretPassword(!isSecretPassword)
                            }
                          >
                            <FontAwesomeIcon
                              size="sm"
                              icon={isSecretPassword ? faEyeSlash : faEye}
                            />
                          </div>
                        </div>
                      ) : (
                        <FormControl
                          value={Object.values(v)}
                          type={
                            Object.keys(v)[0] === "Name"
                              ? "text"
                              : Object.keys(v)[0] === "Email"
                              ? "email"
                              : Object.keys(v)[0] === "Birthday"
                              ? "date"
                              : "password"
                          }
                          style={{ minWidth: 231 }}
                          title={Object.keys(v)}
                          onChange={(e) => onChangeHandler(e)}
                          required
                        />
                      )}
                    </Card.Title>
                  </div>
                ))
              : ""}
            <Button
              type="submit"
              className="btn-m mt-2"
              disabled={
                (name === user.name &&
                  birthday === user.birthday &&
                  email === user.email &&
                  password === _password &&
                  profilePicture === user.profilePicture) ||
                user.sendRequest ||
                error.length
              }
            >
              {user.sendRequest ? <Spinner size="sm" /> : "Save"}
            </Button>
          </Card.Body>
        </Form>
        <div
          className={`modal absolute d-${
            verifyPassword && verifyEmail && vToken.length ? "flex" : "none"
          } w-100 rounded-5 bg-light jcc aic z-2`}
        >
          <Components.VerifyEmailForchange
            email={email}
            vToken={vToken}
            onSubmitHandler={onSubmitHandler}
            setVerifyEmail={setVerifyEmail}
            name={name}
            birthday={birthday}
            password={password}
          />
        </div>
        <div
          className="icon-card z-3 text-dark fs-6 absolute "
          style={{ right: 20, top: 20 }}
          onClick={() => {
            props.setShowEdit(false);
            dispatch(actions.user.updateUser.action({ sendRequest: false }));
          }}
        >
          <CloseButton />
        </div>
      </div>
      <Components.ForgotPassword
        setShowForgotPass={setShowForgotPass}
        showForgotPass={showForgotPass}
      />
    </div>
  );
};
export default ProfileEdit;
/* 


  some thing to add
change Password
verify Email when changed
Enter Password before any update



*/
