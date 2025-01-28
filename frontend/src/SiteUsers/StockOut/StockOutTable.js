import React, { useState,useContext } from "react"; // Import useState
import DataTable from "../../layout/DataTable"; // Assuming DataTable is in the layout directory
import StockOutModal from "./StockOutForm"; // Import the modal
import { Button } from "react-bootstrap";
import UserNavbar from "../Navbar/UserNavbar";
import { AuthContext } from "../../Context/AuthContext";

const StockOutTable = () => {
  const { user, logout } = useContext(AuthContext);
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
        Header: "Brand Name",
        accessor: "brandName",
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
        date: "23-01-2025",
        siteName: "Site A",
        destinationSite: "Site B",
        productName: "Product X",
        brandName:"brand 1",
        quantity: 100,
        units: "pcs",
        status: "Completed",
      },
      {
        date: "22-01-2025",
        siteName: "Site C",
        destinationSite: "Site D",
        productName: "Product Y",
        brandName:"brand 2 ",
        quantity: 200,
        units: "kg",
        status: "Pending",
      },
      {
        date: "21-01-2025",
        siteName: "Site E",
        destinationSite: "Site F",
        productName: "Product Z",
        brandName:"brand 3",
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
    <div>
      <UserNavbar />
    
    <div className="container mt-4">
      <h1 className="mb-4">Stock Out Records</h1>
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
    </div>
  );
};

export default StockOutTable;
