import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const StockOutModal = ({ show, handleClose, handleSave }) => {
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
    userId: "",
    siteManager: "",
    siteCode: "",
    siteName: "",
    siteId: ""
  });
  const [sites, setSites] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/brands`);
        if (response.ok) {
          const data = await response.json();
          setBrands(data);
        } else {
          console.error("Failed to fetch brands");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch(`${BASE_URL}/units`);
        if (response.ok) {
          const data = await response.json();
          setUnits(data);
        } else {
          console.error("Failed to fetch units");
        }
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

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
    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
        const response = await axios.get(`${BASE_URL}/sites`);
        if (response.status === 200) {
          const allSites = response.data;
          setSites(allSites);
          const userSites = allSites.filter(site => site.userId === user?.id);
          if (userSites.length > 0) {
            const selectedSite = userSites[0];
            setFormData(prev => ({
              ...prev,
              userId: user?.id,
              siteManager: selectedSite.siteManager,
              siteCode: selectedSite.siteCode,
              siteName: selectedSite.siteName,
              siteId: selectedSite.id,
            }));
          } else {
            console.warn("No user-specific sites found");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/stock-out`, formData);
      alert(response.data.message);
      if (response.status === 200) {
        handleSave(formData); // Pass the new data to the parent component
        handleClose(); // Close the modal after saving
        window.location.reload(); // Refresh the page after closing the modal
      } else {
        alert(response.data.message);
      }
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
            <Col md={6}>
              <Form.Group controlId="formDestinationSite">
                <Form.Label>Destination Site</Form.Label>
                <Form.Control
                  as="select"
                  name="destinationSite"
                  value={formData.destinationSite}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Destination Site</option>
                  {sites
                    .filter(site => site.id !== formData.siteId)
                    .map((site) => (
                      <option key={site.id} value={site.siteName}>
                        {site.siteName}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Select
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBrandName">
                <Form.Label>Brand Name</Form.Label>
                <Form.Select
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.brandName}>
                      {brand.brandName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
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
            <Col md={6}>
              <Form.Group controlId="formUnits">
                <Form.Label>Units</Form.Label>
                <Form.Select
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Unit</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.name}>
                      {unit.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            {/* <Col md={6}>
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
            </Col> */}
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