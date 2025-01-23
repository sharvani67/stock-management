import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, InputGroup, FormControl } from "react-bootstrap";
import { FiPlus } from "react-icons/fi"; // Import React Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from '../Products/AddProduct'; // Import your AddProduct modal component
import Addunit from '../Units/AddUnit'; // Import your Addunit modal component
import AddSupplierModal from '../Suppliers/AddSupplier'; // Import your AddSupplierModal component
import AddBrandModal from '../Brands/AddBrand'; // Import your AddBrandModal component
import '../Purchase/AddPurchase.css';


const AddPurchaseForm = ({ onAddPurchase }) => {
  const [formData, setFormData] = useState({
    stockName: "",
    quantity: "",
    units: "",
    price: "",
    supplierName: "",
    brandName: "",
    billNumber: "",
    billDate: "",
  });

  const [showProductModal, setShowProductModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false); // State for unit modal
  const [showSupplierModal, setShowSupplierModal] = useState(false); // State for supplier modal
  const [showBrandModal, setShowBrandModal] = useState(false); // State for brand modal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPurchase(formData);
    setFormData({
      stockName: "",
      quantity: "",
      units: "",
      price: "",
      supplierName: "",
      brandName: "",
      billNumber: "",
      billDate: "",
    });
  };

  // Handle saving the brand data
  const handleSaveBrand = (brandData) => {
    setFormData((prevState) => ({
      ...prevState,
      brandName: brandData.brandName,
    }));
  };

  // Handle saving the supplier data
  const handleSaveSupplier = (supplierData) => {
    setFormData((prevState) => ({
      ...prevState,
      supplierName: supplierData.supplierName,
    }));
  };

  return (
    <Container  className="mt-5 addpurchase" >
      <Row className="justify-content-center">
        <Col md={12} lg={10}>
          <Card className="shadow-sm">
            <Card.Header>
              <h2 className="mb-0">Add New Purchase</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Stock Name:</strong></Form.Label>
                      <InputGroup>
                        <FormControl
                          type="text"
                          name="stockName"
                          value={formData.stockName}
                          onChange={handleInputChange}
                          required
                        />
                        <Button variant="outline-secondary" onClick={() => setShowProductModal(true)}>
                          <FiPlus /> {/* Trigger the product modal */}
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Quantity:</strong></Form.Label>
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Units:</strong></Form.Label>
                      <InputGroup>
                        <FormControl
                          type="text"
                          name="units"
                          value={formData.units}
                          onChange={handleInputChange}
                          required
                        />
                        <Button variant="outline-secondary" onClick={() => setShowUnitModal(true)}>
                          <FiPlus /> {/* Trigger the unit modal */}
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Price:</strong></Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Supplier Name:</strong></Form.Label>
                      <InputGroup>
                        <FormControl
                          type="text"
                          name="supplierName"
                          value={formData.supplierName}
                          onChange={handleInputChange}
                          required
                        />
                        <Button variant="outline-secondary" onClick={() => setShowSupplierModal(true)}>
                          <FiPlus /> {/* Trigger the supplier modal */}
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Brand Name:</strong></Form.Label>
                      <InputGroup>
                        <FormControl
                          type="text"
                          name="brandName"
                          value={formData.brandName}
                          onChange={handleInputChange}
                          required
                        />
                        <Button variant="outline-secondary" onClick={() => setShowBrandModal(true)}>
                          <FiPlus /> {/* Trigger the brand modal */}
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Bill Number:</strong></Form.Label>
                      <Form.Control
                        type="text"
                        name="billNumber"
                        value={formData.billNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Bill Date:</strong></Form.Label>
                      <Form.Control
                        type="date"
                        name="billDate"
                        value={formData.billDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center align-items-center">
                <Button type="submit" variant="primary" className="w-50 mt-3">
                  Add Purchase
                </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for adding product */}
      <AddProduct onAddProduct={(product) => console.log("Product added:", product)} show={showProductModal} handleClose={() => setShowProductModal(false)} title="Add Product" details={null} onSave={() => {}} />

      {/* Modal for adding unit */}
      <Addunit show={showUnitModal} handleClose={() => setShowUnitModal(false)} title="Add Unit" details={null} onSave={() => {}} />

      {/* Modal for adding supplier */}
      <AddSupplierModal show={showSupplierModal} handleClose={() => setShowSupplierModal(false)} handleSave={handleSaveSupplier} />

      {/* Modal for adding brand */}
      <AddBrandModal show={showBrandModal} handleClose={() => setShowBrandModal(false)} handleSave={handleSaveBrand} />
    </Container>
  );
};

export default AddPurchaseForm;
