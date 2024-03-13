import { Form, Button, Spinner } from "react-bootstrap";
import Components from "../imports/components";
import { useEffect, useState } from "react";
import service from "../imports/Services";
import { Link } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const ResetPassword = () => {
  const token = window.location.search.slice(1);
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [validPassword, setValidPassword] = useState(false);
  let [error, setError] = useState("");
  let [isMounted, setIsMounted] = useState(false);
  let [hide, setHide] = useState(true);
  let [loader, setLoader] = useState(false);
  let [success, setSuccess] = useState(false);
  useEffect(() => {
    if (isMounted) {
      if (password.length > 26) {
        setError(
          "Your password is too long. The maximum length is 26 characters."
        );
        setValidPassword(false);
      } else if (password.length < 8) {
        setError(
          "Your password is too short. The minimum length is 8 characters."
        );
        setValidPassword(false);
      } else if (!/[0-9]/.test(password)) {
        setError("Password must contain numbers 0-9.");
        setValidPassword(false);
      } else if (!/[A-Z]/.test(password)) {
        setError("Password must contain uppercase letters A-Z.");
        setValidPassword(false);
      } else if (!/[a-z]/.test(password)) {
        setError("Password must contain lowercase letters a-z.");
        setValidPassword(false);
      } else if (!/[!@#$%^&*]/.test(password)) {
        setError("Password must contain special characters [!@#$%^&*].");
        setValidPassword(false);
      } else {
        setError("");
        setValidPassword(true);
      }
    }
  }, [password, isMounted]);
  useEffect(() => {
    (async () => {
      try {
        let response = await service.request.request.get(
          "/user/chkUrlForResetPass",
          {
            headers: {
              "x-resetpasstoken": token,
            },
          }
        );
        await setName(response.data.name);
      } catch (error) {
        setName(error.response.data);
      }
    })();
  }, [token]);
  //////////////////////////////////
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await setLoader(true);
      await service.request.request.put(
        "/user/resetForgottenPass",
        { password },
        {
          headers: {
            "x-resetpasstoken": token,
          },
        }
      );
      await setLoader(false);
      await setSuccess(true)
    } catch (error) {
      setError(error.response.data);
    }
  };
  ////////////////////////////////

  if (name === "") return <Components.Loader />;
  else if (name === "error") return <NotFound />;
  else if (name === "jwt expired") {
    return (
      <div className="d-flex jcc aic h-100vh flex-column">
        <div className="wmc">
          <div className="bg-expired  mb-5" />
          <Link className="w-100" to={"/"}>
            <Button size="lg" className="mt-5 btn-m w-100 rounded-0">
              <h1>Home</h1>
            </Button>
          </Link>
        </div>
      </div>
    );
  } else if (success) {
    return (
      <div className="d-flex aic jcc h-100vh">
        <div className="m-shadow p-4 p-sm-5 w-xxsm-100 w-md-75 w-50  m-shadow-xxsm-none ">
          <div className="mb-5 d-flex mx-auto  wmc">
            <Components.Logo />
          </div>
          <h1
            className="text-center lh-base ff-m  d-flex jcc aic flex-wrap"
            style={{ fontSize: 24, fontWeight: 300 }}
          >
            <div className="text-m- wmc">
              {name}
              <span className="text-dark">'s</span>
            </div>
            <div className="wmc ms-2">password has been changed.</div>
           
          </h1>
          <Link
              size="lg"
              className="mx-auto btn btn-dark btn-lg d-flex aic jcc  btn-m rounded-0 mt-5"
              style={ {width:200}}
              to={"/login"}
            >
              Login
            </Link>
        </div>
      </div>
    );
  } else
    return (
      <div className="d-flex aic jcc h-100vh">
        <Form
          className="m-shadow p-4 p-sm-5 w-xxsm-100 w-md-75 w-50  m-shadow-xxsm-none "
          onSubmit={(e) => onsubmitHandler(e)}
        >
          <div className="mb-5 d-flex mx-auto  wmc">
            <Components.Logo />
          </div>
          <h1
            className="text-center lh-base ff-m  d-flex jcc aic flex-wrap"
            style={{ fontSize: 24, fontWeight: 300 }}
          >
            <div className="wmc me-2">Change password for</div>
            <div className="text-m- wmc">{name}</div>
          </h1>
          <Form.Group className="mb-3 mt-5">
            <Form.Label>
              {!validPassword && error.length ? error : "Password"}
            </Form.Label>
            <div className="relative">
              <Form.Control
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  setIsMounted(true);
                }}
                type={hide ? "password" : "text"}
              />
              <div
                className="absolute  h-100 d-flex aic pointer"
                style={{ right: 20, top: 0, color: "#999999", width: 25 }}
                onClick={() => setHide(!hide)}
              >
                <FontAwesomeIcon icon={hide ? faEyeSlash : faEye} />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              {password !== confirmPassword &&
              validPassword &&
              confirmPassword.length
                ? "Passwords must match"
                : "Confirm password"}
            </Form.Label>
            <div className="relative">
              <Form.Control
                disabled={!validPassword}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.currentTarget.value);
                }}
                type={hide ? "password" : "text"}
              />
              <div
                className="absolute  h-100 d-flex aic pointer"
                style={{ right: 20, top: 0, color: "#999999" }}
              ></div>
            </div>
          </Form.Group>
          <div className="mt-5">
            <Button
              variant="dark"
              type="submit"
              size="lg"
              className="w-100  btn-m rounded-0"
              disabled={
                !validPassword || confirmPassword !== password || loader
              }
            >
              {loader ? <Spinner size="sm" /> : "Change password"}
            </Button>
          </div>
        </Form>
      </div>
    );
};
export default ResetPassword;
