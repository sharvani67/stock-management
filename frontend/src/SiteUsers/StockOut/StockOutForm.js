import React, { useState, useEffect,useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";


const StockOutModal = ({ show, handleClose }) => {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    dateTime: "",
    destinationSite: "",
    productName: "",
    brandName: "",
    quantity_out: "",
    units: "",
    attachment: null,
    status: "",
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

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`; // Format for datetime-local
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

    useEffect(() => {
      const fetchSites = async () => {
        try {
          const response = await fetch(`http://localhost:5000/sites?userId=${user?.id}`);
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

    // Log the data to console before submitting
    console.log("Submitting the following data:", JSON.stringify(formData, null, 2));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/stock-out",
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
        <Modal.Title>Stock Out Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
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

            {/* Destination Site */}
            <Col md={6}>
              <Form.Group controlId="formDestinationSite">
                <Form.Label>Destination Site</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter destination site"
                  name="destinationSite"
                  value={formData.destinationSite}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Product Name */}
            <Col md={6}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  as="select"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Product</option>
                  <option value="Cement">Cement</option>
                  <option value="Bricks">Bricks</option>
                  <option value="Paints">Paints</option>
                </Form.Control>
              </Form.Group>
            </Col>

            {/* Brand Name */}
            <Col md={6}>
              <Form.Group controlId="formBrandName">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  as="select"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="Brand A">Brand A</option>
                  <option value="Brand B">Brand B</option>
                  <option value="Brand C">Brand C</option>
                </Form.Control>
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
                  name="quantity_out"
                  value={formData.quantity_out}
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
                  as="select"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Unit</option>
                  <option value="Kgs">Kgs</option>
                  <option value="Pieces">Pieces</option>
                  <option value="Bags">Bags</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Status */}
            <Col md={6}>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Control>
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

          <Button variant="primary" type="submit" className="w-100">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StockOutModal;
