import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const StockConsumedForm = ({ show, handleClose }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    units: "",
    description: "",
    dateTime: "",
    brandName: "",
    userId: "",
    siteManager: "",
    siteCode: "",
    siteName: "",
    siteId: "",
  });

  const [sites, setSites] = useState([]);
  const [stockInProducts, setStockInProducts] = useState([]); // Store products from stock-in table
  const [brands, setBrands] = useState([]); // Store unique brands
  const [units, setUnits] = useState([]); // Store unique units

  // Fetch available products from stock-in API
  useEffect(() => {
    const fetchStockInProducts = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(`http://localhost:5000/stock-in`, {
          params: { userid: user.id },
        });

        if (response.status === 200) {
          setStockInProducts(response.data);

          // Extract unique brands and units
          const uniqueBrands = [...new Set(response.data.map(product => product.brand))];
          const uniqueUnits = [...new Set(response.data.map(product => product.units))];

          setBrands(uniqueBrands);
          setUnits(uniqueUnits);
        } else {
          console.error("Failed to fetch stock-in products");
        }
      } catch (error) {
        console.error("Error fetching stock-in products:", error);
      }
    };

    fetchStockInProducts();
  }, [user?.id]);

  // Fetch user-specific sites
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites?userId=${user?.id}`);
        if (response.ok) {
          const data = await response.json();
          const userSites = data.filter(site => site.userId === user?.id);

          if (userSites.length > 0) {
            const selectedSite = userSites[0]; // Get the first site related to the user

            setFormData((prevFormData) => ({
              ...prevFormData,
              userId: user?.id,
              siteManager: selectedSite.siteManager,
              siteCode: selectedSite.siteCode,
              siteName: selectedSite.siteName,
              siteId: selectedSite.id,
            }));
            setSites(userSites);
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

  // Format datetime
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateTime: formattedDateTime,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
                  as="select"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Product</option>
                  {stockInProducts.map((product) => (
                    <option key={product.id} value={product.product}>
                      {product.product}
                    </option>
                  ))}
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
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
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
                  as="select"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Unit</option>
                  {units.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Form.Control>
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
