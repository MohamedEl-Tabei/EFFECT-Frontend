import { useSelector } from "react-redux";
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
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import selectors from "../imports/selectors";
import services from "../imports/Services";
import { Spinner } from "react-bootstrap";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SleepVsActivity = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  const user = useSelector((s) => selectors.user(s));
  let [isMounted, setIsMounted] = useState(false);
  let [isEmpty, setIsEmpty] = useState(false);
  let [loader, setLoader] = useState(true);
  let [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    (async () => {
      if (isMounted) {
        try {
          let response = await services.request.request.post(
            "doneActivity/sleepVsActivity",
            { date: Date().slice(0, 15) },
            {
              headers: {
                "x-authToken": user.token,
              },
            }
          );
          setData(await response.data);
          await setLoader(false);

          await setIsEmpty(response.data==="no data");
        } catch (error) {
          setIsEmpty(true);
          setLoader(false);
        }
      }
    })();
    setIsMounted(true);
  }, [user.token, isMounted]);
  return (
    <div
      className={`h-85vh bg-light m-shadow mt-5    rounded-5 d-flex flex-column aic jcc daily-hours-mobile-d-none `}
    >
      {loader ? (
        <Spinner/>
      ) : isEmpty ? (
        <h1 className="text-danger ff-m daily-hours-mobile-d-none">No Data</h1>
      ) : (
        <div className=" d-flex flex-column aic jcc  h-100 w-100 daily-hours-mobile-d-none">
          <div className="w-100 h-100 d-flex aic jcc p-3">
           
              <Line className="w-100 h-100" options={options} data={data} />
           
          </div>
        </div>
      )}
    </div>
  );
};
export default SleepVsActivity;
