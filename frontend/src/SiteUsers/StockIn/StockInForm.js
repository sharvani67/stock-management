import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, InputGroup } from "react-bootstrap";
import { FiPlus } from "react-icons/fi"; // Import React Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from '../../Components/Products/AddProduct'; // Import your AddProduct modal component
import Addunit from '../../Components/Units/AddUnit'; // Import your Addunit modal component
import AddSupplierModal from '../../Components/Suppliers/AddSupplier'; // Import your AddSupplierModal component
import AddBrandModal from '../../Components/Brands/AddBrand'; // Import your AddBrandModal component
import UserNavbar from "../Navbar/UserNavbar";
// import '../Purchase/AddPurchase.css';
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";


const StockInForm = ({ onAddPurchase }) => {
  const [formData, setFormData] = useState({
    dateTime: "",
    productName: "",
    quantity: "",
    units: "",
    price: "",
    supplierName: "",
    brandName: "",
    billNumber: "",
    totalPrice: "",
  });
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);// State for brands
  const [units, setUnits] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false); // State for unit modal
  const [showSupplierModal, setShowSupplierModal] = useState(false); // State for supplier modal
  const [showBrandModal, setShowBrandModal] = useState(false); // State for brand modal

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


  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
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
        const response = await fetch("http://localhost:5000/api/suppliers");
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
        const response = await fetch("http://localhost:5000/units");
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/stock-in",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock.");
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
    <div>
      <UserNavbar />
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
                      <Form.Group controlId="formDateTime">
                        <Form.Label>Date & Time:</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          name="dateTime"
                          value={formData.dateTime}
                          onChange={(e) =>
                            setFormData({ ...formData, dateTime: e.target.value })
                          }
                          required readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
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
                            <option value="">Select a product</option>
                            {products.map((product) => (
                              <option key={product.id} value={product.productName}>
                                {product.productName}
                              </option>
                            ))}

                          </Form.Select>
                          <Button variant="outline-secondary" onClick={() => setShowProductModal(true)}>
                            <FiPlus /> {/* Trigger the supplier modal */}
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
                            <option value="">Select a supplier</option>
                            {suppliers.map((supplier) => (
                              <option key={supplier.id} value={supplier.supplierName}>
                                {supplier.supplierName}
                              </option>
                            ))}

                          </Form.Select>
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
                        <Form.Label><strong>Unit Name:</strong></Form.Label>
                        <InputGroup>
                          <Form.Select
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select a Unit</option>
                            {units.map((unit) => (
                              <option key={unit.id} value={unit.name}>
                                {unit.name}
                              </option>
                            ))}

                          </Form.Select>
                          <Button variant="outline-secondary" onClick={() => setShowUnitModal(true)}>
                            <FiPlus /> {/* Trigger the supplier modal */}
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
        <AddProduct onAddProduct={(product) => console.log("Product added:", product)} show={showProductModal} handleClose={() => setShowProductModal(false)} title="Add Product" details={null} onSave={() => { }} />

        {/* Modal for adding unit */}
        <Addunit show={showUnitModal} handleClose={() => setShowUnitModal(false)} title="Add Unit" details={null} onSave={() => { }} />

        {/* Modal for adding supplier */}
        <AddSupplierModal show={showSupplierModal} handleClose={() => setShowSupplierModal(false)} handleSave={handleSaveSupplier} />

        {/* Modal for adding brand */}
        <AddBrandModal show={showBrandModal} handleClose={() => setShowBrandModal(false)} handleSave={handleSaveBrand} />
      </Container>
    </div>
  );
};

export default StockInForm;
