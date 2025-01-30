import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";

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
  const [stockInProducts, setStockInProducts] = useState([]); // Store products from stock-in table
  const [stockInBrands, setStockInBrands] = useState([]); // State to store unique brands
  const [stockInUnits, setStockInUnits] = useState([]); // State to store unique brands

  // Fetch available products, brands, and units from stock-in API
  useEffect(() => {
    const fetchStockInData = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(`${BASE_URL}/stock-in`, {
          params: { userid: user.id },
        });

        if (response.status === 200) {
          const products = response.data;
          setStockInProducts(products);

          // Extract unique brands and units from stock-in products
          const uniqueBrands = [
            ...new Set(products.map((product) => product.brand)),
          ];
          const uniqueUnits = [
            ...new Set(products.map((product) => product.units)),
          ];

          setStockInBrands(uniqueBrands); // Update state with unique brands
          setStockInUnits(uniqueUnits); // Update state with unique units
        } else {
          console.error("Failed to fetch stock-in products");
        }
      } catch (error) {
        console.error("Error fetching stock-in products:", error);
      }
    };

    fetchStockInData();
  }, [user?.id]);




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
        const response = await axios.get(`${BASE_URL}/sites`);
        if (response.status === 200) {
          const allSites = response.data;

          // Store all sites in state
          setSites(allSites);

          // Filter only user-specific sites
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


  // Log the data to console before submitting
  console.log("Submitting the following data:", JSON.stringify(formData, null, 2));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/stock-out`,
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
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, brandName: e.target.value })
              }
              required
            >
              <option value="">Select Brand</option>
              {stockInBrands.map((brand, index) => (
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
              onChange={(e) =>
                setFormData({ ...formData, units: e.target.value })
              }
              required
            >
              <option value="">Select Unit</option>
              {stockInUnits.map((unit, index) => (
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
