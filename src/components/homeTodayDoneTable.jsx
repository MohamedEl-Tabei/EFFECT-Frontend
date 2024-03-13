import {
  Button,
  CloseButton,
  Col,
  Form,
  FormGroup,
  FormSelect,
  OverlayTrigger,
  Row,
  Spinner,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../imports/selectors/index";
import service from "../imports/Services/index";
import { useEffect, useRef, useState } from "react";
import Component from "../imports/components";
const DoneTodayTable = () => {
  const yesterDay = new Date();
  yesterDay.setDate(yesterDay.getDate() -1);
  let doneActivities = useSelector((s) => selectors.todayDoneActivity(s));
  let user = useSelector((s) => selectors.user(s));
  let unhiddenActivitiesName = useSelector((s) =>
    selectors.unhiddenActivitiesName(s)
  );
  let refInvisibleButton = useRef(null);
  let [showGoalList, setShowGoalList] = useState(false);
  let dispatch = useDispatch();
  let [isMounted, setIsMounted] = useState(false);
  let [preventGoServer, setPreventGoServer] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
  let [showEdit, setShowEdit] = useState(false);
  let [deletedActivity, setDeletedActivity] = useState({ activityName: "" });
  let [name, setName] = useState("");
  let [sTime, setSTime] = useState("");
  let [eTime, setETime] = useState("");
  let [note, setNote] = useState("");
  let [emotion, setEmotion] = useState(0);
  let [goals, setGoals] = useState([]);
  let [edittedActivity, setEditedActivity] = useState({
    activityName: "",
    startTime: "",
    endTime: "",
    note: "",
    emotion: 0,
    relatedGoals: [],
  });

  let [strToConfirm, setStrToConfirm] = useState("");
  let [showLoader, setShowLoader] = useState(false);
  let [wkupTime, setWkupTime] = useState("");
  let [sleepTime, setSleepTime] = useState("");
  useEffect(() => {
    setWkupTime(user.wkupTime);
    setSleepTime(user.sleepTime);
  }, [user.wkupTime, user.sleepTime, showEdit]);
  useEffect(() => {
    setName(edittedActivity.activityName);
    setSTime(edittedActivity.startTime);
    setETime(edittedActivity.endTime);
    setNote(edittedActivity.note);
    setEmotion(edittedActivity.emotion);
    setGoals(edittedActivity.relatedGoals);
  }, [edittedActivity]);
  useEffect(() => {
    setShowAlert(false);
    setShowLoader(false);
    setShowEdit(false);
    setDeletedActivity({ activityName: "" });
    setEditedActivity({
      activityName: "",
      startTime: "",
      endTime: "",
      note: "",
      emotion: 0,
      relatedGoals: [],
    });
    setStrToConfirm("");
  }, [doneActivities.items]);
  useEffect(() => {
    if (!doneActivities.items.length && isMounted && !preventGoServer) {
      dispatch(service.getTodayDoneActivities({ token: user.token }));
      setPreventGoServer(true);
    }
    setIsMounted(true);
  }, [doneActivities.items, dispatch, user.token, isMounted, preventGoServer]);
  ////////////////////////Handlers
  const onDelete = (v, i) => {
    if (showAlert) {
      if (v.activityName === "Wake Up" && v.emotion === 0) {
        dispatch(service.deleteWKupTime({ token: user.token, date: v.date }));
      } else {
        dispatch(
          service.deleteOneTodayActivity({
            _id: deletedActivity._id,
            token: user.token,
            name: deletedActivity.activityName,
          })
        );
      }
      setShowLoader(true);
    } else {
      setShowAlert(true);
      setDeletedActivity({ ...v, i });
    }
  };
  const onEdit = (v, i) => {
    if (showEdit) {
      if (v.activityName === "Wake Up") {
        dispatch(service.editWKupTime({ token: user.token, time: wkupTime }));
        setShowLoader(true);
      } else if (v.activityName === "Sleep") {
        dispatch(
          service.editDoneActivity({
            token: user.token,
            activity: {
              activityName: name,
              startTime: sleepTime,
              endTime: sleepTime,
              note: note,
              emotion: emotion,
              _id: edittedActivity._id,
              relatedGoals: goals,
            },
          })
        );
        setShowLoader(true);
      } else {
        refInvisibleButton.current.click();
      }
    } else {
      setShowEdit(true);
      setEditedActivity({ ...edittedActivity, ...v, i });
    }
  };
  const onChange = (e) => {
    let t = e.currentTarget.title;
    let v = e.currentTarget.value;
    if (t === "Activity") {
      setName(v);
    }
    if (t === "Start Time") {
      setSTime(v);
    }
    if (t === "End Time") {
      setETime(v);
    }
    if (t === "Note") {
      setNote(v);
    }
    if (t === "Emotion") {
      setEmotion(v);
    }
  };
  return (
    <div
      className={` py-3 w-100 relative ${
        !doneActivities.items.length ? "d-none" : ""
      }`}
    >
      <Component.Error />
      <Table className="align-middle table-hover " responsive>
        <thead>
          <tr>
            {[
              "",
              "Start Time",
              "End Time",
              "Note",
              "Emotion",
              "To Achieve",
              "",
            ].map((v, i) => (
              <th className=" text-center bg-none border-0 py-3" key={i}>
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doneActivities.items.map((v, i) => {
            return (
              <tr key={i} className="ff-m text-center bg-none border-0 ">
                <td className="bg-none border-0 ">{v.activityName.trim()}</td>
                <td className="bg-none border-0">{v.startTime}</td>
                <td className="bg-none border-0">
                  {v.endTime === v.startTime ? "" : v.endTime}
                </td>
                <td className="bg-none border-0" title={v.note}>
                  {v.note.slice(0, 12)}
                  {v.note.length > 12 ? "..." : ""}
                </td>
                <td className="bg-none border-0">
                  <div
                    className={`d-flex jcc ${
                      v.emotion === 0 ? "invisible" : ""
                    }`}
                  >
                    <div className="p-1 rounded-circle bg-light">
                      <div
                        className={`emotion${v.emotion}`}
                        style={{ width: 50, height: 50 }}
                      />
                    </div>
                  </div>
                </td>
                <td className="bg-none border-0">
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip">
                        {v.relatedGoals.map((v, i) => (
                          <div className="p-2" key={i}>
                            {v}
                          </div>
                        ))}
                      </Tooltip>
                    }
                  >
                    <Button
                      className={`border-0 wmc ${
                        v.activityName === "Wake Up" ||
                        v.activityName === "Sleep"
                          ? "d-none"
                          : ""
                      }`}
                      style={{ backgroundColor: v.color }}
                    >
                      Hover me to see
                    </Button>
                  </OverlayTrigger>
                </td>
                <td className="bg-none border-0 py-3">
                  <Button
                    variant="outline-dark"
                    style={{ width: 70 }}
                    className="mb-2 mb-sm-0 me-sm-2"
                    onClick={() => onEdit(v, i)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    style={{ width: 70 }}
                    onClick={() => onDelete(v, i)}
                  >
                    Delete
                  </Button>
                </td>
                <td className="bg-none border-0"></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/*///////////confirm message for delete//////////////////*/}
      <div
        className={`modal d-${showAlert ? "flex" : "none"} jcc aic`}
        style={{ backgroundColor: "#21252999" }}
      >
        <div className="p-3 p-sm-5 mx-3   w-xxsm-100 w-50 bg-light  d-flex flex-column jcc   rounded-5  relative bg-paper-card filter-shadow">
          <Form.Label className="mt-5 text-dark ">
            You will delete
            <span className="fw-bold mx-2">{deletedActivity.activityName}</span>
            {deletedActivity.emotion === 0
              ? `and you will delete all your today's activities.`
              : ""}
          </Form.Label>
          <Form.Control
            placeholder={deletedActivity.activityName}
            className="mb-5"
            onChange={(e) => {
              setStrToConfirm(e.currentTarget.value);
            }}
            value={strToConfirm}
            name={strToConfirm}
          />
          <CloseButton
            className="absolute "
            style={{ top: 15, left: 15 }}
            onClick={() => {
              setShowAlert(false);
            }}
          />

          <div className="d-flex  justify-content-end">
            <Button
              onClick={() => {
                setShowAlert(false);
              }}
              className="me-2"
              variant="dark"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => onDelete(deletedActivity, deletedActivity.i)}
              disabled={strToConfirm !== deletedActivity.activityName}
            >
              Delete
            </Button>
          </div>
          <div
            className={`modal absolute d-${
              showLoader ? "flex" : "none"
            } bg-paper-card  rounded-5 jcc aic filter-shadow`}
          >
            <Spinner />
          </div>
        </div>
      </div>
      {/*///////////Edit activity//////////////////*/}

      <div
        className={`modal d-${showEdit ? "flex" : "none"} jcc aic`}
        style={{ backgroundColor: "#21252999" }}
      >
        <div
          className={`  w-xxsm-100 w-50 bg-light  d-flex flex-column jcc   rounded-5  relative bg-paper-card filter-shadow ${
            showGoalList ? "p-0 m-0" : "p-3 pt-5 p-sm-5 mx-3 "
          } `}
        >
          <div
            className={`absolute h-100 w-100 z-1 ${
              !showGoalList ? "d-none" : ""
            }`}
          >
            <Component.GoalChecklist
              goals={goals}
              setGoals={setGoals}
              setShowGoalList={setShowGoalList}
            />
          </div>
          {edittedActivity.emotion === 0 ? (
            <>
              <p
                className={`${
                  wkupTime === user.wkupTime ? "invisible" : "bg-m"
                } ${
                  edittedActivity.activityName !== "Wake Up" ? "d-none" : ""
                } text-light  p-2 mt-3 text-center`}
              >
                All activities done after {wkupTime} today will not be deleted.
              </p>
              <h3
                className={`border-dark ff-m d-flex mx-auto user-select-none pointer bg-light rounded-2  my-5${
                  !user.wkupTime.length ? "pointer" : ""
                } m-shadow flex-wrap  p-3 relative`}
                onClick={(e) => {
                  e.currentTarget.firstElementChild.showPicker();
                  e.currentTarget.firstElementChild.focus();
                }}
                style={{ maxWidth: "max-content" }}
              >
                {edittedActivity.activityName === "Wake Up"
                  ? `I woke up today, ${Date().slice(0, 16)}, at
                  ${wkupTime.length ? ` ${wkupTime}` : " --:--"}.`
                  : `I sleep ${
                      Number(sleepTime.slice(0, 2)) > 12 ? "yesterday" : "today"
                    }, ${
                      Number(sleepTime.slice(0, 2)) > 12
                        ? yesterDay.toString().slice(0, 16)
                        : Date().slice(0, 16)
                    }, at
                  ${sleepTime.length ? ` ${sleepTime}` : " --:--"}.`}
                <input
                  className={`m-0 p-0 border-0 bg-none pointer   absolute`}
                  style={{ opacity: 0 }}
                  type="time"
                  onChange={(e) =>
                    edittedActivity.activityName === "Wake Up"
                      ? setWkupTime(e.currentTarget.value)
                      : setSleepTime(e.currentTarget.value)
                  }
                  value={
                    edittedActivity.activityName === "Wake Up"
                      ? wkupTime
                      : sleepTime
                  }
                  name={
                    edittedActivity.activityName === "Wake Up"
                      ? wkupTime
                      : sleepTime
                  }
                />
              </h3>
            </>
          ) : (
            <Form
              className="d-flex flex-wrap py-3 "
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  service.editDoneActivity({
                    token: user.token,
                    activity: {
                      activityName: name,
                      startTime: sTime,
                      endTime: eTime,
                      note: note,
                      emotion: emotion,
                      _id: edittedActivity._id,
                      relatedGoals: goals,
                    },
                  })
                );
                setShowLoader(true);
              }}
            >
              <Button
                ref={refInvisibleButton}
                className="d-none"
                type="submit"
              />
              {[
                "To Achieve",
                "Activity",
                "Start Time",
                "End Time",
                "Emotion",
                "Note",
              ].map((v, i) => {
                return (
                  <FormGroup className={`w-100  mb-3 `} key={i} as={Row}>
                    <Form.Label column className="text-dark">
                      {v}
                    </Form.Label>
                    <Col>
                      {v.includes("Time") ? (
                        <Form.Control
                          value={v === "Start Time" ? sTime : eTime}
                          type="time"
                          className="rounded-2 pointer"
                          onClick={(e) => e.currentTarget.showPicker()}
                          onChange={(e) => onChange(e)}
                          title={v}
                          style={{ minWidth: 216.4 }}
                          name={v}
                          min={v === "End Time" ? sTime : user.wkupTime}
                        />
                      ) : v === "Note" ? (
                        <textarea
                          className="w-100 form-control rounded-2"
                          style={{ minWidth: 216.4, maxHeight: "15vh" }}
                          value={note}
                          onChange={(e) => onChange(e)}
                          name={v}
                          title={v}
                        />
                      ) : v === "Activity" ? (
                        <FormSelect
                          className="text-dark pointer"
                          value={name}
                          onChange={(e) => onChange(e)}
                          style={{ minWidth: 216.4 }}
                          name={v}
                          title={v}
                        >
                          {unhiddenActivitiesName.names.map((v, i) => {
                            return (
                              <option value={v.key.name} key={i}>
                                {v.key.name}
                              </option>
                            );
                          })}
                        </FormSelect>
                      ) : v === "To Achieve" ? (
                        <Button
                          className="form-control mx-auto btn-m- d-flex rounded-2  jcc box-shadow-none"
                          style={{ minWidth: 216.4 }}
                          onClick={() => setShowGoalList(true)}
                        >
                          select one or more goal
                        </Button>
                      ) : v === "Emotion" ? (
                        <div className="">
                          <input
                            type="range"
                            className=" slider bg-light pointer rounded-5 p-1"
                            style={{ minWidth: 216.4 }}
                            value={emotion}
                            min={1}
                            max={5}
                            onChange={(e) => onChange(e)}
                            name={v}
                            title={v}
                          />
                          <div className="d-flex mx-auto wmc bg-light p-1 rounded-circle shadow">
                            <div className={`emotion${emotion}`} />
                          </div>
                        </div>
                      ) : (
                        <input className="" />
                      )}
                    </Col>
                  </FormGroup>
                );
              })}
            </Form>
          )}
          <CloseButton
            className="absolute "
            style={{ top: 15, left: 15 }}
            onClick={() => {
              setShowEdit(false);
            }}
          />

          <div className="d-flex  justify-content-end mt-3">
            <Button
              onClick={() => {
                setShowEdit(false);
              }}
              className="me-2"
              variant="dark"
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              onClick={() => onEdit(edittedActivity, edittedActivity.i)}
              className="btn-m"
              style={{ width: 72.34 }}
              disabled={
                wkupTime === user.wkupTime &&
                sleepTime === user.sleepTime &&
                edittedActivity.activityName === name &&
                edittedActivity.emotion === emotion &&
                edittedActivity.startTime === sTime &&
                edittedActivity.endTime === eTime &&
                edittedActivity.note === note &&
                edittedActivity.relatedGoals === goals
              }
            >
              Save
            </Button>
          </div>
          <p
            className={`${
              wkupTime === user.wkupTime ? "invisible" : "bg-danger"
            } ${
              edittedActivity.activityName !== "Wake Up" ? "d-none" : ""
            } text-light  p-2 mt-3 text-center`}
          >
            All activities done before {wkupTime} today will be deleted.
          </p>
          <div
            className={`modal absolute d-${
              showLoader ? "flex" : "none"
            } bg-paper-card  rounded-5 jcc aic filter-shadow`}
          >
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoneTodayTable;
