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
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);


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

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id || !formData.siteName) return;
      try {
        const response = await fetch(`${BASE_URL}/fetch-all-products?userId=${user?.id}&siteName=${formData.siteName}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [user?.id, formData.siteName]);

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setFormData({ ...formData, productName: selectedProduct, brandName: "", units: "" });

    const filteredBrands = products.filter((item) => item.product === selectedProduct);
    setBrands(filteredBrands);
  };

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    const unit = brands.find((item) => item.brand === selectedBrand)?.units || "";
    setFormData({ ...formData, brandName: selectedBrand, units: unit });
  };

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
                <Form.Control as="select" name="productName" value={formData.productName} onChange={handleProductChange} required>
                  <option value="">Select Product</option>
                  {[...new Set(products.map((item) => item.product))].map((product, index) => (
                    <option key={index} value={product}>{product}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBrandName">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control as="select" name="brandName" value={formData.brandName} onChange={handleBrandChange} required>
                  <option value="">Select Brand</option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand.brand}>{brand.brand}</option>
                  ))}
                </Form.Control>
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
                <Form.Control type="text" name="units" value={formData.units} readOnly />
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