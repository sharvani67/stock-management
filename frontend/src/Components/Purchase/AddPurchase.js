import React, { useState,useEffect} from "react";
import { Form, Button, Container, Row, Col, Card, InputGroup, FormControl } from "react-bootstrap";
import { FiPlus } from "react-icons/fi"; // Import React Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from '../Products/AddProduct'; // Import your AddProduct modal component
import Addunit from '../Units/AddUnit'; // Import your Addunit modal component
import AddSupplierModal from '../Suppliers/AddSupplier'; // Import your AddSupplierModal component
import AddBrandModal from '../Brands/AddBrand'; // Import your AddBrandModal component
import '../Purchase/AddPurchase.css';
import Sidebar from "../../Shared/SideBar/SideBar";


const AddPurchaseForm = ({ onAddPurchase }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    units: "",
    price: "",
    supplierName: "",
    brandName: "",
    billNumber: "",
    billDate: "",
  });
  const [brands, setBrands] = useState([]); // State for brands
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false); // State for unit modal
  const [showSupplierModal, setShowSupplierModal] = useState(false); // State for supplier modal
  const [showBrandModal, setShowBrandModal] = useState(false); // State for brand modal

  useEffect(() => {
    // Fetch brands from the API
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/brands");
        if (response.ok) {
          const data = await response.json();
          setBrands(data); // Update the brands state
        } else {
          console.error("Failed to fetch brands");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Success alert
        setFormData({
          productName: "",
          quantity: "",
          units: "",
          price: "",
          supplierName: "",
          brandName: "",
          billNumber: "",
          billDate: "",
        });
      } else {
        const errorResult = await response.json();
        alert(errorResult.message || "Failed to add purchase.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
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
    <div className="salesViewLeadsContainer">
    <Sidebar onToggleSidebar={setCollapsed} />
    <div className={`salesViewLeads ${collapsed ? "collapsed" : ""}`}>
    <Container  className="mt-5 addpurchase" >
      <Row className="justify-content-center">
        <Col md={12} lg={10}>
          <Card className="shadow-sm">
            <Card.Header>
              <h2 className="mb-0 text-white">Add New Purchase</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><strong>Product Name:</strong></Form.Label>
                      <InputGroup>
                        <FormControl
                          type="text"
                          name="productName"
                          value={formData.productName}
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
                        <Form.Select
                          name="brandName"
                          value={formData.brandName}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a brand</option>
                          {brands.map((brand) => (
                            <option key={brand.id} value={brand.brandName}>
                              {brand.brandName}
                            </option>
                          ))}
                        
                        </Form.Select>
                        <Button variant="outline-secondary" onClick={() => setShowBrandModal(true)}>
                          <FiPlus /> {/* Trigger the supplier modal */}
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
                <Button type="submit" variant="primary"  className="w-50 mt-3">
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
    </div>
    </div>
  );
};

export default AddPurchaseForm;
