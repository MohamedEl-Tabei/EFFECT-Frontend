import { Navbar, Container, Nav } from "react-bootstrap";
import Components from "../imports/components/index";
import { Link } from "react-router-dom";

const NavBarMain = (props) => {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="nav-bar-bg-dark"
    >
      <Container className="mx-3" fluid>
        <div className=" ms-lg-auto border border-m- border-3 rounded-circle p-1 d-block d-lg-none">
          <Components.NavbarProfile />
        </div>
        <Navbar.Brand
          className="m-0 me-lg-2"
          style={{ transform: "scale(.8)" }}
        >
          <Link className="nav-link" to={"/"}><Components.Logo /></Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex aic">
            {[
              { key: "Home", to: "/" },
              { key: "Dashboard", to: "/dashboard" },
              { key: "Dimensions", to: "/dimensions" },
            ].map((v, i) => (
              <Link
              key={i}
                className={`mx-auto my-3 my-lg-0 p-0 mx-lg-3 border-bottom border-3  h-100 nav-link ${
                  props.active === v.key.toLowerCase()
                    ? "border-m active"
                    : "border-invisible"
                }`}
                to={v.to}
              >
                {v.key}
              </Link>
            ))}
            <div className="mx-auto mx-lg-0 ms-lg-auto border border-m- border-3 rounded-circle  d-none d-lg-block pointer">
              <Components.NavbarProfile />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBarMain;
