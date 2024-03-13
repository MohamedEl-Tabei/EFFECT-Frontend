import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import service from "../imports/Services";
import Selectors from "../imports/selectors";
const SleepSchedule = () => {
  let [showBtnLoader, setShowBtnLoader] = useState(false);
  let [wkupTime, setWkupTime] = useState("");
  let [sleepTime, setSleepTime] = useState("");
  let user = useSelector((s) => Selectors.user(s));
  let dispatch = useDispatch();
  useEffect(() => {
    if (user.wkupTime.length) {
      setSleepTime("");
      setWkupTime("");
      setShowBtnLoader(false);
    }
  }, [user.wkupTime]);
  const onStartYourDay = (e) => {
    setShowBtnLoader(true);
    e.preventDefault();
    dispatch(service.setWkUpTime({ sleepTime, wkupTime, token: user.token }));
  };
  return (
    <Form
      style={{
        height: "50vh",
        width: "75%",
      }}
      className=" d-flex flex-column aic"
      onSubmit={(e) => onStartYourDay(e)}
    >
      <div
        className="m-shadow w-100 bg-light rounded-5"
        style={{
          height: "50vh",
        }}
      >
        <div className="h-100 sleepSchedule d-flex flex-column justify-content-between p-4">
          <div>
            <Form.Group
              className="mb-3"
              controlId="wkutime"
              style={{ width: 128 }}
            >
              <Form.Label>Wake up at</Form.Label>
              <Form.Control
                className="pointer rounded-5"
                onClick={(e) => e.currentTarget.showPicker()}
                type="time"
                onChange={(e) => setWkupTime(e.currentTarget.value)}
                value={wkupTime}
              />
            </Form.Group>
          </div>
          <div className=" d-flex justify-content-end">
            <Form.Group
              className="mb-3"
              controlId="sleeptime"
              style={{ width: 128 }}
            >
              <Form.Label>Sleep at</Form.Label>
              <Form.Control
                className="pointer rounded-5"
                onClick={(e) => e.currentTarget.showPicker()}
                type="time"
                onChange={(e) => setSleepTime(e.currentTarget.value)}
                value={sleepTime}
              />
            </Form.Group>
          </div>
        </div>
      </div>
      <Button
        variant="dark"
        size="lg"
        className="mt-3 "
        style={{ width: 157 }}
        type="submit"
        disabled={!(wkupTime.length&&sleepTime.length)}
      >
        {showBtnLoader ? <Spinner size="sm" /> : "Start your day"}
      </Button>
    </Form>
  );
};
export default SleepSchedule;
