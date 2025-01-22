import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable";
import AddProductModal from "./AddProduct";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa"; // Assuming you renamed the AddProduct component to AddProductModal

const ProductTable = () => {
  // Product data
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", description: "This is product 1" },
    { id: 2, name: "Product 2", description: "This is product 2" },
  ]);

  // State to manage the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to show the modal
  const handleShowModal = () => setShowModal(true);

  // Function to close the modal
  const handleCloseModal = () => setShowModal(false);

  // Add new product
  const handleAddProduct = (newProduct) => {
    setProducts([
      ...products,
      { id: products.length + 1, ...newProduct },
    ]);
    handleCloseModal(); // Close the modal after adding the product
  };

  // Columns for the DataTable
  const columns = [
    { Header: "S.No", accessor: "id" },
    { Header: "Product Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-primary" size="sm">
            <FaEye/>
          </Button>
          <Button variant="outline-warning" size="sm">
            <FaEdit/>
          </Button>
          <Button variant="outline-danger" size="sm">
            <FaTrashAlt/>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product Management</h1>

      {/* Add New Product Button */}
       <div className="d-flex justify-content-end mb-3">
              <Button variant="primary" onClick={() => handleShowModal("Add New")}>
                <FaPlus className="me-2" />
                Add New Product
              </Button>
            </div>

      {/* Table Wrapper */}
      <div className="table-wrapper">
        <DataTable columns={columns} data={products} />
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleAddProduct}
      />
    </div>
  );
};

export default ProductTable;
