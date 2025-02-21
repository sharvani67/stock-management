import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { BASE_URL } from '../../ApiService/Api';

const EditStockIn = ({ show, handleClose, stockData, handleUpdate }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    dateTime: '',
    billNumber: '',
    productName: '',
    supplierName: '',
    unitName: '',
    price: '',
    quantity: '',
    total_price: '',
    description: '',
  });

  useEffect(() => {
    if (stockData) {
      setFormData({
        dateTime: stockData.date || '',
        billNumber: stockData.invoice_no || '',
        productName: stockData.product || '',
        supplierName: stockData.supplier || '',
        unitName: stockData.units || '',
        price: stockData.price || '',
        quantity: stockData.quantity_in || '',
        total_price: stockData.total_price || '',
        description: stockData.description || '',
      });
    }
  }, [stockData]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/suppliers`);
        if (response.ok) {
          const data = await response.json();
          setSuppliers(data);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch(`${BASE_URL}/units`);
        if (response.ok) {
          const data = await response.json();
          setUnits(data);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };
    fetchUnits();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      
      // Automatically update total price if price or quantity is changed
      if (name === "price" || name === "quantity") {
        const price = parseFloat(updatedData.price) || 0; // Default to 0 if not a valid number
        const quantity = parseFloat(updatedData.quantity) || 0; // Default to 0 if not a valid number
        updatedData.total_price = price * quantity; // Update total_price
      }
      
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStockData = { ...formData };
    try {
      const response = await fetch(`${BASE_URL}/update-stock-in/${stockData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStockData),
      });
      const result = await response.json();
      if (result.success) {
        alert('Stock-In updated successfully');
        handleUpdate(result);
        handleClose();
      } else {
        alert('Failed to update stock-in');
      }
    } catch (error) {
      console.error('Error updating stock-in:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Stock-In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="dateTime" value={formData.dateTime} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Bill Number</Form.Label>
                <Form.Control type="text" name="billNumber" value={formData.billNumber} onChange={handleInputChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Select name="productName" value={formData.productName} onChange={handleInputChange} required>
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.productName}>{product.productName}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Supplier Name</Form.Label>
                <Form.Select name="supplierName" value={formData.supplierName} onChange={handleInputChange} required>
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.supplierName}>{supplier.supplierName}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Unit Name</Form.Label>
                <Form.Select name="unitName" value={formData.unitName} onChange={handleInputChange} required>
                  <option value="">Select Unit</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.name}>{unit.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Total Price</Form.Label>
                <Form.Control type="number" name="total_price" value={formData.total_price} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} />
          </Form.Group>
          <div className="text-center">
            <Button type="submit" variant="primary">Update</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStockIn;
