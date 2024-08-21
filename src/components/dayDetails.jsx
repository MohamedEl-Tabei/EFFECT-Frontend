import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  Card,
  Form,
  ProgressBar,
  Spinner,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";
import services from "../imports/Services";
import selectors from "../imports/selectors";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
ChartJS.register(ArcElement, Tooltip, Legend);
const getHrs = (startTime, endTime) => {
  let sTime = Number(startTime.slice(0, 2)) + Number(startTime.slice(3)) / 60;
  let eTime = Number(endTime.slice(0, 2)) + Number(endTime.slice(3)) / 60;
  let time = eTime - sTime;
  return time;
};
const DayDetails = () => {
  let [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  let [date, setDate] = useState(Date());
  let [dateValue,setDateValue]=useState(0)
  let [showLoader, setShowLoader] = useState(true);
  let [index, setIndex] = useState(0);
  let [progress, setProgress] = useState(0);
  let [responseData, setResponseData] = useState([
    {
      startTime: "",
      endTime: "",
      note: "",
      emotion: 0,
      relatedGoals: [" "],
      activityName: "",
      color: "",
    },
  ]);
  let user = useSelector((s) => selectors.user(s));
  useEffect(() => {
    if (showLoader) {
      (async () => {
        let response = await services.request.request.post(
          "/doneActivity/getDoneActivityByDate",
          { date },
          {
            headers: {
              "x-authToken": user.token,
            },
          }
        );
        setResponseData(await response.data);
        let labels = ["Free"];
        let progTotal = 0;
        await response.data.forEach((rd) => {
          if (!labels.includes(rd.activityName)) labels.push(rd.activityName);
        });
        let arrData = [8];
        let colors = ["#e9ecef"];
        labels.forEach((v) => {
          let actvs = response.data.filter((a) => a.activityName === v);
          let sum = 0;
          actvs.forEach((a) => {
            sum = sum + getHrs(a.startTime, a.endTime);
          });
          progTotal = progTotal + sum;
          if (actvs[0]) {
            colors.push(actvs[0].color);
            arrData.push(sum);
            arrData[0] = arrData[0] - sum < 0 ? 0 : arrData[0] - sum;
          }
        });
        setProgress((progTotal / 8).toFixed(2) * 100>100?100:(progTotal / 8).toFixed(2) * 100);
        setData({
          labels: labels,
          datasets: [
            {
              label: "Hours",
              data: arrData,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],
        });
      })();
      setShowLoader(false);
    }
  }, [showLoader, date, user.token]);
  return showLoader ? (
    <div className=" m-shadow rounded-5 mt-5 daily-hours-mobile  h-85vh d-flex aic jcc p-2 daily-hours-mobile-d-none">
      <div className="d-flex jcc aic">
        <Spinner />
      </div>
    </div>
  ) : (
    <div className=" m-shadow rounded-5 mt-5 daily-hours-mobile d-flex h-85vh  p-2 daily-hours-mobile-d-none">
      <div className="w-50 h-100 relative  d-flex jcc aic   daily-hours-mobile-w-100  ">
        <div
          className="m-shadow rounded-circle d-flex aic jcc flex-column "
          style={{ width: 200, height: 200 }}
        >
          <Card.Title>{progress.toFixed(0)}%</Card.Title>

          <Card.Text>{date.slice(0, 15)}</Card.Text>
        </div>
        <div className="w-100 h-100  absolute d-flex jcc aic p-0 p-sm-3">
          <Doughnut
            className="p-1 p-lg-3 m-shadow rounded-circle daily-hours-mobile-shadow"
            data={data}
            options={{
              cutout: "75%",
              plugins: {
                legend: {
                  position: "bottom",
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
      <div className=" w-50 h-100 daily-hours-mobile-d-none ">
        <div className="w-100 h-100 d-flex flex-column justify-content-around aic m-shadow rounded-end-5 ">
          <div className=" w-100 d-flex aic justify-content-around">
            <div
              className=" bg-next  rounded-circle"
              style={{ rotate: "180deg",opacity:index===0?0.5:1,cursor:index===0?"not-allowed":"pointer" }}
              onClick={() => {
                if (index - 1 !== -1) setIndex(index - 1);
              }}
            />
            {responseData.map((v, i) => {
              return (
                <div
                  className={`${
                    index === i
                      ? "d-flex nav-bar-bg-dark text-light flex-column aic justify-content-around  p-3 relative rounded-5"
                      : "d-none"
                  }`}
                  key={i}
                  style={{height:200}}
                >
                  <div className="w-100  d-flex justify-content-between mb-3">
                    <OverlayTrigger
                      trigger="focus"
                      placement="right"
                      overlay={
                        <Popover id="popover-basic">
                          <Popover.Header
                            className={`text-center border-0 ${v.emotion===0?"d-none":""}`}
                            as="h3"
                          >
                            Color
                          </Popover.Header>
                          <Popover.Body className={`${v.emotion===0?"d-none":""}`}>
                            <div
                              className="m-auto"
                              style={{
                                width: 50,
                                height: 20,
                                backgroundColor: `${v.color}`,
                                color: `${v.color}`,
                              }}
                            />
                          </Popover.Body>
                          <Popover.Header
                            as="h3"
                            className="text-center border-0  rounded-0"
                          >
                            Note
                          </Popover.Header>
                          <Popover.Body>{v.note}</Popover.Body>
                          <Popover.Header
                            as="h3"
                            className={`text-center border-0 rounded-0 ${v.emotion===0?"d-none":""}`}
                          >
                            Goals
                          </Popover.Header>
                          <Popover.Body className={`${v.emotion===0?"d-none":""}`}>
                            {v.relatedGoals.map((rg, i) => (
                              <div key={i}>{rg}</div>
                            ))}
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Button
                        variant="dark"
                        className=" rounded-circle p-1 d-flex aic jcc  "
                        style={{ width: "max-content", height: "max-content" }}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </Button>
                    </OverlayTrigger>
                    <Form.Control
                      className="rounded-5 pointer"
                      onClick={(e)=>{
                        e.currentTarget.showPicker()
                      }}
                      style={{ width: 120, fontSize: 12 }}
                      onChange={(e) => {
                        if (e.currentTarget.value) {
                          let d = new Date(e.currentTarget.value);
                          setDate(d.toDateString());
                          setDateValue(e.currentTarget.value)
                        } else {
                          let d = new Date();
                          setDate(d.toDateString());
                        }
                        setShowLoader(true);
                      }}
                      value={dateValue?dateValue:new Date().toISOString().slice(0, 10)}
                      max={new Date().toISOString().slice(0, 10)}
                      type="date"
                    />
                  </div>

                  <h3
                    className="text-center text-m-  p-0 "
                    style={{ width: 300 }}
                  >
                    {v.activityName}
                  </h3>
                  <pre className="m-0 text-m mb-3">
                    {v.startTime === v.endTime
                      ? `${v.startTime}`
                      : `${v.startTime}  -  ${v.endTime}`}
                  </pre>
                </div>
              );
            })}
            <div
              className=" bg-next  rounded-circle"
              style={{ opacity:index===responseData.length-1?0.5:1,cursor:index===responseData.length-1?"not-allowed":"pointer" }}

              onClick={() => {
                if (index + 1 !== responseData.length) setIndex(index + 1);
              }}
            />
          </div>

          <ProgressBar
            className="w-75 rounded-5 fw-bold "
            style={{ height: 25 }}
            variant="dark"
            now={((index + 1) / responseData.length) * 100}
            label={index + 1}
          />
        </div>
      </div>
    </div>
  );
};

export default DayDetails;
