import React, { useState } from "react"; // Import useState
import DataTable from "../../layout/DataTable"; // Assuming DataTable is in the layout directory
import StockOutModal from "./StockOutForm"; // Import the modal
import { Button } from "react-bootstrap";

const StockOutTable = () => {
  // State for controlling the modal visibility
  const [showModal, setShowModal] = useState(false);

  // Handlers for modal open and close
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handler for form submission
  const handleSubmit = (formData) => {
    console.log("Form Data Submitted: ", formData);
    // Process form data here
    handleClose(); // Close the modal after submission
  };

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date", // Corresponds to a key in the data
      },
      
      {
        Header: "Destination Site",
        accessor: "destinationSite",
      },
      {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Units",
        accessor: "units",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  // Sample data for the table
  const data = React.useMemo(
    () => [
      {
        date: "2025-01-23",
        siteName: "Site A",
        destinationSite: "Site B",
        productName: "Product X",
        quantity: 100,
        units: "pcs",
        status: "Completed",
      },
      {
        date: "2025-01-22",
        siteName: "Site C",
        destinationSite: "Site D",
        productName: "Product Y",
        quantity: 200,
        units: "kg",
        status: "Pending",
      },
      {
        date: "2025-01-21",
        siteName: "Site E",
        destinationSite: "Site F",
        productName: "Product Z",
        quantity: 150,
        units: "pcs",
        status: "Cancelled",
      },
    ],
    []
  );

  // Initial global search value (optional)
  const initialSearchValue = "";

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Stock Out Records</h2>
      {/* Button to open the modal */}
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleOpen}>
             Stock Out Form
        </Button>
      </div>

      {/* StockOutModal component */}
      <StockOutModal
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />

      {/* DataTable component */}
      <DataTable
        columns={columns}
        data={data}
        initialSearchValue={initialSearchValue}
      />
    </div>
  );
};

export default StockOutTable;
