import { useSelector } from "react-redux";
import selectors from "../imports/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
const Error = () => {
  const error = useSelector((s) => selectors.error(s));
  return (
    <small className={` text-danger visible d-flex ${error.length?"visible":"invisible"} aic`}>
      <div className=" me-2">
        <FontAwesomeIcon icon={faXmarkCircle} />
      </div>
      <div>{error}</div>
    </small>
  );
};
export default Error;
