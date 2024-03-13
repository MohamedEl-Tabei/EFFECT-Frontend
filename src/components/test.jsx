import { Button } from "react-bootstrap";
import Components from "../imports/components";
import { Link } from "react-router-dom";

import actions from "../imports/Actions";
import { useDispatch } from "react-redux";
const CardHome = () => {
  let dispatch=useDispatch()
    return (
    <>
      <div className="bg-nature py-3 ">
        <div className="modal ">
          <div className="mt-4" style={{ transform: "scale(1.3)" }}>
            <Components.Logo />
          </div>
          <div className=" ff-m text-dark rounded-3 rounded-xxsm-0 -shadow w-xxsm-100 m-shadow-xxsm-none w-75 p-3 fs-6" style={{textAlign:"justify"}}>
           
          <h3 className="fw-semibold text-dark ff-m text-center">Manage Your Time</h3>
            Every moment of our lives is governed by the passage of time, and it
            impacts every action and decision we make. Time is involved in
            everything we do, from waking up and going to work to eating a meal,
            exercising, and socializing with friends and family. Our perception
            of time varies based on emotions and experiences, with moments of
            happiness and excitement appearing to pass quickly and dull or
            uncomfortable moments seemingly dragging on. To understand the
            importance of time, it is essential to recognize its role in
            achieving goals, success, and personal growth. Efficient time
            management helps us make the most of our limited hours and balance
            work, leisure, and self-improvement. Effective use of time is vital
            in maintaining our mental and physical well-being and overall life
            satisfaction.
          </div>
          <div>
            <div className="d-flex  flex-column" style={{width:205}}>
              <Link className="w-100 text-light" to={"/signup"}>
                <Button
                  variant="outline-light mb-3 btn-no border-0 w-100"
                  style={{ backgroundColor: "#2dbab3" }}
                  size="lg"
                  onClick={()=>{
                    dispatch(actions.error.setError.action(""))
    
                      }}
                >
                  Sign up
                </Button>
              </Link>
              <Link className="w-100 text-light" to={"/login"}>
                <Button
                  variant="outline-light btn-no border-0 w-100"
                  style={{ backgroundColor: "#d4a465" }}
                  size="lg"
                  onClick={()=>{
                    dispatch(actions.error.setError.action(""))
    
                      }}
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHome;
