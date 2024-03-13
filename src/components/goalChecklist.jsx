import { useEffect } from "react";
import { CloseButton, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../imports/selectors";
import services from "../imports/Services";
const GoalChecklist = (props) => {
  const addToGoals = (name) => {
    let names = [];
    while (props.goals.length) {
      names.push(props.goals.pop());
    }
    names.push(name);
    props.setGoals(names);
  };
  const deleteFromGoals = (name) => {
    let names = [];
    let n = "";
    while (props.goals.length) {
      n = props.goals.pop();
      if (name !== n) names.push(n);
    }
    props.setGoals(names);
  };
  let unachievedGoals = useSelector((s) => selectors.unachievedGoals(s));
  let user = useSelector((s) => selectors.user(s));
  const dispatch = useDispatch();
  useEffect(() => {
    if (unachievedGoals.firstTime) {
      dispatch(services.getUnachievedGoals({ token: user.token }));
    }
  }, [unachievedGoals, dispatch, user]);
  return (
    <div className="bg-light   w-100 h-100  px-5 relative">
      <CloseButton
        className="absolute "
        style={{ top: 15, right: 15 }}
        onClick={() => props.setShowGoalList(false)}
      />
      <div className=" w-100 h-100  relative py-4 px-3 ff-m ">
        <h3 className="ff-m text-m-  text-center">Select one or more goal.</h3>
        <div className="overflow-y-scroll" style={{ height: "90%" }}>
          <div className=" flex-wrap d-flex">
            {unachievedGoals.names.map((v, i) => {
              return (
                <div
                  key={i}
                  className="border border-3 rounded-3 d-flex jcc aic mx-auto mt-4 p-2"
                  style={{ width: 230, height: 50 }}
                >
                  <Form.Group className="w-100 d-flex jcc" controlId={i}>
                    <Form.Check
                      checked={props.goals.includes(v)}
                      value={v}
                      type="checkbox"
                      onChange={(e) => {
                        if (e.currentTarget.checked)
                          addToGoals(e.currentTarget.value);
                        else deleteFromGoals(e.currentTarget.value);
                      }}
                      label={v}
                    />
                  </Form.Group>
                </div>
              );
            })}
              <div
                  className="border border-3 rounded-3 d-flex jcc aic mx-auto mt-4 p-2 invisible"
                  style={{ width: 230, height: 0 }}
                />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalChecklist;
