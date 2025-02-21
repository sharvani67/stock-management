import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../ApiService/Api";
import { AuthContext } from "../../Context/AuthContext";

const EditStockConsumedModal = ({ show, handleClose, stockConsumedData, handleUpdate }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    date: "",
    product: "",
    quantity_out: "",
    units: "",
    description: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (stockConsumedData) {
      setFormData({
        date: stockConsumedData.date || "",
        product: stockConsumedData.product || "",
        quantity_out: stockConsumedData.quantity_out || "",
        units: stockConsumedData.units || "",
        description: stockConsumedData.description || "",
      });
    }
  }, [stockConsumedData]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id) return;
      try {
        const response = await axios.get(`${BASE_URL}/fetch-all-products`, {
          params: { userId: user?.id },
        });
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [user?.id]);

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    const productData = products.find((item) => item.product === selectedProduct);
    setFormData((prevFormData) => ({
      ...prevFormData,
      product: selectedProduct,
      units: productData?.units || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/stock-consumed/${stockConsumedData.id}`, formData);

      if (response.status === 200) {
        handleUpdate({ ...stockConsumedData, ...formData }); // Update parent state
        handleClose(); // Close modal
        alert("Stock consumed record updated successfully!");
      } else {
        alert("Failed to update stock consumed record.");
      }
    } catch (error) {
      console.error("Error updating stock record:", error);
      alert("An error occurred while updating.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header className="bg-warning text-white" closeButton>
        <Modal.Title>Edit Stock Consumed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formProduct">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  as="select"
                  name="product"
                  value={formData.product}
                  onChange={handleProductChange}
                  required
                >
                  <option value="">Select Product</option>
                  {[...new Set(products.map((item) => item.product))].map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
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
                <Form.Control
                  type="text"
                  name="units"
                  value={formData.units}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="warning" type="submit" className="w-100 mt-3">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStockConsumedModal;
