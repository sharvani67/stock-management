import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

const StockOutModal = ({ show, handleClose }) => {
  const { user } = useContext(AuthContext);
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
  const [stockSummary, setStockSummary] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);

  // Fetch Stock Summary Data (Products, Brands, Units)
  useEffect(() => {
    const fetchStockSummary = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/stock-summary`, {
          params: { userid: user?.id },
        });
        if (response.status === 200) {
          setStockSummary(response.data);
        } else {
          console.error("Failed to fetch stock summary data");
        }
      } catch (error) {
        console.error("Error fetching stock summary:", error);
      }
    };

    if (user?.id) {
      fetchStockSummary();
    }
  }, [user?.id]);

  // Populate Date Automatically
  useEffect(() => {
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
    setFormData((prev) => ({
      ...prev,
      dateTime: formattedDateTime,
    }));
  }, []);

  // Fetch User-Specific Sites
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sites`);
        if (response.status === 200) {
          const allSites = response.data;
          setSites(allSites);
          const userSites = allSites.filter((site) => site.userId === user?.id);
          if (userSites.length > 0) {
            const selectedSite = userSites[0];
            setFormData((prev) => ({
              ...prev,
              userId: user?.id,
              siteManager: selectedSite.siteManager,
              siteCode: selectedSite.siteCode,
              siteName: selectedSite.siteName,
              siteId: selectedSite.id,
            }));
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

  // Format DateTime
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Handle Form Changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Handle Product Selection
  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setFormData((prev) => ({
      ...prev,
      productName: selectedProduct,
      brandName: "",
      units: "",
    }));

    // Filter available brands and units for the selected product
    const productBrands = [
      ...new Set(
        stockSummary
          .filter((item) => item.productName === selectedProduct)
          .map((item) => item.brandName)
      ),
    ];
    setFilteredBrands(productBrands);
    setFilteredUnits([]); // Reset units until brand is selected
  };

  // Handle Brand Selection
  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setFormData((prev) => ({
      ...prev,
      brandName: selectedBrand,
      units: "",
    }));

    // Filter available units for the selected product-brand combination
    const productUnits = [
      ...new Set(
        stockSummary
          .filter(
            (item) =>
              item.productName === formData.productName &&
              item.brandName === selectedBrand
          )
          .map((item) => item.units)
      ),
    ];
    setFilteredUnits(productUnits);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/stock-out`, formData);
      alert("Stock out entry added successfully!");
      handleClose();
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
                  as="select"
                  name="destinationSite"
                  value={formData.destinationSite}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Destination Site</option>
                  {sites
                    .filter(site => site.id !== formData.siteId) // Exclude selected site
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
            {/* Product Name */}
            <Col md={6}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  as="select"
                  name="productName"
                  value={formData.productName}
                  onChange={handleProductChange}
                  required
                >
                  <option value="">Select Product</option>
                  {stockSummary.map((item, index) => (
                    <option key={index} value={item.productName}>
                      {item.productName}
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
                  onChange={handleBrandChange}
                  required
                  disabled={!formData.productName}
                >
                  <option value="">Select Brand</option>
                  {filteredBrands.map((brand, index) => (
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
                  disabled={!formData.brandName}
                >
                  <option value="">Select Unit</option>
                  {filteredUnits.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
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

export default StockOutModal;
