import { Button, Form, Spinner } from "react-bootstrap";
import Components from "../imports/components";
import { useEffect, useState } from "react";
import service from "../imports/Services";
import { useDispatch, useSelector } from "react-redux";
import Selectors from "../imports/selectors";
import { Navigate } from "react-router-dom";

const VerifyEmail = ({ Signup }) => {
  let dispatch = useDispatch();
  ////////////////////////states
  let [_1, set_1] = useState("");
  let [_2, set_2] = useState("");
  let [_3, set_3] = useState("");
  let [_4, set_4] = useState("");
  let [_5, set_5] = useState("");
  let [_6, set_6] = useState("");
  let [_7, set_7] = useState("");
  let [_8, set_8] = useState("");
  let [btnDisabled, setBtnDisabled] = useState(false);
  let [codeExpired, setCodeExpired] = useState(false);
  let [showLoaderBtn, setShowLoaderBtn] = useState(false);
  let [isAuth,setIsAuth]=useState(false)
  let user=useSelector(s=>Selectors.user(s))

  /////////////////////////////////effect
  useEffect(() => {
    if (
      _1.length &&
      _2.length &&
      _3.length &&
      _4.length &&
      _5.length &&
      _6.length &&
      _7.length &&
      _8.length
    )
      setBtnDisabled(false);
    else setBtnDisabled(true);
  }, [_1, _2, _3, _4, _5, _6, _7, _8]);
  useEffect(()=>{
    setIsAuth(user.isAuth)
  },[user.isAuth])
  ////////////////////////Handlers
  const onChangeHandler = (e) => {
    switch (e.currentTarget.title) {
      case "1":
        set_1(e.currentTarget.value);
        break;
      case "2":
        set_2(e.currentTarget.value);
        break;
      case "3":
        set_3(e.currentTarget.value);
        break;

      case "4":
        set_4(e.currentTarget.value);
        break;

      case "5":
        set_5(e.currentTarget.value);
        break;

      case "6":
        set_6(e.currentTarget.value);
        break;

      case "7":
        set_7(e.currentTarget.value);
        break;
      case "8":
        set_8(e.currentTarget.value);
        break;

      default:
        break;
    }
  };
  const onVerifyHandler = async (e) => {
    e.preventDefault();
    setShowLoaderBtn(true);
    setBtnDisabled(true);
    try {
      let response = await service.request.verifyRequest.post(
        "/verifycode",
        { code: `${_1}${_2}${_3}${_4}${_5}${_6}${_7}${_8}` },
        {
          headers: {
            "x-vtoken": Signup.vToken,
          },
        }
      );
      if(response.data){
        dispatch(service.signup({ email:Signup.email, name:Signup.name,password: Signup.password, rememberMe:Signup.rememberMe, birthday:Signup.birthday }) )
      }else{
        setCodeExpired(true)
      }
    } catch (error) {
      if (error.response.data === "Code Expired") setCodeExpired(true);
    }
    await setShowLoaderBtn(false);
    await setBtnDisabled(false);
  };
  if (codeExpired) {
    return (
      <div className="modal d-flex jcc aic bg-light">
        <div className="w-xxsm-100 wmc ">
          <div className="p-3 px-5  my-3 m-shadow m-shadow-xxsm-none  rounded-5">
            <div className="d-flex jcc aic flex-column py-3">
              <Components.Logo />
            </div>

            <div className="bg-expired" />

            <Button
              variant="dark"
              type="submit"
              size="lg"
              className=" btn-m w-100 rounded-0 my-3"
              disabled={btnDisabled}
              onClick={async (e) => {
                setShowLoaderBtn(true);
                setBtnDisabled(true);
                setBtnDisabled(true);
                await Signup.onSubmitHandler(e);
                setShowLoaderBtn(false);
                setBtnDisabled(false);
                setCodeExpired(false)
              }}
            >
              {showLoaderBtn ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Send New Code"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if(isAuth)
  {
    console.log(user)
    return <Navigate to={"/"}/>
  }
  return (
    <div className="modal d-flex jcc aic bg-light">
      <div className="w-xxsm-100 wmc ">
        <div className="p-3 px-5  my-3 m-shadow m-shadow-xxsm-none  rounded-5">
          <div className="d-flex jcc aic flex-column py-3">
            <Components.Logo />
          </div>

          <div className="d-flex aic flex-column  py-2">
            A verification code has been sent to{" "}
            <div className="text-m- mt-2 fw-medium">{Signup.email}</div>
          </div>
          <Form className="d-flex flex-column  aic">
            <div className="wmc">
              <div className="bg-email" />

              <div className="d-flex jcc aic">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => {
                  return (
                    <Form.Control
                      maxLength={1}
                      className={`${v !== 8 ? "me-2" : ""} text-center p-0 `}
                      style={{ width: 35, height: 35, fontSize: 27 }}
                      key={v}
                      title={v}
                      onChange={(e) => onChangeHandler(e)}
                    />
                  );
                })}
              </div>

              <Button
                variant="dark"
                type="submit"
                size="lg"
                className=" btn-m w-100 rounded-0 mt-3"
                disabled={btnDisabled}
                onClick={(e) => onVerifyHandler(e)}
              >
                {showLoaderBtn ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Verify"
                )}
              </Button>
              <div className="d-flex justify-content-around aic text-m-   py-1 ">
                <small
                  className="pointer fw-light"
                  onClick={() => {
                    Signup.setEmail("");
                    Signup.setShowVerifyEmailComp(false);
                  }}
                >
                  Change Email
                </small>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default VerifyEmail;


