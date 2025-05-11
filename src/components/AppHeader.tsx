import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const AppHeader = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    const logoutuser = {
      id: 0,
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    setUser(logoutuser);

    navigate("/signin");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand className="fw-bold">My List</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <span className="me-3">Welcome {user?.userName}</span>
          <Nav.Link onClick={handleLogout} className="text-white">
            Sign Out
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
