import { Button, CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Selectors from "../imports/selectors";
import Components from "../imports/components";
import service from "../imports/Services";
import actions from "../imports/Actions";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GoalDetails = (props) => {
  let dispatch = useDispatch();
  let [numberOfHours, setNumberOfHours] = useState(0);
  let [data, setData] = useState({
    labels: [""],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "",
        backgroundColor: "",
      },
    ],
  });
  let user = useSelector((s) => Selectors.user(s));
  let pageNumber = useSelector((s) => Selectors.dimension(s)).pageNumber;
  let [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    setShowLoader(false);
  }, [props.goal.achievedDate]);
  useEffect(() => {
    if (props.showDetails) {
      (async () => {
        try {
          setShowLoader(true);
          let response = await service.request.request.post(
            "/goal/getGoalDetails",
            { goalName: props.goal.name },
            { headers: { "x-authToken": user.token } }
          );
          setData(await response.data.data);
          setNumberOfHours(await response.data.numberOfHours);
          setShowLoader(false);
        } catch (error) {
          // error Not found
          setData({
            labels: [""],
            datasets: [
              {
                label: "No Done Activity Founded!",
                data: [],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          });
          setShowLoader(false);
        }
      })();
    }
  }, [props.showDetails, props.goal.name, user.token]);
  return (
    <div
      className="w-75 w-xxsm-100 text-light border bg-c relative d-flex flex-column justify-content-between"
      style={{ height: "max-content", minHeight: "100%" }}
    >
      <div
        className={`absolute  w-100  d-flex jcc aic z-1 ${
          !showLoader ? "d-none" : ""
        }`}
        style={{ top: 0, left: 0, height: "101%" }}
      >
        <h1>Loading...</h1>
        <div className="animationScanner absolute" />
      </div>
      <div
        className={`${showLoader ? "invisible " : ""} ${
          props.goal.achievedDate === "Not yet." ? "bg-secondary" : "bg-m"
        }   pb-3 d-flex flex-column jcc aic w-100 rounded-bottom-circle  border-bottom border-5`}
      >
        <div
          className="nav-bar-bg-dark  d-flex flex-column jcc aic w-100 border-bottom border-5"
          style={{
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
          }}
        >
          <div className="w-100 d-flex justify-content-end">
            <CloseButton
              variant="white"
              className="p-3"
              onClick={() => {
                props.setShowDetails(false);
              }}
            />
          </div>
          <div
            className={`${
              props.goal.achievedDate === "Not yet." ? "d-none" : ""
            } d-flex jcc aic`}
          >
            <Components.Logo />
          </div>
          <div
            className=" text-m- p-4 d-flex flex-column jcc aic relative  w-100 "
            style={{
              borderBottomLeftRadius: "50%",
              borderBottomRightRadius: "50%",
            }}
          >
            <h1
              className={`${
                props.goal.achievedDate === "Not yet." ? "d-none" : ""
              } ff-m `}
            >
              Certificate
            </h1>
            <h3
              className={`${
                props.goal.achievedDate !== "Not yet." ? "d-none" : ""
              } ff-m text-center `}
            >
              Click on the medal when you achieve the goal.
            </h3>
            <div className="W-100 absolute  " style={{ bottom: -55 }}>
              <div
                className={`  ${
                  props.goal.achievedDate === "Not yet." ? "medal" : "medalg"
                } pointer`}
                onClick={() => {
                  setShowLoader(true);
                  dispatch(
                    service.setDateOfAchievement({
                      _id: props.goal.id,
                      goalName: props.goal.name,
                      token: user.token,
                      pageNumber,
                      date:
                        props.goal.achievedDate === "Not yet."
                          ? new Date().toISOString().slice(0, 10)
                          : "Not yet.",
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          showLoader ? "invisible " : ""
        } d-flex flex-column jcc aic mt-5 `}
        style={{
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
        }}
      >
        <h4 className="fw-light">
          {props.goal.achievedDate === "Not yet." ? "THE EXPECTED DATE" : ""}
        </h4>
        <h3 className="text-m- text-center ff-m">
          {props.goal.achievedDate === "Not yet." ? (
            props.goal.expectedDate
          ) : (
            <span className="text-light">{`You spent ${
              numberOfHours.toFixed(2)
            } hours of efforts to ${props.goal.name}`}</span>
          )}
        </h3>
        <hr className="p-1 w-75" />
        <div className="text-center d-flex aic flex-column mb-4">
          <div className="wmc text-m ff-m ">{`${props.goal.achievedDate === "Not yet." ?props.goal.name.toUpperCase():"Congratulations"}`}</div>
        </div>
        <div className="w-50 w-xxsm-100 d-flex ">
          {props.showDetails ? (
            <Doughnut
            className={`w-100 h-100 p-3 ${props.goal.achievedDate === "Not yet." ?"":"d-none"}`}
              options={{
                cutout:"70%",
                responsive: true,
                plugins: {
                  legend: {
                    display:false,
                    position: "top",
                  },
                },
              }}
              data={data}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={`${showLoader ? "invisible " : ""} ${
          props.goal.achievedDate === "Not yet." ? "d-none" : ""
        } w-100 d-flex justify-content-between p-5 text-light`}
      >
        <div className="text-center">
          <div>DATE</div>
          <div className="ff-m text-m- mt-2">{props.goal.achievedDate}</div>
        </div>
        <div className="text-center">
          <div>EXPECTED</div>
          <div className="ff-m text-m- mt-2">{props.goal.expectedDate}</div>
        </div>
      </div>
      <div
        className={`${showLoader ? "invisible " : ""} ${
          props.goal.achievedDate !== "Not yet." ? "d-none" : ""
        } w-100 d-flex justify-content-center py-5 text-light`}
      >
        <Button
          onClick={() => {
            dispatch(actions.dimension.setDimensionSendRequest.action());
            dispatch(
              service.deleteOneGoal({
                token: user.token,
                pageNumber,
                _id: props.goal.id,
                goalName: props.goal.name,
              })
            );
            props.setShowDetails(false);
          }}
          className="btn-danger"
        >
          Delete the goal and all related activties.
        </Button>
      </div>
    </div>
  );
};
export default GoalDetails;
