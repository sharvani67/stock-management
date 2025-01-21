import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import DataTable from "../../layout/DataTable";
import AddBrand from "./AddBrand";

const Brand = () => {
  // Sample brand data
  const [brands, setBrands] = useState([
    { id: 1, brandName: "Brand 1", description: "This is brand 1" },
    { id: 2, brandName: "Brand 2", description: "This is brand 2" },
  ]);

  // State to manage showing/hiding the modal
  const [showModal, setShowModal] = useState(false);
  
  // Functions to handle modal visibility
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Add new brand
  const handleAddBrand = (newBrand) => {
    setBrands([...brands, { id: brands.length + 1, ...newBrand }]);
    handleCloseModal(); // Close the modal after adding a brand
  };

  // Handle view/edit/delete actions for each brand
  const handleView = (brand) => {
    console.log("Viewing brand:", brand);
  };

  const handleEdit = (brand) => {
    console.log("Editing brand:", brand);
  };

  const handleDelete = (id) => {
    const updatedBrands = brands.filter((brand) => brand.id !== id);
    setBrands(updatedBrands);
  };

  // Define columns for the DataTable
  const columns = [
    { Header: "S.No", accessor: (row, i) => i + 1, disableSortBy: true },
    { Header: "Brand Name", accessor: "brandName" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-info"
            size="sm"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <FaEye />
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            title="Edit"
            onClick={() => handleEdit(row.original)}
          >
            <FaEdit />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            title="Delete"
            onClick={() => handleDelete(row.original.id)}
          >
            <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Brand Management</h1>

      {/* Button to Add New Brand */}
      <div className="d-flex justify-content-end mb-3">
      <AddBrand
        showModal={showModal}
        handleClose={handleCloseModal}
        onAddBrand={handleAddBrand}
      />
      
      </div>

      {/* DataTable with Brands */}
      <div className="table-wrapper">
        <DataTable columns={columns} data={brands} />
      </div>

      
    </div>
  );
};

export default Brand;
