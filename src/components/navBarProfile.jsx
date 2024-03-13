import { useEffect, useRef } from "react";
import { Dropdown, ButtonGroup, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../imports/selectors";
import actions from "../imports/Actions";
const NavbarProfile = () => {
  const user = useSelector((s) => selectors.user(s));
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(()=>{
    if(!user.isAuth)
    {
      navigate("/")
    }
  },[navigate,user.isAuth])
  const ref = useRef();
  return (
    <div
      className="relative pointer"
      onClick={() => {
        ref.current.click();
      }}
    >
      <Image
        src={user.profilePicture}
        className="rounded-circle bg-light "
        style={{ width: 55, height: 55,padding:1.5 }}
      />
      <div className="mb-2 absolute " style={{ top: 10, left: -10 }}>
        <Dropdown as={ButtonGroup} drop="start">
          <Dropdown.Toggle id="dropdown-custom-1" ref={ref}></Dropdown.Toggle>
          <Dropdown.Menu className="text-center border-0">
            <Dropdown.Header className="text-m-">{user.name}</Dropdown.Header>
            <Dropdown.Divider className="border-m-" />
            <Link
              to={"/profile"}
              className={`dropdown-item text-light ${
                window.location.pathname === "/profile" ? "d-none" : ""
              }`}
            >
              Profile
            </Link>
           
            <Dropdown.Item
              className={`dropdown-item text-light`}
              onClick={async () => {
                ///////////////////////////////////
                document.cookie = `eff=;expires=${Date()}`;
                dispatch(
                  actions.user.updateUser.action({
                    name: "",
                    token: "",
                    dateOfBirth: "",
                    profilePicture: "",
                    email: "",
                    isAuth: false,
                    sendRequest: false,
                  })
                );
              }}
            >
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
export default NavbarProfile;
