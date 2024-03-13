import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowLeft,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Selectors from "../imports/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import service from "../imports/Services";
import actions from "../imports/Actions";
const Pagination = ({ search }) => {
  /////////////////////////////redux
  let dimension = useSelector((s) => Selectors.dimension(s));
  let user = useSelector((s) => Selectors.user(s));
  const dispatch = useDispatch();
  /////////////////////////////states
  let [pageNumber, setPageNumber] = useState(dimension.pageNumber);
  let [pageNumber__, setPageNumber__] = useState(dimension.pageNumber);

  ////////////////////////////effect
  useEffect(() => {
    setPageNumber(dimension.pageNumber);
    setPageNumber__(dimension.pageNumber);
  }, [dimension.numberOfPages, dimension.pageNumber]);
  ///////////////////////////handler
  const onChangePage = (pageNumber_) => {
    dispatch(actions.dimension.setDimensions.action({ sendRequest: false }));
    if (search.length) {
      if(dimension.type==="Activities")
      {
        dispatch(
          service.searchActivities({
            token: user.token,
            pageNumber: pageNumber_,
            search,
          })
        );
      }
      else{
        dispatch(
          service.searchGoals({
            token: user.token,
            pageNumber: pageNumber_,
            search,
          })
        );
      }
    } else {
      if (dimension.type === "Activities") {
        dispatch(
          service.getOnePageOfActivities({
            token: user.token,
            pageNumber: pageNumber_,
          })
        );

      } else {
        dispatch(
          service.getOnePageOfGoals({
            token: user.token,
            pageNumber: pageNumber_,
          })
        );
      }
    }
    setPageNumber(pageNumber_);
    setPageNumber__(pageNumber_);
  };

  return (
    <div
      className={`d-${
        dimension.numberOfPages <= 1 ? "none" : "flex"
      } px-5 aic  border-top py-4 flex-column-xxsm`}
    >
      <div className="d-flex mx-auto">
        <Button
          className="me-4 btn-m-outline"
          size="md"
          disabled={pageNumber === 1}
          onClick={() => onChangePage(pageNumber - 1)}
        >
          <FontAwesomeIcon icon={faLongArrowLeft} />
        </Button>
        <small className="d-sm-none me-4 d-flex aic">
          {`Page ${dimension.pageNumber} of ${dimension.numberOfPages}`}
        </small>
        <Button
          className="btn-m wmc d-flex aic "
          size="md"
          disabled={pageNumber === dimension.numberOfPages}
          onClick={() => onChangePage(pageNumber + 1)}
        >
          <span className="d-none d-sm-flex me-2">Next page</span>
          <FontAwesomeIcon icon={faLongArrowRight} />
        </Button>
      </div>
      <div className="d-none d-sm-flex ">
        page
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onChangePage(pageNumber__);
          }}
        >
          <Form.Control
            size="sm"
            className="mx-3 rounded-3 text-center"
            type="number"
            style={{ width: 60 }}
            value={pageNumber__}
            max={dimension.numberOfPages}
            min={1}
            onChange={(e) => setPageNumber__(Number(e.currentTarget.value))}
          />
        </Form>
        {`of ${dimension.numberOfPages}`}
      </div>
    </div>
  );
};
export default Pagination;
