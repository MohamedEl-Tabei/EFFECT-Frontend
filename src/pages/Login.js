import { Button, Form, Spinner } from "react-bootstrap";
import Components from "../imports/components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import service from "../imports/Services";
import { useDispatch, useSelector } from "react-redux";
import actions from "../imports/Actions";
import Selectors from "../imports/selectors";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [rememberMe, setRememberMe] = useState(false);
  let [showPass, setShowPass] = useState(false);
  let [showForgotPass,setShowForgotPass]=useState(false)

  let navigate = useNavigate();
  //////////////////////////////redux
  let dispatch = useDispatch();
  let user = useSelector((s) => Selectors.user(s));
  let error = useSelector((s) => Selectors.error(s));
  /////////////////////////////////effect
  useEffect(() => {
    if (user.isAuth) navigate("/");
  }, [user.isAuth, navigate]);
  //////////////////////////////handlers
  const onchangeHandler = (e) => {
    if (e.currentTarget.type === "email") {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
    dispatch(actions.error.setError.action(""));
  };
  return (
    <div className="d-flex jcc aic h-100vh">
      <div className="w-xxsm-100 w-md-75 w-50   px-sm-5">
        <div className="p-3 px-sm-5 my-3 m-shadow m-shadow-xxsm-none py-4 rounded-5">
          <div className="w-100 d-flex jcc mb-5 mt-2">
            <Components.Logo />
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(actions.user.updateUser.action({ sendRequest: true }));
              dispatch(service.login({ email, password, rememberMe }));
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => onchangeHandler(e)}
                type="email"
                placeholder="user@effect.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="d-flex form-control p-0">
                <input
                  type={showPass ? "text" : "password"}
                  className="form-control  box-shadow-none border-0"
                  placeholder="••••••••"
                  onFocus={(e) => {
                    e.currentTarget.parentNode.style.borderColor = "#2dbab3a6";
                    e.currentTarget.parentNode.style.boxShadow =
                      " 0 0 0 0.25rem rgb(45 186 179 / 27%)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.parentNode.style.borderColor = "#ddddde";
                    e.currentTarget.parentNode.style.boxShadow = "none";
                  }}
                  value={password}
                  onChange={(e) => onchangeHandler(e)}
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
            </Form.Group>
            <div className="d-flex  justify-content-between">
              <Form.Group className="mb-2" controlId="formBasicCheckbox">
                <Form.Check
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  type="checkbox"
                  label="Remember me"
                />
              </Form.Group>

            </div>
            <Form.Text className="text-muted w-100  d-flex jcc mt-2">
              <Components.Error />
            </Form.Text>
            <div className="mt-2">
   
              <Button
                variant="dark"
                type="submit"
                size="lg"
                className="w-100  btn-m rounded-0 mt-2"
                disabled={user.sendRequest || error.length||!email.length||!password.length}
              >
                {user.sendRequest ? <Spinner size="sm" /> : "Login"}
              </Button>
              
            </div>
          </Form>
          <div className="d-flex jcc my-3 text-m- py-2">
            <small className="pointer"onClick={()=>setShowForgotPass(true)}>
              I forgot my password
            </small>
          </div>
          <div className="d-flex jcc mt-3">
            <small>
              Don't have an account?{" "}
              <Link to={"/signup"} className="ms-2 text-m-" onClick={()=>{dispatch(actions.error.setError.action(""))}}>
                Sign up
              </Link>{" "}
            </small>
          </div>
        </div>
      </div>
      <Components.ForgotPassword setShowForgotPass={setShowForgotPass} showForgotPass={showForgotPass} />

    </div>
  );
};
export default Login;
