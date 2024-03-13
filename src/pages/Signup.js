import { Button, Spinner, Form } from "react-bootstrap";
import Components from "../imports/components";
import NotFound from "./NotFound"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import service from "../imports/Services";
import Selectors from "../imports/selectors";
import actions from "../imports/Actions";
const Signup = () => {
  /////////////////////////////////////////         States
  let [showLoaderBtn, setShowLoaderBtn] = useState(false);
  let [showVerifyEmailComp, setShowVerifyEmailComp] = useState(false);
  let [showLoaderEmail, setShowLoaderEmail] = useState(false);
  let [emailIsUsed, setEmailIsUsed] = useState(true);
  let [birthday, setBirthday] = useState("");
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [rememberMe, setRememberMe] = useState(false);
  let [showPass, setShowPass] = useState(false);
  let [btnSubmitDisabled, setBtnSubmitDisabled] = useState(false);
  let [birthdayError, setBirthdayError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [nameError, setNameError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [birthdayMounted, setBirthdayMounted] = useState(false);
  let [emailMonted, setEmailMounted] = useState(false);
  let [nameMounted, setNameMounted] = useState(false);
  let [passwordMounted, setPasswordMounted] = useState(false);
  let [vToken, setVToken] = useState("");
  /////////////////////////////////////////         Redux
  let dispatch = useDispatch();
  let error = useSelector((s) => Selectors.error(s));
  let user= useSelector(s=>Selectors.user(s))
  ///////////////////////////////////////// style

  /////////////////////////////////////////         Refs
  const refPassword = useRef();
  /////////////////////////////////////////         Effects
  useEffect(() => {
    if (passwordMounted) {
      if (passwordError.length) {
        refPassword.current.style.borderColor = "#ea5d6d";
        refPassword.current.style.boxShadow =
          "0 0 0 .25rem rgba(var(--bs-danger-rgb),.25)";
      } else {
        refPassword.current.style.borderColor = "#2dbab3a6";
        refPassword.current.style.boxShadow =
          " 0 0 0 0.25rem rgb(45 186 179 / 27%)";
      }
    }
  }, [passwordError, refPassword, passwordMounted]);
  useEffect(() => {
    setBtnSubmitDisabled(
      emailError.length ||
        nameError.length ||
        birthdayError.length ||
        passwordError.length ||
        !emailMonted ||
        !nameMounted ||
        !birthdayMounted ||
        !passwordMounted ||
        emailIsUsed ||
        showLoaderBtn ||
        showLoaderEmail
    );
  }, [
    emailError,
    nameError,
    birthdayError,
    passwordError,
    emailMonted,
    nameMounted,
    birthdayMounted,
    passwordMounted,
    emailIsUsed,
    showLoaderBtn,
    showLoaderEmail,
  ]);
  useEffect(() => {
    //birthday validator
    if (birthdayMounted) {
      if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(birthday)) {
        setBirthdayError("Please enter your date of birth");
      } else {
        setBirthdayError("");
      }
    }
  }, [birthday, birthdayMounted]);
  useEffect(() => {
    //name validator
    if (nameMounted) {
      if (!name.length) {
        setNameError("Name is required");
      } else if (!/^[A-Za-z].*$/.test(name))
        setNameError("Name must begin with the letters A-Z.");
      else if (name.length < 3) {
        setNameError(
          "Your name is too short. The minimum length is 3 characters."
        );
      } else if (name.length > 20)
        setNameError(
          "Your name is too long. The maximum length is 20 characters."
        );
      else {
        setNameError("");
      }
    }
  }, [nameMounted, name]);

  useEffect(() => {
    //email validator
    if (emailMonted) {
      if (!email.length) {
        setEmailError("Email is required");
      } else if (
        !/^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
      ) {
        setEmailError("Invalid email address");
      } else if (
        /^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
      ) {
        (async () => {
          setShowLoaderEmail(true);
          let response = await service.request.request.post(
            "/user/emailIsUsedChk",
            {
              email: email,
            }
          );
          setEmailIsUsed(await response.data);
          await setShowLoaderEmail(false);
          if (await response.data)
            setEmailError("This email is already registered.");
          if (await !response.data) setEmailError("");
        })();
      } else {
        setEmailError("");
      }
    }
  }, [email, emailMonted]);
  useEffect(() => {
    //password validator

    if (passwordMounted) {
      if (password.length > 26)
        setPasswordError(
          "Your password is too long. The maximum length is 26 characters."
        );
      else if (password.length < 8)
        setPasswordError(
          "Your password is too short. The minimum length is 8 characters."
        );
      else if (!/[0-9]/.test(password))
        setPasswordError("Password must contain numbers 0-9.");
      else if (!/[A-Z]/.test(password))
        setPasswordError("Password must contain uppercase letters A-Z.");
      else if (!/[a-z]/.test(password))
        setPasswordError("Password must contain lowercase letters a-z.");
      else if (!/[!@#$%^&*]/.test(password))
        setPasswordError(
          "Password must contain special characters [!@#$%^&*]."
        );
      else setPasswordError("");
    }
  }, [password, passwordMounted]);

  /////////////////////////////////////////         Handlers

  const onchangeHandler = (e) => {
    switch (e.currentTarget.name) {
      case "birthday":
        setBirthday(e.currentTarget.value);
        break;
      case "email":
        setEmail(e.currentTarget.value.trim());
        break;
      case "name":
        setName(e.currentTarget.value.trim());
        break;
      case "password":
        setPassword(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setShowLoaderBtn(true);
    try {
      let response = await service.request.verifyRequest.post("/sendemail", {
        email,
      });
      if ((await response.data) === "Email has been sent") {
        setShowVerifyEmailComp(true);
        setVToken(response.headers["x-vtoken"]);
      }
      setShowLoaderBtn(false);
    } catch (error) {
      dispatch(actions.error.setError.action(error.response.data));
      setShowLoaderBtn(false);
    }
  };
  if (showVerifyEmailComp) {
    return (
      <Components.VerifyEmail
        Signup={{
          rememberMe,
          email,
          password,
          name,
          birthday,
          setShowVerifyEmailComp,
          setEmail,
          vToken,
          onSubmitHandler,
        }}
      />
    );
  }
  if(user.isAuth){
    return(<NotFound/>)
  }
  return (
    <div className="d-flex jcc aic h-100vh ">
      <div className="w-xxsm-100 w-md-75 w-50   px-sm-5">
        <div className="p-3 px-sm-5 my-3 m-shadow m-shadow-xxsm-none py-4 rounded-5">
          <div className="w-100 d-flex jcc my-2 ">
            <Components.Logo />
          </div>
          <Form noValidate onSubmit={(e) => onSubmitHandler(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <div className="d-flex ">
                  {emailError.length ? (
                    <span className="text-danger">{emailError}</span>
                  ) : (
                    "Email"
                  )}
                  <div
                    className={`ms-2 ${!showLoaderEmail ? "d-none" : ""}`}
                    style={{ transform: "scale(.75)" }}
                  >
                    <Spinner
                      animation="border"
                      variant={emailError.length ? "danger" : ""}
                      size="sm"
                    />
                  </div>
                </div>
              </Form.Label>
              <Form.Control
                placeholder="user@effect.com"
                name="email"
                onChange={(e) => onchangeHandler(e)}
                onKeyDown={() => setEmailMounted(true)}
                isInvalid={emailError.length}
                readOnly={showLoaderBtn || showLoaderEmail}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                {nameError.length ? (
                  <span className="text-danger">{nameError}</span>
                ) : (
                  "Name"
                )}
              </Form.Label>
              <Form.Control
                value={name}
                placeholder="eltabei123"
                name="name"
                onChange={(e) => onchangeHandler(e)}
                onKeyDown={() => setNameMounted(true)}
                isInvalid={nameError.length}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBirthday">
              <Form.Label>
                {birthdayError.length ? (
                  <span className="text-danger">{birthdayError}</span>
                ) : (
                  "Birthday"
                )}
              </Form.Label>
              <Form.Control
                value={birthday}
                onChange={(e) => {
                  onchangeHandler(e);
                  setBirthdayMounted(true);
                }}
                className=""
                type="date"
                style={{
                  color: `${birthday.length === 10 ? "black" : "#bdbfce"}`,
                }}
                name="birthday"
                isInvalid={birthdayError.length}
                onKeyDown={() => {
                  setBirthdayMounted(true);
                }}
              />
            </Form.Group>
            <div className="mb-3 form-group">
              <label htmlFor="passwordsignup" className="form-label">
                {passwordError.length ? (
                  <small className="text-danger">{passwordError}</small>
                ) : (
                  "Password"
                )}
              </label>
              <div ref={refPassword} className="d-flex form-control  p-0">
                <input
                  value={password}
                  id="passwordsignup"
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="form-control  box-shadow-none border-0"
                  placeholder="••••••••"
                  onFocus={(e) => {
                    if (passwordError.length) {
                      e.currentTarget.parentNode.style.borderColor = "#dc3545";
                      e.currentTarget.parentNode.style.boxShadow =
                        "0 0 0 .25rem rgba(var(--bs-danger-rgb),.25)";
                    } else {
                      e.currentTarget.parentNode.style.borderColor =
                        "#2dbab3a6";
                      e.currentTarget.parentNode.style.boxShadow =
                        " 0 0 0 0.25rem rgb(45 186 179 / 27%)";
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.parentNode.style.boxShadow = "none";

                    if (passwordError.length)
                      e.currentTarget.parentNode.style.borderColor = "#ea5d6d";
                    else
                      e.currentTarget.parentNode.style.borderColor = "#ddddde";
                  }}
                  onChange={(e) => {
                    onchangeHandler(e);
                  }}
                  onKeyDown={() => setPasswordMounted(true)}
                />
                <div
                  className="form-control wmc border-0"
                  style={{ color: "#ddddde" }}
                >
                  <FontAwesomeIcon
                    icon={showPass ? faEye : faEyeSlash}
                    onClick={() => setShowPass(!showPass)}
                  />
                </div>
              </div>
            </div>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Remember me"
                name="rememberme"
                onClick={()=>setRememberMe(!rememberMe)}
              />
            </Form.Group>
            <div className={` ${!error.length ? "d-none" : "d-flex jcc "} `}>
              <Components.Error />
            </div>
            <div className="mt-5">
              <Button
                variant="dark"
                type="submit"
                size="lg"
                className="w-100  btn-m rounded-0"
                disabled={btnSubmitDisabled}
              >
                {showLoaderBtn ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </Form>
          <div className="d-flex jcc mt-3">
            <small>
              Already have an account?
              <Link to={"/login"} className="ms-2 text-m-">
                Login
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
