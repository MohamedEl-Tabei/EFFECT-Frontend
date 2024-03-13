import { useDispatch, useSelector } from "react-redux";
import Selectors from "../imports/selectors";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import service from "../imports/Services";
import { Link } from "react-router-dom";
import actions from "../imports/Actions";
import Components from "../imports/components";

const HomeActivity = (props) => {
  let user = useSelector((s) => Selectors.user(s));
  let unhiddenActivities = useSelector((s) =>
    Selectors.unhiddenActivitiesName(s)
  );
  let todayDoneActivity = useSelector((s) => Selectors.todayDoneActivity(s));
  let dimensions = useSelector((s) => Selectors.dimension(s));
  let [emotion, setEmoton] = useState("3");
  let [activityName, setactivityName] = useState("");
  let [eTime, setETime] = useState("");
  let [sTime, setSTime] = useState("");
  let [note, setNote] = useState("....");
  let [showSaveLoader, setShowSaveLoader] = useState(false);
  let [showGoalList, setShowGoalList] = useState(false);
  let [goals, setGoals] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    setETime("");
  }, [sTime]);
  useEffect(() => {
    setShowSaveLoader(false);
    onResetHandler();
  }, [todayDoneActivity.items]);
  useEffect(() => {
    if (unhiddenActivities.forFirst) {
      dispatch(service.getUnhiddenActivitiesName({ token: user.token }));
    }
  }, [dispatch, unhiddenActivities.forFirst, user.token,]);
  const onSubmitHandler = (e) => {
    setShowSaveLoader(true);
    let data = {
      activityName,
      date: Date(),
      startTime: sTime,
      endTime: eTime,
      emotion,
      note,
      token: user.token,
      relatedGoals: goals,
    };
    e.preventDefault();
    dispatch(service.addNewDoneActivity(data));
    setGoals([]);
  };
  const onResetHandler = () => {
    setactivityName("");
    setETime("");
    setSTime("");
    setEmoton("3");
    setNote("....");
  };
 

  return (
    <div className=" w-50  w-xxsm-100   mx-auto  d-flex   border-start  ">
      <Form
        className="  flex-wrap mx-auto     p-3    relative"
        onSubmit={(e) => onSubmitHandler(e)}
      >
   
        <Row className="w-75 w-xxsm-100 mx-auto" style={{ height: "100%" }}>
          <Form.Group as={Row} className="mx-auto mb-3 ">
            <Form.Label column className="text-dark">
              To Achieve
            </Form.Label>
            <Col>
              <Button
                className="form-control mx-auto btn-m- d-flex rounded-2  jcc box-shadow-none"
                style={{ minWidth: 216.4 }}
                onClick={() => setShowGoalList(true)}
              >
                select one or more goal
              </Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mx-auto mb-3 mw-doneActivity">
            <Form.Label column className="text-dark">
              Activity
            </Form.Label>
            <Col>
              {unhiddenActivities.names.length ? (
                <Form.Select
                  onChange={(e) => setactivityName(e.currentTarget.value)}
                  value={activityName}
                  className={`text-dark`}
                  style={{ minWidth: 216.4 }}
                  disabled={!goals.length}
                >
                  <option className="text-center" value={""} disabled />
                  {unhiddenActivities.names.map((v) => {
                    return (
                      <option value={v.key.name} key={v.key.name}>
                        {v.key.name}
                      </option>
                    );
                  })}
                  <option className="text-center" value={""} disabled />
                </Form.Select>
              ) : (
                <Link
                  onClick={() => {
                    dispatch(
                      actions.dimension.setDimensionType.action("Activities")
                    );
                    dispatch(
                      actions.dimension.setDimensionSendRequest.action(false)
                    );
                    dispatch(
                      service.getOnePageOfActivities({
                        ...dimensions,
                        token: user.token,
                      })
                    );
                  }}
                  to={"/dimensions"}
                >
                  {" "}
                  <Button
                    className="btn-dark w-100 "
                    style={{ minWidth: 216.4 }}
                    title="You don't have any activity please add new activity or make it unhidden."
                  >
                    Activities
                  </Button>
                </Link>
              )}
            </Col>
          </Form.Group>

          {["Start Time", "End Time"].map((v) => {
            return (
              <Form.Group as={Row} className="mx-auto mb-3" key={v}>
                <Form.Label column className="text-dark">
                  {v}
                </Form.Label>
                <Col>
                  <Form.Control
                    type={"time"}
                    className="rounded-2 pointer"
                    onClick={(e) => {
                      e.currentTarget.blur();
                      e.currentTarget.showPicker();
                    }}
                    disabled={
                      (v === "End Time" && !sTime.length) || !goals.length
                    }
                    value={v === "Start Time" ? sTime : eTime}
                    onChange={(e) => {
                      v === "Start Time"
                        ? setSTime(e.currentTarget.value)
                        : setETime(e.currentTarget.value);
                    }}
                    min={v === "End Time" ? sTime : user.wkupTime}
                    style={{ minWidth: 216.4 }}
                  />
                </Col>
              </Form.Group>
            );
          })}

          <Form.Group as={Row} className="mx-auto mb-3">
            <Form.Label column className="text-dark">
              Emotion
            </Form.Label>
            <Col>
              <div className="">
                <input
                  type="range"
                  className=" slider bg-light pointer rounded-5 p-1"
                  style={{ minWidth: 216.4 }}
                  value={emotion}
                  min={1}
                  max={5}
                  onChange={(e) => setEmoton(e.currentTarget.value)}
                  disabled={!goals.length}
                />
                <div className="d-flex mx-auto wmc bg-light p-1 rounded-circle shadow">
                  <div className={`emotion${emotion}`} />
                </div>
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mx-auto mb-3 ">
            <Form.Label column className="text-dark">
              Note
            </Form.Label>
            <Col>
              <textarea
                className="form-control mx-auto d-flex rounded-2"
                style={{ minWidth: 216.4, height: 66, maxHeight: 66 }}
                onChange={(e) => {
                  setNote(e.currentTarget.value);
                }}
                value={note}
                disabled={!goals.length}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column className="invisible">
              invisible label
            </Form.Label>
            <Col className=" d-flex justify-content-end p-0">
              <Button
                type="submit"
                className="btn-m me-3"
                style={{ height: "max-content", width: 100 }}
                disabled={
                  !(
                    activityName.length &&
                    emotion.length &&
                    eTime.length &&
                    sTime.length &&
                    note.length &&
                    goals.length
                  ) || showSaveLoader
                }
              >
                {showSaveLoader ? <Spinner size="sm" /> : "Save"}
              </Button>
              <Button
                className="btn-danger "
                style={{ height: "max-content", width: 100 }}
                onClick={() => {
                  onResetHandler();
                  while (goals.length) goals.pop();
                  setGoals([]);
                }}
                disabled={
                  !(
                    activityName.length ||
                    eTime.length ||
                    sTime.length ||
                    note !== "...." ||
                    emotion !== "3" ||
                    goals.length !== 0 ||
                    showSaveLoader
                  )
                }
              >
                Reset
              </Button>
            </Col>
          </Form.Group>
        </Row>
        <div
          className={`modal   ${
            showGoalList ? "d-flex jcc aic" : "d-none"
          } absolute`}
        >
          <Components.GoalChecklist
            goals={goals}
            setShowGoalList={setShowGoalList}
            setGoals={setGoals}
          />
        </div>
      </Form>
    </div>
  );
};
export default HomeActivity;
