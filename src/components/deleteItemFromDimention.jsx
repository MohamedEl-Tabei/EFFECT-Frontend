import { Button, CloseButton, Form } from "react-bootstrap";
import Selectors from "../imports/selectors";
import { useDispatch, useSelector } from "react-redux";
import services from "../imports/Services";
import { useState } from "react";
import actions from "../imports/Actions";
const DeleteItemFromDimentions = (props) => {
  let dimentions = useSelector((s) => Selectors.dimension(s));
  let user = useSelector((s) => Selectors.user(s));
  let dispatch = useDispatch();
  let [confrmSTR, setConfrmSTR] = useState("");
  ///////////////handler
  const onDelete = () => {
    dispatch(actions.dimension.setDimensionSendRequest.action(false));
    if (dimentions.type === "Activities") {
      dispatch(
        services.deleteOneActivity({
          pageNumber: dimentions.pageNumber,
          _id: props.id,
          token: user.token,
          name:props.name
        })
      );
    }
    if (dimentions.type === "Goals") {
      dispatch(
        services.deleteOneGoal({
          pageNumber: dimentions.pageNumber,
          _id: props.id,
          token: user.token,
        })
      );
    }
  };
  return (
    <div className={`modal ${props.showDelete ? "d-flex" : ""} jcc aic`}>
      {dimentions.sendRequest ? (
        <div className=" p-5 mx-3   w-xxsm-100 w-50 bg-light  d-flex flex-column jcc   rounded-5  relative bg-paper-card filter-shadow">
          <CloseButton
            className="absolute "
            style={{ top: 10, left: 10 }}
            onClick={() => props.setShowDelete(false)}
          />
          <Form.Group>
            <Form.Label className="text-dark">
              You will delete <span className="fw-bold">{props.name}</span> from
              your
              <span className="fw-bold">
                {" "}
                {dimentions.type.toLowerCase()}{" "}
                {dimentions.type === "Activities"
                  ? "and history"
                  : "and achievement"}
              </span>
              .
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                setConfrmSTR(e.currentTarget.value);
              }}
              placeholder={props.name}
            />
          </Form.Group>
          <div className=" ms-auto mt-3">
            <Button
              variant="dark"
              className="me-3"
              onClick={() => props.setShowDelete(false)}
            >
              Cancle
            </Button>

            <Button
              variant="danger"
              disabled={confrmSTR !== props.name}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className=" p-5 mx-3   w-xxsm-100 w-50 bg-light  d-flex flex-column jcc   rounded-5  relative bg-paper-card filter-shadow"></div>
      )}
    </div>
  );
};

export default DeleteItemFromDimentions;
