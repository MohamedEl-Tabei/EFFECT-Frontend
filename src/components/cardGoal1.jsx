import { useState } from "react";
import Components from "../imports/components";
const CardGoal = (props) => {
  /*
    props:{
        achievedDate:"Not yet."
        expectedDate:"2023-12-27"
        id:"6585963abcf78889d8eb7175"
        name:"6"
    }
    */
  let [showDetails, setShowDetails] = useState(false);
  return (
    <div
      className=" d-flex flex-column justify-content-around aic p-3  rounded-5"
      style={{ width: 250, height: 250 }}
    >
      <div
        title="Details"
        className={`border-start border-top border-3 pointer w-100 h-100 ${
          props.achievedDate !== "Not yet." ? "border-m" : ""
        } p-1 rounded-5`}
        onClick={() => setShowDetails(true)}
      >
        <div
          className={`border-end border-bottom border-3 d-flex flex-column justify-content-around aic p-1 ${
            props.achievedDate !== "Not yet." ? "border-m-" : ""
          } h-100 w-100 rounded-5`}
        >
          <div className="d-flex jcc w-100 aic ff-m">{props.name}</div>
          <div
            className={`${
              props.achievedDate === "Not yet." ? "medal" : "medalg"
            }`}
          />
          <div>
            <small
              className={`${
                props.achievedDate === "Not yet." ? "invisible" : "visible"
              }`}
            >
              {props.achievedDate}
            </small>
          </div>
        </div>
      </div>
      <div className={`modal ${showDetails ? "d-flex jcc " : ""} p-1`}>
        <Components.GoalDetails setShowDetails={setShowDetails} showDetails={showDetails} goal={props} />
      </div>
    </div>
  );
};
export default CardGoal;
