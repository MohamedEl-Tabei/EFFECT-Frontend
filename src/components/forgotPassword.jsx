import { useState } from "react";
import { CloseButton, Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../imports/selectors";
import actions from "../imports/Actions";
import Components from "../imports/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import service from "../imports/Services";
const ForgotPassword = (props) => {
  let user = useSelector((s) => selectors.user(s));
  let error = useSelector((s) => selectors.error(s));
  let [email, setEmail] = useState(user.email);
  let dispatch = useDispatch();
  return (
    <div
      className={`modal d-${props.showForgotPass ? "flex aic jcc" : "none"}`}
      style={{ background: "#21252999" }}
    >
      <div
        className={`w-xxsm-100 w-50  p-3 p-lg-5 relative ${
          user.isAuth ? " bg-warning-m text-light" : "bg-light"
        }`}
      >
        <CloseButton
          className={`absolute d-${user.isAuth ? "none" : "flex"}`}
          style={{ top: 15, left: 15 }}
          onClick={() => props.setShowForgotPass(false)}
        />
        <h3 className="text-center py-3">
          {user.isAuth ? (
            <div className="d-flex flex-column justify-content-around bg-dark text-warning">
              <div className="my-3">A password reset link has been sent to your email.</div>
              <Button
                variant="outline-warning "
                className="d-flex jcc aic mx-auto my-3 py-2"
                style={ {width:200}}
                title="Reload"
                onClick={()=>{window.location.reload()}}
              >
                <h3 className="p-0 m-0">
                  <FontAwesomeIcon icon={faRotateRight} size="lg" />
                </h3>
              </Button>
              
            </div>
          ) : (
            "Recover your password "
          )}
        </h3>
        {user.isAuth
          ? ""
          : "Enter the email that you used when register to recover your password. You will receive a password reset link."}
        {user.isAuth ? (
          ""
        ) : (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(actions.user.updateUser.action({ sendRequest: true }));
              dispatch(service.sendResetLink(email))
            }}
            className=" mt-5"
          >
            <Form.Group className="mb-3">
              <Form.Control
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                type="email"
                placeholder="user@effect.com"
                size="lg"
              />
            </Form.Group>
            <Form.Text className="text-muted w-100  d-flex jcc mt-2">
              <Components.Error />
            </Form.Text>
            <div className="mt-2">
              <Button
                variant="dark"
                type="submit"
                size="lg"
                className="w-100  btn-m rounded-0 mt-2"
                disabled={user.sendRequest || error.length || !email.length}
              >
                {user.sendRequest ? <Spinner size="sm" /> : "Send Reset Link"}
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
