import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BASE_URL } from '../../ApiService/Api';

const EditStockIn = ({ show, handleClose, stockData, handleUpdate,}) => {
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
        // Fetch products from the API
        const fetchProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/products`);
            if (response.ok) {
            const data = await response.json();
            setProducts(data); // Update the products state
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
        // Fetch suppliers from the API
        const fetchSuppliers = async () => {
          try {
            const response = await fetch(`${BASE_URL}/api/suppliers`);
            if (response.ok) {
              const data = await response.json();
              setSuppliers(data); // Update the suppliers state
            } else {
              console.error("Failed to fetch suppliers");
            }
          } catch (error) {
            console.error("Error fetching suppliers:", error);
          }
        };
    
        fetchSuppliers();
      }, []);
    
    
      useEffect(() => {
        // Fetch units from the API
        const fetchUnits = async () => {
          try {
            const response = await fetch(`${BASE_URL}/units`);
            if (response.ok) {
              const data = await response.json();
              setUnits(data); // Update the units state
            } else {
              console.error("Failed to fetch units");
            }
          } catch (error) {
            console.error("Error fetching units:", error);
          }
        };
    
        fetchUnits();
      }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedStockData = {
        billNumber: formData.billNumber,
        productName: formData.productName,
        supplierName: formData.supplierName,
        unitName: formData.unitName,
        price: formData.price,
        quantity: formData.quantity,
        total_price: formData.total_price,
        description: formData.description,
    };

    try {
        const response = await fetch(`${BASE_URL}/update-stock-in/${stockData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
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
          <Form.Group className="mb-3">
            <Form.Label>Date & Time:</Form.Label>
            <Form.Control type="datetime-local" name="dateTime" value={formData.dateTime} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bill Number:</Form.Label>
            <Form.Control type="text" name="billNumber" value={formData.billNumber} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Name:</Form.Label>
            <Form.Select name="productName" value={formData.productName} onChange={handleInputChange} required>
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.productName}>
                {product.productName}
              </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Supplier Name:</Form.Label>
            <Form.Select name="supplierName" value={formData.supplierName} onChange={handleInputChange} required>
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.supplierName}>
                {supplier.supplierName}
              </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Unit Name:</Form.Label>
            <Form.Select name="unitName" value={formData.unitName} onChange={handleInputChange} required>
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.name}>
                {unit.name}
              </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price:</Form.Label>
            <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Price:</Form.Label>
            <Form.Control type="number" name="total_price" value={formData.total_price} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} />
          </Form.Group>

          

          <div className="d-flex justify-content-center">
            <Button type="submit" variant="primary" className="w-50">Update</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStockIn;
