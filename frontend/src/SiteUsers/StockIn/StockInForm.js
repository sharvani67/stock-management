import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col, Card, InputGroup } from "react-bootstrap";
import { FiPlus } from "react-icons/fi"; // Import React Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from '../../Components/Products/AddProduct'; // Import your AddProduct modal component
import Addunit from '../../Components/Units/AddUnit'; // Import your Addunit modal component
import AddSupplierModal from '../../Components/Suppliers/AddSupplier'; // Import your AddSupplierModal component

import UserNavbar from "../Navbar/UserNavbar";
// import '../Purchase/AddPurchase.css';
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Api";
import { useNavigate } from "react-router-dom";
import AddUnit from "../../Components/Units/AddUnit";



const StockInForm = ({ onAddPurchase }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dateTime: "",
    productName: "",
    quantity: "",
    units: "",
    price: "",
    supplierName: "",
    description:"",
    billNumber: "",
    totalPrice: "",
    userId: "",      // user id added here
    siteManager: "", // site manager added here
    siteCode: "",    // site code added here
    siteName: "",    // site name added here
    siteId: ""       // site id added here
  });

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false); // State for unit modal
  const [showSupplierModal, setShowSupplierModal] = useState(false); // State for supplier modal


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

  const [sites, setSites] = useState([]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites?userId=${user?.id}`);
        if (response.ok) {
          const data = await response.json();

          // Filter the sites based on the userId (assuming that userId is associated with specific sites)
          const userSites = data.filter(site => site.userId === user?.id);

          // If matching sites are found, use the details of the first one
          if (userSites.length > 0) {
            const selectedSite = userSites[0]; // Get the site details related to the user

            setFormData((prevFormData) => ({
              ...prevFormData,
              userId: user?.id,
              siteManager: selectedSite.siteManager,
              siteCode: selectedSite.siteCode,
              siteName: selectedSite.siteName,
              siteId: selectedSite.id,
            }));
            setSites(userSites);  // Save all the sites related to the user
          } else {
            console.error("No sites found for the user");
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

    setFormData((prevState) => {
      const updatedData = {
        ...prevState,
        [name]: value,
      };

      // Convert price and quantity to numbers
      const price = parseFloat(updatedData.price) || 0;
      const quantity = parseFloat(updatedData.quantity) || 0;

      // Calculate total price when both fields have valid values
      if (name === "price" || name === "quantity") {
        updatedData.totalPrice = price * quantity;
      }

      return updatedData;
    });
  };





  // Handle saving the supplier data
  const handleSaveSupplier = (supplierData) => {
    setFormData((prevState) => ({
      ...prevState,
      supplierName: supplierData.supplierName,
    }));
  };

  const handleSaveProduct = (productData) => {
    setProducts((prevProducts) => [...prevProducts, productData]);
    setFormData((prevState) => ({
      ...prevState,
      productName: productData.productName,
    }));
    setShowProductModal(false); // Close the modal
  };

  const handleSaveUnit = (unitData) => {
    setUnits((prevUnits) => [...prevUnits, unitData]);
    setFormData((prevState) => ({
      ...prevState,
      name: unitData.name, // Update form state with new unit
    }));
    setShowUnitModal(false); // Close the modal
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/stock-in`,
        formData
      );
      alert(response.data.message);
      navigate("/stockintable");
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock.");
    }
  };

  return (
    <div>
      <UserNavbar />
      <Container className="mt-5 addpurchase">
        <Row className="justify-content-center">
          <Col md={12} lg={10}>
            <Card className="shadow-sm">
              <Card.Header>
                <h2 className="mb-0 text-white">Purchase(Stock-In)</h2>
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
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-center align-items-center">
                    <Button type="submit" variant="primary" className="w-50 mt-3">
                      Save
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal for adding product */}
        <AddProduct
          show={showProductModal}
          handleClose={() => setShowProductModal(false)}
          handleSave={handleSaveProduct}
        />

        {/* Modal for adding unit */}
        <AddUnit
          show={showUnitModal}
          handleClose={() => setShowUnitModal(false)}
          handleSave={handleSaveUnit}
        />


        {/* Modal for adding supplier */}
        <AddSupplierModal
          show={showSupplierModal}
          handleClose={() => setShowSupplierModal(false)}
          handleSave={handleSaveSupplier} />


      </Container>
    </div>
  );
};

export default StockInForm;
