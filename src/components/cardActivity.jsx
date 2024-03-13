import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faDroplet,
  faEye,
  faEyeSlash,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Components from "../imports/components";
import { useEffect, useState } from "react";
import service from "../imports/Services";
import { useDispatch, useSelector } from "react-redux";
import Selectors from "../imports/selectors";
import actions from "../imports/Actions";
import { Button, Form, Spinner } from "react-bootstrap";

const CardActivity = (props) => {
  let [showDetails, setShowDetails] = useState(false);
  let [showDelete, setShowDelete] = useState(false);
  let [shwoGrowingspinner, setShowGrowingspinner] = useState(false);
  let [shwowSpinner, setShowSpinner] = useState(false);
  let [showRnameForm, setShowRnameForm] = useState(false);
  let [showRcolorForm, setShowRcolorForm] = useState(false);
  let [rname, setRname] = useState(props.name);
  let [rcolor, setRcolor] = useState(props.color);
  let dispatch = useDispatch();
  let user = useSelector((s) => Selectors.user(s));
  let dimension = useSelector((s) => Selectors.dimension(s));
  let todayDoneActivity = useSelector((s) =>
    Selectors.todayDoneActivity(s)
  ).items;
  let error = useSelector((s) => Selectors.error(s));
  const onclickEye = () => {
    dispatch(
      service.editActivity({
        colorKey: { color: rcolor },
        key: { name: props.name },
        _id: props.id,
        hidden: !props.hidden,
        token: user.token,
      })
    );
    dispatch(actions.dimension.clickEye.action(true));
    setShowGrowingspinner(true);
  };
  const onSubmitRcolor = (e) => {
    dispatch(actions.dimension.clickEye.action(true));

    setShowSpinner(true);
    e.preventDefault();
    dispatch(
      service.editActivity({
        colorKey: { color: rcolor },
        key: { name: props.name },
        _id: props.id,
        hidden: props.hidden,
        token: user.token,
        todayDoneActivity,
        oldColor: rcolor,
      })
    );
  };
  const onSubmitRname = (e) => {
    dispatch(actions.dimension.clickEye.action(true));

    setShowSpinner(true);
    e.preventDefault();
    dispatch(
      service.editActivity({
        colorKey: { color: rcolor },
        key: { name: rname },
        _id: props.id,
        hidden: props.hidden,
        token: user.token,
        oldName: props.name,
        todayDoneActivity,
      })
    );
  };
  useEffect(() => {
    if (!dimension.clickEye) setShowGrowingspinner(false);
    if (!dimension.clickEye || error.length) setShowSpinner(false);
  }, [dimension.clickEye, error]);
  useEffect(() => {
    if (!shwowSpinner && !error.length) {
      setShowRnameForm(false);
      setShowRcolorForm(false);
    }
  }, [shwowSpinner, error]);
  useEffect(() => {
    setShowDelete(false);
  }, [dimension.items.length]);
  return (
    <div
      className="border-top border-start border-m border-4 d-flex jcc aic rounded-4  "
      style={{ width: "max-content", height: "max-content", padding: 1.5 }}
    >
      {showRnameForm ? (
        <div
          className="border-bottom border-end border-m- border-4 rounded-4 d-flex flex-column aic jcc p-1 relative"
          style={{ width: 250, height: 100 }}
        >
          {shwowSpinner ? (
            <Spinner size="md" />
          ) : (
            <Form onSubmit={(e) => onSubmitRname(e)}>
              {error.length ? (
                <div className="mb-3">
                  <Components.Error />
                </div>
              ) : (
                <Form.Control
                  value={rname}
                  className="mb-3 rounded-3"
                  size="sm"
                  onChange={(v) => {
                    setRname(v.currentTarget.value);
                  }}
                />
              )}
              <div className="d-flex justify-content-between">
                <Button
                  type="submit"
                  size="sm"
                  className={`${error.length ? "invisible" : ""}  btn-m `}
                  style={{ width: 75 }}
                  disabled={props.name === rname}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  className="btn-dark"
                  style={{ width: 75 }}
                  onClick={() => {
                    setShowRnameForm(false);
                    setRname(props.name);
                    dispatch(actions.error.setError.action(""));
                  }}
                >
                  Cancle
                </Button>
              </div>
            </Form>
          )}
        </div>
      ) : showRcolorForm ? (
        <div
          className="border-bottom border-end border-m- border-4 rounded-4 d-flex flex-column aic jcc p-1 relative"
          style={{ width: 250, height: 100 }}
        >
          {shwowSpinner ? (
            <Spinner size="md" />
          ) : (
            <Form onSubmit={(e) => onSubmitRcolor(e)}>
              {error.length ? (
                <div className="mb-3">
                  <Components.Error />
                </div>
              ) : (
                <Form.Control
                  type="color"
                  value={rcolor}
                  className="mb-3 rounded-3 "
                  size="sm"
                  style={{ minWidth: 176 }}
                  onChange={(v) => {
                    setRcolor(v.currentTarget.value);
                  }}
                />
              )}
              <div className="d-flex justify-content-between">
                <Button
                  type="submit"
                  size="sm"
                  className={`${error.length ? "invisible" : ""}  btn-m `}
                  style={{ width: 75 }}
                  disabled={props.color === rcolor}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  className="btn-dark"
                  style={{ width: 75 }}
                  onClick={() => {
                    setShowRcolorForm(false);
                    setRcolor(props.color);
                    dispatch(actions.error.setError.action(""));
                  }}
                >
                  Cancle
                </Button>
              </div>
            </Form>
          )}
        </div>
      ) : (
        <div
          className="border-bottom border-end border-m- border-4 rounded-4 d-flex flex-column aic jcc p-1 relative"
          style={{ width: 250, height: 100 }}
        >
          <div className="mb-3">
            {props.name.length > 20
              ? `${props.name.slice(0, 20)}...`
              : props.name}
          </div>
          <div className=" d-flex justify-content-around w-100  aic fs-6 fw-ligth ">
            <small className="icon-card " onClick={() => setShowDetails(true)}>
              <FontAwesomeIcon icon={faCircleInfo} /> Details
            </small>
            <small className="vr"></small>
            <small
              className="icon-card "
              onClick={() => setShowRnameForm(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} /> Rename
            </small>
            <small className="vr"></small>
            <small className="icon-card " onClick={() => setShowDelete(true)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </small>
          </div>
          <div
            className={`absolute icon-card text-light bg-m- d-flex jcc aic rounded-5 ${
              shwoGrowingspinner ? "d-none" : ""
            } `}
            style={{ width: 25, height: 25, top: 0, right: 0 }}
          >
            <FontAwesomeIcon
              icon={props.hidden ? faEyeSlash : faEye}
              onClick={onclickEye}
            />
          </div>
          <div
            className={`absolute bg-m- d-flex jcc aic rounded-5 ${
              !shwoGrowingspinner ? "d-none" : ""
            } `}
            style={{ width: 25, height: 25, top: 0, right: 0 }}
          >
            <div
              className={`spinner-grow  `}
              style={{ width: 25, height: 25, backgroundColor: "#98764a91" }}
              role="status"
            />
          </div>
          <div
            className={`absolute colorPicker pointer   d-flex jcc aic rounded-5 ${
              shwoGrowingspinner ? "d-none" : ""
            } `}
            style={{
              width: 25,
              height: 25,
              top: 0,
              left: 0,
            }}
            title="Change color"
            onClick={() => setShowRcolorForm(true)}
          >
            <FontAwesomeIcon
              icon={faDroplet}
              style={{
                fontSize: 10,
                color: props.color,
              }}
            />
          </div>
        </div>
      )}
      <Components.DeleteItemFromDimentions
        name={props.name}
        id={props.id}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
      />
      <div className={`modal bg-dark ${showDetails ? "d-flex" : "d-none"} `}>
        <Components.ActivityDetails
          name={props.name}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      </div>
    </div>
  );
};
export default CardActivity;
