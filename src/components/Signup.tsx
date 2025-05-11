import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useUser } from "../UserContext";
import { addNewUser, userNameOrEmailExists } from "../stores/UserStore";

const Signup = () => {
  const { user, setUser } = useUser(); // Get user context

  const [message, setMessage] = useState<string>("");

  //handle input changes for name, email, password and confirm password, no need to call backend, so not async
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const id = event.target.id; // get the id of the input field
    const value = event.target.value; // get the value of the input field
    if (id === "password") {
      const signupUser = { ...user, password: value, confirmPassword: "" }; // clear confirm password if password is changed
      setUser(signupUser); // clear confirm password if password is changed
    } else {
      const signupUser = { ...user, [id]: value };
      setUser(signupUser);
    }

    console.log(user);
  };

  //handle signup, check if all fields are filled, if password and confirm password match, if email id already exists, if not save the user
  //and show success message, if any error occurs, show error message
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent default form submission
    setMessage(""); // clear previous message

    if (
      !user ||
      !user.userName ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      setMessage("Please fill all the fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setMessage("Password and Confirm Password do not match");
      return;
    }

    //check if email already exists
    try {
      if (await userNameOrEmailExists(user.userName, user.email)) {
        setMessage("User already exists");
        return;
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      setMessage(
        "An error occurred while checking user existence. Please try again."
      );
      return;
    }

    //at this point, it's a new user, save the user
    try {
      const addedUser = await addNewUser(user);
      setUser(addedUser); // set the user to the added user
      setMessage("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("An error occurred while signing up. Please try again.");
      return;
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100 px-3">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={6} lg={5}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <h3 className="text-center mb-4">Sign Up</h3>

                {message && (
                  <Alert
                    variant={
                      message.includes("successfully") ? "success" : "danger"
                    }
                  >
                    {message}
                  </Alert>
                )}

                <Form onSubmit={handleSignup}>
                  <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      required
                      value={user ? user.userName : ""}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                      value={user ? user.email : ""}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      required
                      value={user ? user.password : ""}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-enter password"
                      required
                      value={user ? user.confirmPassword : ""}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100">
                    Sign Up
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <span>
                    Already have an account?{" "}
                    <Link to="/signin" className="text-decoration-none">
                      Sign In
                    </Link>
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
