import { Button, CloseButton, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import services from "../imports/Services";
import Selectors from "../imports/selectors";
import Components from "../imports/components";
import { useEffect, useState } from "react";
import actions from "../imports/Actions";
const AddNewItemToDimension = (props) => {
  ////////////////////////states
  let [newItems] = useState([]);
  let [name, setName] = useState("");
  let [color, setColor] = useState("#FFFFFF");
  let [expectedDateToAchieve, setExpectedDateToAchieve] = useState("");
  ////////////////////////redux
  let error = useSelector((s) => Selectors.error(s));
  let user = useSelector((s) => Selectors.user(s));
  let dimension = useSelector((s) => Selectors.dimension(s));
  let dispatch = useDispatch();
  ///////////////////////////effects
  useEffect(() => {
    if (error.length) {
      newItems.pop()
    }
  }, [error.length,newItems]);
  ////////////////////////handlers
  const onSaveHandler = (e) => {
    e.preventDefault();
    if (dimension.type === "Activities") {
      dispatch(services.addNewActivity({color,name, token: user.token }));
    }
    if (dimension.type === "Goals") {
      dispatch(
        services.addNewGoal({ name, expectedDateToAchieve, token: user.token })
      );
    }
    newItems.push(name);
    setName("");
  };
  const onCloseAddForm = () => {
    props.onCloseAddForm();
    while (newItems.length) {
      newItems.pop();
    }
  };
  return (
    <div
      className="modal d-flex h-100vh jcc aic"
      style={{ backgroundColor: "#21252999" }}
    >
      <Form
        className="p-5 mx-3   w-xxsm-100 w-50 bg-light  d-flex flex-column jcc aic  rounded-5  relative bg-paper-card filter-shadow"
        onSubmit={(e) => onSaveHandler(e)}
      >
        <CloseButton
          className="absolute "
          style={{ top: 15, left: 15 }}
          onClick={onCloseAddForm}
        />
        <div
          className="d-flex w-100  flex-wrap overflow-y-scroll   mt-0 mb-3"
          style={{ height: "40vh" }}
        >
          {newItems.map((v, k) => (
            <div
              className="mt-2 mx-auto  p-2 d-flex jcc aic ff-m"
              style={{ width: 150, height: "max-content" }}
              key={k}
            >
              {v}
            </div>
          ))}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
            <div
              className="mt-2 mx-auto  p-2 invisible"
              style={{ width: 150, height: 0 }}
              key={v}
            />
          ))}
        </div>
        <div className="mb-2 fs-5">
          <Components.Error error={error} />
        </div>

        <Form.Group className={`${dimension.type==="Activities"?"d-none":""} mb-3 w-100`}>
          <Form.Label className="text-dark">Expected date to be achieved</Form.Label>
          <Form.Control
            size="lg"
            type="date"
            className="rounded-3 pointer"
            value={expectedDateToAchieve}
            onChange={(e) => {
              setExpectedDateToAchieve(e.currentTarget.value);
              dispatch(actions.error.setError.action(""));
            }}
            onClick={(e=>e.currentTarget.showPicker())}
          />
        </Form.Group>
        <Form.Group className={`${dimension.type!=="Activities"?"d-none":""} mb-3 w-100`}>
          <Form.Label className="text-dark">Color in chart</Form.Label>
          <Form.Control
            size="lg"
            type="color"
            className="rounded-3 pointer w-100"
            value={color}
            onChange={(e) => {
              setColor(e.currentTarget.value);
              dispatch(actions.error.setError.action(""));
            }}
            onClick={(e=>e.currentTarget.showPicker())}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-100">
          <Form.Control
            size="lg"
            type="text"
            className="rounded-3"
            placeholder={dimension.type.slice(0, -1).replace("ie", "y")}
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
              dispatch(actions.error.setError.action(""));
            }}
          />
        </Form.Group>
        <div className="d-flex justify-content-around mt-2 w-100">
          <Button size="lg" type="submit" className="w-50 me-5 btn-m">
            Save
          </Button>
          <Button
            size="lg"
            className="w-50 btn-dark"
            onClick={onCloseAddForm}
          >
            Cancle
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNewItemToDimension;
