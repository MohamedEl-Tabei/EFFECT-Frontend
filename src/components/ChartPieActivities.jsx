import { useSelector } from "react-redux";
import selectors from "../imports/selectors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
ChartJS.register(ArcElement, Tooltip, Legend);
const ChartPieActivities = () => {
  const todayDoneActivities = useSelector((s) =>
    selectors.todayDoneActivity(s)
  );
  let [wastedTime, setWastedTime] = useState(8);
  let [time, setTime] = useState(0);
  let [stopForTimeUseEffect, setStopForTimeUseEffect] = useState(false);
  let [dailyProgress, setDailyProgress] = useState(0);
  const activitiesData = [wastedTime];
  const activitiesLabels = ["Free"];
  const activitiesColor = ["white"];
  useEffect(() => {
    if (stopForTimeUseEffect) {
      setWastedTime(8 - time);
      setDailyProgress(
        (time / 8) * 100 > 100 ? 100 : (time / 8).toFixed(2) * 100
      );
      setStopForTimeUseEffect(false);
    }
  }, [stopForTimeUseEffect, wastedTime, time]);
  useEffect(() => {
    if (wastedTime < 0) {
      setWastedTime(0);
    }
  }, [wastedTime]);
  useEffect(() => {
    setStopForTimeUseEffect(true);
    let sum = 0;
    todayDoneActivities.items.forEach((v) => {
      let sTime =
        Number(v.startTime.slice(0, 2)) + Number(v.startTime.slice(3, 5)) / 60;
      let eTime =
        Number(v.endTime.slice(0, 2)) + Number(v.endTime.slice(3, 5)) / 60;
      sum = sum + (eTime - sTime);
    });
    setTime(sum);
  }, [todayDoneActivities]);
  todayDoneActivities.items.forEach((v) => {
    let sTime =
      Number(v.startTime.slice(0, 2)) + Number(v.startTime.slice(3, 5)) / 60;
    let eTime =
      Number(v.endTime.slice(0, 2)) + Number(v.endTime.slice(3, 5)) / 60;
    let index = activitiesLabels.findIndex((l) => l === v.activityName);
    if (index === -1) {
      if (eTime - sTime !== 0) {
        activitiesData.push(eTime - sTime);
        activitiesLabels.push(v.activityName);
        activitiesColor.push(v.color);
      }
    } else {
      activitiesData[index] = activitiesData[index] + (eTime - sTime);
    }
  });
  const data = {
    labels: activitiesLabels,
    datasets: [
      {
        label: "Number of hours",
        data: activitiesData,
        backgroundColor: activitiesColor,
        borderColor: activitiesColor,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      className={` d-flex jcc aic w-50 w-xxsm-100 py-5  relative`}
      style={{ maxHeight: "100%" }}
    >
      <div
        className="d-flex jcc aic flex-column absolute  bg-light m-shadow rounded-circle"
        style={{ width: 150, height: 150 }}
      >
        <div className=" d-flex flex-column jcc aic w-100 h-100 ">
          <Card.Title>{Math.floor(dailyProgress)}%</Card.Title>
          
            <pre><Card.Text>Daily Progress</Card.Text></pre>
          
        </div>
      </div>
      <Doughnut
      className="p-3"
        onMouseOver={(e) => {
          e.currentTarget.parentNode.childNodes[0].style = "visibility:hidden";
        }}
        onMouseOut={(e) => {
          e.currentTarget.parentNode.childNodes[0].style = "visibility:visible;width: 150px; height: 150px";
        }}
        data={data}
        options={{
          cutout:"60%",
          plugins: {
            legend: {
              position: "bottom",
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default ChartPieActivities;
