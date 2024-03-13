import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Selectors from "../imports/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const ProfileShow = (props) => {
  const user = useSelector((s) => Selectors.user(s));
  return (
    <div className="d-flex aic jcc aic-xxsm-none aic-sm-none " style={{ height: "80vh" }}>
      <div
        className="bg-paper-card bg-paper-sm-none d-flex tex-light m-shadow m-shadow-xxsm-none m-shadow-sm-none h-50  rounded-5 flex-column flex-md-row w-50  w-md-75 w-xxsm-100 relative pe-md-5"
        style={{ height: "max-content",minWidth:"max-content" }}
      >
        <div className="icon-card text-dark fs-6 absolute" style={{ right: 25,top:20 }} onClick={()=>props.setShowEdit(true)}>
          <FontAwesomeIcon size="lg" icon={faGear} />
        </div>
        <div
          className="d-flex jcc aic   border-end  border-5 rounded-start-5 border-xxsm-none border-sm-none  p-5 h-100 me-0 me-md-5"
        >
          <div
            style={{ width: 230 }}
          >
            <Card.Img
              className="rounded-circle bg-light p-3 m-shadow"
              variant="top"
              src={user.profilePicture}
              style={{ width: 230, height: 230 }}

            />
          </div>
        </div>

        <div className=" d-flex  jcc aic  w-100 py-3 " >
          <Card.Body className=" d-flex  justify-content-around align-items-around h-100 py-4 flex-column ms-0 px-3 ms-md-5 ">
            <div></div>
            {[
              { Name: user.name },
              { Email: user.email },
              { Birthday: user.birthday },
            ].map((v, i) => (
              <div className="d-flex mb-3" key={i}>
                <Card.Title className="me-3 ps-3"style={{width:115}}>
                  {Object.keys(v)}
                </Card.Title>
                <Card.Title className="fw-light text-center w-100 ff-m">
                  {Object.values(v)}
                </Card.Title>
              </div>
            ))}
            <div></div>
          </Card.Body>
        </div>
      </div>
    </div>
  );
};
export default ProfileShow;
