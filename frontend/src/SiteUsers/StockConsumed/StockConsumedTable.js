import React, { useState, useMemo } from "react";
import DataTable from "../../layout/DataTable";
import StockConsumedForm from "./StockConsumedForm";
import { Button } from "react-bootstrap";
import UserNavbar from "../Navbar/UserNavbar";

const StockConsumedTable = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (formData) => {
    console.log("Form Data Submitted: ", formData);
    // Process form data here
  };

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
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
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  // Sample data for the table
  const data = useMemo(
    () => [
      {
        date: "23-01-2025",
        productName: "Product A",
        brandName:"Brand A",
        quantity: 50,
        units: "pcs",
        description: "Used for maintenance",
      },
      {
        date: "22-01-2025",
        productName: "Product B",
        brandName:"Brand B",
        quantity: 100,
        units: "kg",
        description: "Consumed for manufacturing", 
      },
      {
        date: "21-01-2025",
        productName: "Product C",
        brandName:"Brand C",
        quantity: 30,
        units: "liters",
        description: "Used for cleaning",
      },
    ],
    []
  );

  return (
    <div>
      <UserNavbar />

    <div className="container mt-4">
      <h1 className="mb-4">Stock Consumed Records</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleOpen}>
            Add Stock Consumed
        </Button>
      </div>

      <StockConsumedForm
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <DataTable columns={columns} data={data} />
    </div>
    </div>
  );
};

export default StockConsumedTable;
