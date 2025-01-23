import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable";
import AddProductModal from "./AddProduct";
import EditProduct from "./EditProduct";
import ViewProduct from "./ViewProduct"; // Import ViewProduct
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const ProductTable = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", description: "This is product 1" },
    { id: 2, name: "Product 2", description: "This is product 2" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowViewModal = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };
  const handleCloseViewModal = () => setShowViewModal(false);

  const handleAddProduct = (newProduct) => {
    setProducts([
      ...products,
      { id: products.length + 1, ...newProduct },
    ]);
    handleCloseAddModal();
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    handleCloseEditModal();
  };

  const columns = [
    { Header: "S.No", accessor: "id" },
    { Header: "Product Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-primary" size="sm" onClick={() => handleShowViewModal(row.original)}>
            <FaEye />
          </Button>
          <Button variant="outline-warning" size="sm" onClick={() => handleShowEditModal(row.original)}>
            <FaEdit />
          </Button>
          <Button variant="outline-danger" size="sm">
            <FaTrashAlt />
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
        <Button variant="primary"className='add-button'  onClick={handleShowAddModal}>
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
        show={showAddModal}
        handleClose={handleCloseAddModal}
        handleSave={handleAddProduct}
      />

      {/* Edit Product Modal */}
      <EditProduct
        show={showEditModal}
        handleClose={handleCloseEditModal}
        product={selectedProduct}
        handleSave={handleEditProduct}
      />

      {/* View Product Modal */}
      <ViewProduct
        product={selectedProduct}
        showModal={showViewModal}
        handleClose={handleCloseViewModal}
      />
    </div>
  );
};

export default ProductTable;
