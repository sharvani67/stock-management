import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable";
import AddProduct from "./AddProduct"; // Assuming you have the AddProduct modal component

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
            <i className="fas fa-eye"></i>
          </Button>
          <Button variant="outline-warning" size="sm">
            <i className="fas fa-edit"></i>
          </Button>
          <Button variant="outline-danger" size="sm">
            <i className="fas fa-trash-alt"></i>
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
      <AddProduct
        showModal={showModal}
        handleClose={handleCloseModal}
        onAddProduct={handleAddProduct}
      />
      </div>

      {/* Table Wrapper */}
      <div className="table-wrapper">
        <DataTable columns={columns} data={products} />
      </div>

      {/* Add Product Modal */}
      
    </div>
  );
};

export default ProductTable;
