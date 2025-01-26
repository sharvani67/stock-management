import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import DataTable from "../../layout/DataTable";
import AddBrandModal from "./AddBrand"; // Assuming AddBrandModal is the modal component
import ViewBrand from "./ViewBrand"; // Import ViewBrand
import EditBrand from "./EditBrand"; // Import EditBrand

const Brand = () => {
  // State to manage brands data
  const [brands, setBrands] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Fetch brands from backend when the component mounts
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/brands");
        const data = await response.json();
        setBrands(data); // Set brands data from the API response
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands(); // Fetch brands when the component mounts
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Functions to handle modal visibility
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseViewModal = () => setShowViewModal(false);
  const handleShowViewModal = (brand) => {
    setSelectedBrand(brand);
    setShowViewModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (brand) => {
    setSelectedBrand(brand);
    setShowEditModal(true);
  };

  // Add new brand
  const handleAddBrand = (newBrand) => {
    setBrands([...brands, { id: brands.length + 1, ...newBrand }]);
    handleCloseAddModal(); // Close the modal after adding a brand
  };

  // Edit brand
  const handleEditBrand = (updatedBrand) => {
    setBrands(brands.map((brand) =>
      brand.id === updatedBrand.id ? updatedBrand : brand
    ));
    handleCloseEditModal(); // Close the modal after saving changes
  };

  // Handle delete action for a brand
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
            onClick={() => handleShowViewModal(row.original)}
          >
            <FaEye />
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            title="Edit"
            onClick={() => handleShowEditModal(row.original)}
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
        <Button variant="primary" className='add-button' onClick={handleShowAddModal}>
          <FaPlus /> Add New Brand
        </Button>
      </div>

      {/* DataTable with Brands */}
      <div className="table-wrapper">
        <DataTable columns={columns} data={brands} />
      </div>

      {/* Add Brand Modal */}
      <AddBrandModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
        handleSave={handleAddBrand}
      />

      {/* View Brand Modal */}
      <ViewBrand
        brand={selectedBrand}
        showModal={showViewModal}
        handleClose={handleCloseViewModal}
      />

      {/* Edit Brand Modal */}
      <EditBrand
        brand={selectedBrand}
        showModal={showEditModal}
        handleClose={handleCloseEditModal}
        handleSave={handleEditBrand}
      />
    </div>
  );
};

export default Brand;
