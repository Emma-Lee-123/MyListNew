import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../UserContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import type { User } from "../models/User";
import { getAuthenticatedUser } from "../stores/UserStore";

const Signin = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState(""); // Local state for email
  const [password, setPassword] = useState(""); // Local state for password
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    //! operator checks if the value is falsy (null, undefined, empty string, etc.)
    if (!email || !password) {
      setMessage("Please fill all the fields");
      return;
    }

    setLoading(true);
    const loginUser: User = {
      id: 0,
      userName: "",
      email: email,
      password: password,
    };
    setUser(loginUser); // Set the user in context

    try {
      const authenticatedUser: User | undefined = await getAuthenticatedUser(
        loginUser
      );
      if (authenticatedUser) {
        setUser(authenticatedUser); // Set the authenticated user in context
        navigate("/home"); // Redirect to home page
      } else {
        setMessage("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100 px-3">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={6} lg={4}>
            <div className="bg-primary text-white text-center py-3">
              <h2 className="m-0 fw-bold">My List</h2>
            </div>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <h3 className="text-center mb-4">Sign In</h3>

                {/* {message && <Alert variant="danger">{message}</Alert>} */}

                <Form onSubmit={handleSignin}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    {/* <Form.Label>Email</Form.Label> */}
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-3">
                    <Form.Text className="text-muted">
                      <a href="#">Forgot password?</a>
                    </Form.Text>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <span>
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-decoration-none">
                      Sign Up
                    </Link>
                  </span>
                </div>

                <br />
                {message && <Alert variant="danger">{message}</Alert>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signin;
