import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const StockConsumedForm = ({ show, handleClose }) => {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    units: "",
    description: "",
    dateTime: "",
    brandName: "",
    userId: "",      // user id added here
    siteManager: "", // site manager added here
    siteCode: "",    // site code added here
    siteName: "",    // site name added here
    siteId: ""       // site id added here
  });
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateTime: formattedDateTime,
    }));
  }, []);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites?userId=${user?.id}`);
        if (response.ok) {
          const data = await response.json();

          // Filter the sites based on the userId (assuming that userId is associated with specific sites)
          const userSites = data.filter(site => site.userId === user?.id);

          // If matching sites are found, use the details of the first one
          if (userSites.length > 0) {
            const selectedSite = userSites[0]; // Get the site details related to the user

            setFormData((prevFormData) => ({
              ...prevFormData,
              userId: user?.id,
              siteManager: selectedSite.siteManager,
              siteCode: selectedSite.siteCode,
              siteName: selectedSite.siteName,
              siteId: selectedSite.id,
            }));
            setSites(userSites);  // Save all the sites related to the user
          } else {
            console.error("No sites found for the user");
          }
        } else {
          console.error("Failed to fetch sites");
        }
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    if (user?.id) {
      fetchSites();
    }
  }, [user?.id]);


  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`; // Format for datetime-local
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the data to console before submitting
    console.log("Submitting the following data:", JSON.stringify(formData, null, 2));

    try {
      const response = await axios.post(
        `${BASE_URL}/stock-consumed`,
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
    <Modal.Header className="bg-primary text-white" closeButton>
      <Modal.Title>Stock Consumed Form</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          {/* Product Name */}
          <Col md={6}>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          {/* Brand Name */}
          <Col md={6}>
            <Form.Group controlId="formBrandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Quantity */}
          <Col md={6}>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          {/* Units */}
          <Col md={6}>
            <Form.Group controlId="formUnits">
              <Form.Label>Units</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter units (e.g., kg, pcs)"
                name="units"
                value={formData.units}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          {/* Date & Time */}
          <Col md={6}>
            <Form.Group controlId="formDateTime">
              <Form.Label>Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={(e) =>
                  setFormData({ ...formData, dateTime: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          {/* Attachment */}
          <Col md={6}>
            <Form.Group controlId="formAttachment">
              <Form.Label>Attachment</Form.Label>
              <Form.Control
                type="file"
                name="attachment"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* Description */}
          <Col md={12}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
);
};

export default StockConsumedForm;
