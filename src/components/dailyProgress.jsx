import { Card, Spinner } from "react-bootstrap";
import selectors from "../imports/selectors";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import service from "../imports/Services";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  barThickness: 50,

  elements: {
    bar: {
      borderRadius: 25,
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Sat", "sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const DailyProgress = () => {
  const user = useSelector((s) => selectors.user(s));
  let [getData, setGetData] = useState(false);
  let [totalHr, setTotalHr] = useState(0);
  let [avgHr, setAvgHr] = useState(0);
  let [numActivities, setNumActivities] = useState(0);
  let [numGoals, setNumGoals] = useState(0);
  let [achievedGoals, setAchievedGoals] = useState(0);
  let [data,setData]=useState([1, 2, 3, 4, 5, 6, 70])
  useEffect(() => {
    if (!getData) {
      (async () => {
        let response = await service.request.request.get(
          "/doneActivity/dailyProgressDetails",
          {
            headers: { "x-authToken": user.token },
          }
        );
        setGetData(true);
        setTotalHr(response.data.totalHr);
        setAvgHr(response.data.avgHr);
        setNumActivities(response.data.numActivities);
        setNumGoals(response.data.numGoals);
        setAchievedGoals(response.data.achievedGoals);
        setData(response.data.data);
      })();
    }
  }, [getData, user.token]);

  return !getData ? (
    <div className="h-85vh m-shadow rounded-5 mb-5 p-2 d-flex  daily-hours-mobile d-flex aic jcc">
      <div className="d-flex aic jcc" style={{ height: "50vh" }}>
        <Spinner />
      </div>
    </div>
  ) : (
    <div className="h-85vh m-shadow rounded-5 mb-5 p-2 d-flex  daily-hours-mobile">
      <div className="w-75 rounded-5 rounded-end-0 m-shadow me-2 h-100 daily-hours-mobile-w-100  d-flex flex-column ">
        <div className="w-100 ">
          <div className="text-center shadow rounded-5 rounded-bottom-0 rounded-end-0 border-0 d-flex p-4 daily-hours-mobile-d-block">
            <Card.Body className="daily-hours-mobile-mb-50px">
              <div
                className=" rounded-circle d-flex flex-column jcc aic m-auto m-shadow bg-light p-2 daily-hours-mobile-shadow"
                style={{ width: 180, height: 180 }}
              >
                <div className="border-5 border-top border-start border-light p-1 rounded-circle border-m-  w-100 h-100">
                  <div className="border-5 border-bottom border-end  border-m- p-2 rounded-circle w-100 h-100 d-flex flex-column jcc aic">
                    <Card.Title>{numActivities}</Card.Title>
                    <Card.Text> Activities</Card.Text>
                  </div>
                </div>
              </div>
            </Card.Body>
            <Card.Body className="daily-hours-mobile-mb-50px">
              <div
                className=" rounded-circle d-flex flex-column jcc aic m-auto m-shadow bg-light p-2 daily-hours-mobile-shadow"
                style={{ width: 180, height: 180 }}
              >
                <div className="border-5 border-top border-start border-m p-1 rounded-circle  w-100 h-100">
                  <div className="border-5 border-bottom border-end  border-m p-2 rounded-circle w-100 h-100 d-flex flex-column jcc aic">
                    <Card.Title>{numGoals}</Card.Title>
                    <Card.Text> Goals</Card.Text>
                  </div>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div
                className=" rounded-circle m-shadow d-flex flex-column jcc aic m-auto   p-1 daily-hours-mobile-shadow"
                style={{ width: 180, height: 180 }}
              >
                <div
                  className="p-3 rounded-circle w-100 h-100"
                  style={{
                    backgroundImage:
                      //`linear-gradient(to left, #2dbab3 ${achievedGoals}%, white ${100-achievedGoals}%)`
                      `conic-gradient(#2dbab3 ${achievedGoals}%,white 0deg, white 270deg)`,
                  }}
                >
                  <div
                    className=" m-shadow   bg-light p-2 rounded-circle w-100 h-100 d-flex flex-column jcc aic daily-hours-mobile-shadow"
                    style={{ animationName: "none" }}
                  >
                    <Card.Title>{achievedGoals}%</Card.Title>
                    <Card.Text> Achieved Goals</Card.Text>
                  </div>
                </div>
              </div>
            </Card.Body>
          </div>
        </div>
        <div
          className="mt-2 p-2 m-shadow rounded-5 rounded-end-0 rounded-top-0 daily-hours-mobile-d-none  d-flex align-items-end"
          style={{ flexGrow: 1 }}
        >
          <Bar
          className="h-100"
            options={options}
            data={{
              labels,
              datasets: [
                {
                  label: "",
                  data,
                  backgroundColor: "#d4a465",
                },
              ],
            }}
            height={95}
          />
        </div>
      </div>
      <div className="w-25 h-100 daily-hours-mobile-w-100">
        <Card className="text-center m-shadow rounded-5 h-100 rounded-start-0 border-0">
          <Card.Body>
            <Card.Title className="daily-hours-mobile-d-none">
              Your Daily Hours
            </Card.Title>
            {["Total", "Average"].map((v) => {
              return (
                <div
                  className="m-shadow rounded-circle d-flex flex-column jcc aic m-auto mt-5 p-2 daily-hours-mobile-shadow"
                  style={{ width: 180, height: 180 }}
                  key={v}
                >
                  <div className="border-5 border-top border-start border-m p-1 rounded-circle w-100 h-100">
                    <div className="border-5 border-bottom border-end  border-m- p-2 rounded-circle w-100 h-100 d-flex flex-column jcc aic">
                      <Card.Title>{v === "Total" ? totalHr : avgHr}</Card.Title>
                      <Card.Text>{v} Hours</Card.Text>
                    </div>
                  </div>
                </div>
              );
            })}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default DailyProgress;
