import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, InputGroup, FormControl } from "react-bootstrap";
import { FiPlus } from "react-icons/fi"; // Import React Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from '../../Components/Products/AddProduct'; // Import your AddProduct modal component
import Addunit from '../../Components/Units/AddUnit'; // Import your Addunit modal component
import AddSupplierModal from '../../Components/Suppliers/AddSupplier'; // Import your AddSupplierModal component
import AddBrandModal from '../../Components/Brands/AddBrand'; // Import your AddBrandModal component
// import '../Purchase/AddPurchase.css';


const StockInForm = ({ onAddPurchase }) => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    units: "",
    price: "",
    supplierName: "",
    brandName: "",
    billNumber: "",
    totalPrice: "",
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
      productName: "",
      quantity: "",
      units: "",
      price: "",
      supplierName: "",
      brandName: "",
      billNumber: "",
      totalPrice: "",
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
    <Container className="mt-5 addpurchase">
      <Row className="justify-content-center">
        <Col md={12} lg={10}>
          <Card className="shadow-sm">
            <Card.Header>
              <h2 className="mb-0 text-white">StockIn Form</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Product Name:</strong></Form.Label>
                      <InputGroup>
                        <Form.Select
                          name="productName"
                          value={formData.productName}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Product</option>
                          <option value="Cement">Cement</option>
                          <option value="Steel">Steel</option>
                          <option value="Tiles">Tiles</option>
                          <option value="Paint">Paint</option>
                        </Form.Select>
                        <Button variant="outline-secondary" onClick={() => setShowProductModal(true)}>
                          <FiPlus />
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
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
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Supplier Name:</strong></Form.Label>
                      <InputGroup>
                        <Form.Select
                          name="supplierName"
                          value={formData.supplierName}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Supplier</option>
                          <option value="ABC Supplies">ABC Supplies</option>
                          <option value="XYZ Traders">XYZ Traders</option>
                          <option value="Global Materials">Global Materials</option>
                        </Form.Select>
                        <Button variant="outline-secondary" onClick={() => setShowSupplierModal(true)}>
                          <FiPlus />
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Brand Name:</strong></Form.Label>
                      <InputGroup>
                        <Form.Select
                          name="brandName"
                          value={formData.brandName}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Brand</option>
                          <option value="UltraTech">UltraTech</option>
                          <option value="Tata Steel">Tata Steel</option>
                          <option value="Asian Paints">Asian Paints</option>
                        </Form.Select>
                        <Button variant="outline-secondary" onClick={() => setShowBrandModal(true)}>
                          <FiPlus />
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Units:</strong></Form.Label>
                      <InputGroup>
                        <Form.Select
                          name="units"
                          value={formData.units}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Unit</option>
                          <option value="kg">Kilograms</option>
                          <option value="MT">Metric Tons</option>
                          <option value="sqm">Square Meters</option>
                          <option value="liters">Liters</option>
                        </Form.Select>
                        <Button variant="outline-secondary" onClick={() => setShowUnitModal(true)}>
                          <FiPlus />
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
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Total Price:</strong></Form.Label>
                      <Form.Control
                        type="number"
                        name="totalPrice"
                        value={formData.totalPrice}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center align-items-center">
                  <Button type="submit" variant="primary" className="w-50 mt-3">
                    Submit
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

export default StockInForm;
