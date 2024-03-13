import { useDispatch, useSelector } from "react-redux";
import Components from "../imports/components";
import Selectors from "../imports/selectors";
import { useEffect, useRef, useState } from "react";
import service from "../imports/Services";

const Dimensions = () => {
  ///////////////////////ref
  const ref = useRef();
  ///////////////////////redux
  let dimensions = useSelector((s) => Selectors.dimension(s));
  let user = useSelector((s) => Selectors.user(s));
  const dispatch = useDispatch();
  //////////////////////////states
  let [search, setSearch] = useState("");
  //let [typeOfDimention, setTypeOfDimension] = useState("Activities");
  let [firstRender, setFirstRender] = useState(true);
  ///////////////////////effects
  useEffect(() => {
    if (
      firstRender &&
      !dimensions.items.length &&
      dimensions.type === "Activities"
    ) {
      dispatch(
        service.getOnePageOfActivities({
          token: user.token,
          pageNumber: 1,
        })
      );
      setFirstRender(false);
    }
  }, [
    dispatch,
    user.token,
    firstRender,
    dimensions.type,
    dimensions.items.length,
  ]);
  useEffect(() => {
    ref.current.scrollTop = 0;
  }, [dimensions]);
  return (
    <div className="overflow-y-hidden h-100vh">
      <Components.NavBarMain active="dimensions" />
      <Components.NavBarSearch search={search} setSearch={setSearch} />
      <div
        className={`d-${!dimensions.sendRequest ? "flex" : "none"} jcc aic `}
        style={{ height: "70vh" }}
      >
        <Components.Loader />
      </div>
      <div
        ref={ref}
        className={`d-${
          dimensions.sendRequest ? "flex" : "none"
        } overflow-y-scroll flex-column justify-content-between`}
        style={{ height: "77vh" }}
      >
        <div className="m-4 d-flex flex-wrap  ">
          {dimensions.items.map((v, i) => (
            <div className="mx-auto mb-3" key={i}>
              {dimensions.type === "Activities" ? (
                <Components.CardActivity name={v.key.name} color={v.colorKey.color} hidden={v.hidden} id={v._id} />
              ) : (
                <Components.CardGoal name={v.key.name} expectedDate={v.expectedDateToAchieve} achievedDate={v.achievedDate} id={v._id} />
              )}
            </div>
          ))}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
            <div
              key={v}
              className="bg-info mx-auto "
              style={{ width: 257, height: 0 }}
            />
          ))}
        </div>
        <div>
          <Components.Pagination search={search} />
        </div>
      </div>
      <Components.ForgotPassword showForgotPass={user.token === ""} />
    </div>
  );
};

export default Dimensions;
