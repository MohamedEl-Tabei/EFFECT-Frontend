import { useEffect, useState } from "react";
import { CloseButton, Spinner } from "react-bootstrap";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import selectors from "../imports/selectors";
import services from "../imports/Services";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

ChartJS.register();

/*

        name={props.name}
        showDetails={showDetails}
        setShowDetails={setShowDetails}

*/
const ActivityDetails = (props) => {
  let user = useSelector((s) => selectors.user(s));
  let [labels, setLabels] = useState([]);
  let [data,setData]=useState([])
  let [color,setColor]=useState("")
  let [noDetails, setNoDetails] = useState(false);
  let [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    if (props.showDetails) {
      (async () => {
        try {
          setNoDetails(false);
          let response = await services.request.request.post(
            "/activity/detailsOfActivity",
            { name: props.name },
            {
              headers: {
                "x-authToken": user.token,
              },
            }
          );
          await setLabels(response.data.labels);
          await setColor(response.data.color)
          await setData(response.data.data)
          await setShowLoader(false);
        } catch (error) {
          setNoDetails(true);
          setShowLoader(false);
        }
      })();
    }
  }, [props.name, props.showDetails, user.token]);
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

  const dataOfLine = {
    labels,
    datasets: [
      {
        label: props.name,
        data: data,
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };


  return (
    <div className="w-100 h-100 text-light d-flex flex-column jcc aic relative">
      <div
        className="w-100  d-flex justify-content-end p-3 absolute"
        style={{ top: 0 }}
      >
        <CloseButton
          variant="white"
          onClick={() => {
            props.setShowDetails(false);
            setShowLoader(true);
          }}
        />
      </div>
      <div className="d-flex jcc" style={{ width: "90%" }}>
        {showLoader ? (
          <Spinner />
        ) : noDetails ? (
          <h1 className="text-danger ff-m">No Details</h1>
        ) : (
          <Line options={options} data={dataOfLine} />
        )}
      </div>
    </div>
  );
};

export default ActivityDetails;
