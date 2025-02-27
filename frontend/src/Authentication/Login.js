import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../ApiService/Api";
import "./Login.css"; // Import external CSS file
import logo from "../assets/images/MSlogo.jpg"; // Ensure the correct path for your logo

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "admin@gmail.com" && formData.password === "admin@123") {
      login({ email: "admin@gmail.com", role: "admin" });
      navigate("/adminhome");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.user);
        navigate("/home");
      } else {
        const errData = await response.json();
        setError(errData.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container className="login-container">
      <Row className="login-box">
        {/* Left Side - Square Logo */}
        <Col md={5} className="login-logo-container">
          <Image src={logo} alt="Logo" className="login-logo" />
        </Col>

        {/* Right Side - Login Form */}
        <Col md={7} className="login-form-container">
          <Card className="login-card">
            <Card.Body>
              <h2 className="login-title">Login</h2>
              <p className="login-subtitle">Sign in to continue</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {error && <p className="error-text">{error}</p>}

                <Button type="submit" className="login-button">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
