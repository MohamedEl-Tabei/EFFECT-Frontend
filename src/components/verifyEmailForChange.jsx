import { Button, Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import service from "../imports/Services";
import { useDispatch, useSelector } from "react-redux";
import Selectors from "../imports/selectors";

const VerifyEmailForchange = ({ email,name,birthday,password, vToken ,onSubmitHandler,setVerifyEmail}) => {
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
  let user = useSelector((s) => Selectors.user(s));

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
            "x-vtoken": vToken,
          },
        }
      );
      if (response.data) {
        dispatch(service.updateUser({ email ,birthday,password,name,token:user.token}));
        setVerifyEmail(false)
        ///////////////////////////////
      } else {
        setCodeExpired(true);
      }
    } catch (error) {
      if (error.response.data === "Code Expired") setCodeExpired(true);
    }
    await setShowLoaderBtn(false);
    await setBtnDisabled(false);
  };
  if (codeExpired) {
    return (
      <div className="">
        <div className="w-xxsm-100 wmc ">
          <div className="p-3 px-5   ">
           

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
                await onSubmitHandler(e);
                setShowLoaderBtn(false);
                setBtnDisabled(false);
                setCodeExpired(false);
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

  return (
    <div className="jcc aic">
      <div className="w-xxsm-100 ">
        <div className="p-0 ">
          <div className="d-flex aic flex-column  ">
            A verification code has been sent to{" "}
            <div className="text-m- mt-2 fw-medium">{email}</div>
          </div>
          <Form className="d-flex flex-column  aic">
            <div className="">
              <div className="d-flex jcc aic">
                <div className="bg-email" style={{ width: 250, height: 250 }} />
              </div>

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
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default VerifyEmailForchange;
