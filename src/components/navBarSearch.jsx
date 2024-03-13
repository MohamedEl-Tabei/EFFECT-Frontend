import {
  faAngleDown,
  faArrowLeftLong,
  faMagnifyingGlass,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import {
  Navbar,
  Container,
  Dropdown,
  Button,
  CloseButton,
} from "react-bootstrap";
import Components from "../imports/components";
import Selectors from "../imports/selectors";
import { useDispatch, useSelector } from "react-redux";
import actions from "../imports/Actions";
import service from "../imports/Services";

const NavBarSearch = ({ search, setSearch }) => {
  /////////////////////////////////states
  let [showSearch, setShowSearch] = useState(false);
  let [showAddForm, setShowAddForm] = useState(false);
  ////////////////////////////////redux
  let dimension = useSelector((s) => Selectors.dimension(s));
  let user = useSelector((s) => Selectors.user(s));
  let dispatch = useDispatch();
  //////////////////////////////ref
  const ref = useRef();
  ////////////////////////////effects
  const onCloseAddForm = () => {
    dispatch(actions.error.setError.action(""));
    setShowAddForm(false);
    dispatch(actions.dimension.setDimensions.action({ sendRequest: false }));
    if (search.length) {
      if (dimension.type === "Activities") {
        dispatch(
          service.searchActivities({ token: user.token, pageNumber: 1, search })
        );
      } else {
        dispatch(
          service.searchGoals({ token: user.token, pageNumber: 1, search })
        );
      }
    } else {
      if (dimension.type === "Activities")
        dispatch(
          service.getOnePageOfActivities({
            token: user.token,
            pageNumber: dimension.pageNumber,
          })
        );
      else
        dispatch(
          service.getOnePageOfGoals({
            token: user.token,
            pageNumber: dimension.pageNumber,
          })
        );
    }
  };
  return (
    <>
      <div className={`${!showAddForm ? "d-none" : ""}`}>
        <Components.AddNewItemToDimension onCloseAddForm={onCloseAddForm} />
      </div>
      <Navbar expand="lg" className="bg-body-tertiary shadow border-top py-3 ">
        <Container className="mx-3 flex-row " fluid>
          <div
            className={`relative ms-0 ms-lg-3  ${
              showSearch ? "d-none" : ""
            } d-lg-block`}
            style={{ minWidth: 200 }}
          >
            <div
              className="d-flex justify-content-between border-bottom border-m- border-3 pointer "
              onClick={() => ref.current.click()}
            >
              <h6>{dimension.type}</h6>
              <h6>
                <FontAwesomeIcon icon={faAngleDown} />
              </h6>
            </div>
            <Dropdown className="absolute " style={{ top: 35 }}>
              <Dropdown.Toggle
                ref={ref}
                split
                variant="success"
                className="d-none"
                id="dropdown-basic"
              />
              <Dropdown.Menu style={{ width: 200 }}>
                {["Activities", "Goals"].map((v, i) => (
                  <Dropdown.Item
                    className={`${
                      v === dimension.type ? "d-none" : "text-center"
                    }`}
                    key={i}
                    href="#/action-1"
                    onClick={() => {
                      dispatch(actions.dimension.setDimensionType.action(v));
                      setSearch("");
                      dispatch(
                        actions.dimension.setDimensions.action({
                          sendRequest: false,
                        })
                      );
                      if (v === "Activities") {
                        dispatch(
                          service.getOnePageOfActivities({
                            token: user.token,
                            pageNumber: 1,
                          })
                        );
                      } else {
                        dispatch(
                          service.getOnePageOfGoals({
                            token: user.token,
                            pageNumber: 1,
                          })
                        );
                      }
                    }}
                  >
                    {v}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div
            className={`d-flex jcc  aic w-100 ${
              showSearch ? "jcb-fornav" : "w-fornav-0"
            }  `}
          >
            <div
              className={`${
                showSearch ? "d-block" : "d-none"
              } d-lg-none me-5 backarr pointer fw-light fs-1`}
              onClick={() => setShowSearch(false)}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
            <div
              className={`form-group rounded-5 ${
                showSearch ? "d-block" : "d-none"
              } d-lg-block  w-100 relative`}
              style={{ maxWidth: 650 }}
            >
              <div className="d-flex form-control  border-3 rounded-5 p-0">
                <div
                  className="form-control wmc border-0 rounded-5"
                  style={{ color: "#ddddde" }}
                  onClick={(e) => {
                    e.currentTarget.parentNode.childNodes[1].focus();
                  }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                  value={search}
                  className="form-control  box-shadow-none border-0 rounded-5 w-100"
                  placeholder={`Search ${dimension.type}....`}
                  onFocus={(e) => {
                    e.currentTarget.parentNode.style.borderColor = "#2dbab3a6";
                    e.currentTarget.parentNode.style.boxShadow =
                      " 0 0 0 0.25rem rgb(45 186 179 / 27%)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.parentNode.style.boxShadow = "none";
                    e.currentTarget.parentNode.style.borderColor = "#ddddde";
                  }}
                  onChange={(e) => {
                    setSearch(e.currentTarget.value);
                    if (dimension.items.length || search.length <= 1) {
                      dispatch(
                        actions.dimension.setDimensions.action({
                          sendRequest: false,
                        })
                      );
                      if (dimension.type === "Activities") {
                        dispatch(
                          service.searchActivities({
                            search: e.currentTarget.value,
                            token: user.token,
                            pageNumber: 1,
                          })
                        );
                      } else {
                        dispatch(
                          service.searchGoals({
                            search: e.currentTarget.value,
                            token: user.token,
                            pageNumber: 1,
                          })
                        );
                      }
                    }
                  }}
                />
                <div
                  className="form-control wmc border-0 rounded-5 "
                  style={{ color: "#ddddde" }}
                  onClick={(e) => {
                    e.currentTarget.parentNode.childNodes[1].focus();
                    setSearch("");
                    dispatch(
                      actions.dimension.setDimensions.action({
                        sendRequest: false,
                      })
                    );
                    if (dimension.type === "Activities") {
                      dispatch(
                        service.getOnePageOfActivities({
                          token: user.token,
                          pageNumber: 1,
                        })
                      );
                    } else {
                      dispatch(
                        service.getOnePageOfGoals({
                          token: user.token,
                          pageNumber: 1,
                        })
                      );
                    }
                  }}
                >
                  <CloseButton
                    className={`${!search.length ? "invisible" : " "}`}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                showSearch ? "d-block" : "d-none"
              } d-lg-none invisible `}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
          </div>
          <div
            className={`d-none d-lg-block me-2 ${
              window.location.pathname === "/dimensions"
                ? "visible wmc"
                : "invisible"
            }`}
            style={{ width: 200 }}
          >
            <Button
              className="btn-m d-flex aic "
              style={{ minWidth: 140 }}
              onClick={() => setShowAddForm(true)}
            >
              <div className=" d-flex " style={{ minWidth: 130 }}>
                Add New {dimension.type.slice(0, -1).replace("ie", "y")}
              </div>
              <FontAwesomeIcon className="ms-2" icon={faPlusCircle} />
            </Button>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className={`btn-m text-light d-flex jcc aic  d-block d-lg-none rounded-circle ${
              showSearch ? "d-none" : ""
            } `}
            style={{ width: 40, height: 40 }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button
            onClick={() => setShowSearch(true)}
            className={`btn-m text-light d-flex jcc aic  d-block d-lg-none rounded-circle ${
              showSearch ? "d-none" : ""
            } `}
            style={{ width: 40, height: 40 }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarSearch;
