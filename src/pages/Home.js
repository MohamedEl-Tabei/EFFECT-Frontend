import { useSelector } from "react-redux";
import Components from "../imports/components";
import Selectors from "../imports/selectors";
import { useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";

const Home = () => {
  let user = useSelector((s) => Selectors.user(s));
  let error = useSelector((s) => Selectors.error(s));
  let [wkupTime, setWkupTime] = useState("");
  let [showTable, setShowTable] = useState(false);
  useEffect(() => {
    setWkupTime(user.wkupTime);
    if (!user.wkupTime.length) {
      setShowTable(false);
    }
  }, [user.wkupTime]);

  if (user.isAuth) {
    return (
      <div className=" bg-paper-card overflow-hidden h-100vh m-shadow.">
        <Components.NavBarMain active="home" />

        <div
          className={`${
            user.wkupTime.length ? "overflow-y-scroll " : " "
          } p-sm-3 `}
          style={{ height: "87.7vh" }}
        >
          <div className={`jcc ${!error.length ? "d-none " : "d-flex "}`}>
            <h4 className="text-center bg-dark p-3">
              <Components.Error />
            </h4>
          </div>
          <h3
            className={`border-dark m-0  ff-m d-flex mx-auto user-select-none mb-4 flex-wrap  p-3 relative`}
            style={{ maxWidth: "max-content" }}
          >
            {user.wkupTime.length ? (
              ` I woke up today, ${Date().slice(0, 16)}, at ${wkupTime}.`
            ) : (
              <span>when did you sleep and wake up?</span>
            )}

            {/*Button to send data in home activity component */}
          </h3>
          <Components.ForgotPassword showForgotPass={user.token === ""} />
          {/*/////////////////////////////Done Activities////////////////////////////////*/}
          <div
            className={` ${
              user.wkupTime.length ? "d-none" : "d-flex flex-column aic"
            }    `}
          >
            <Components.SleepSchedule />
          </div>
          <div
            className={` ${
              showTable || !user.wkupTime.length ? "d-none" : "d-flex"
            }   flex-wrap  relative `}
            style={{ height: "70vh" }}
          >
            <Components.ChartPieActivities
              keyOfData={"endTime-startTime"}
              keyOfLabels={"activityName"}
              forWhat={"today"}
            />
            <Components.HomeActivity wkupTime={wkupTime} />
            <h4
              className=" pointer text-light-hover ff-m absolute text-decoration-underline"
              style={{
                top: 5,
                display: user.wkupTime.length ? "flex" : "none",
              }}
              onClick={() => setShowTable(true)}
            >
              Table of details
            </h4>
          </div>
          <div className={`modal  bg-light ${showTable ? "d-flex" : "d-none"}`}>
            <CloseButton
              className="absolute pointer z-3"
              style={{ top: 5, right: 5 }}
              onClick={() => setShowTable(false)}
            />
            <Components.DoneTodayTable />
          </div>
          {/*/////////////////////////////Done Goals////////////////////////////////*/}
          {/*<div className="shadow w-100 my-4" style={{ height: "70vh" }}></div>*/}
        </div>
      </div>
    );
  }
  return <Components.CardHome />;
};
export default Home;
