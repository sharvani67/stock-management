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
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  // Sample data for the table
  const data = useMemo(
    () => [
      {
        productName: "Product A",
        quantity: 50,
        units: "pcs",
        description: "Used for maintenance",
        date: "2025-01-23",
      },
      {
        productName: "Product B",
        quantity: 100,
        units: "kg",
        description: "Consumed for manufacturing",
        date: "2025-01-22",
      },
      {
        productName: "Product C",
        quantity: 30,
        units: "liters",
        description: "Used for cleaning",
        date: "2025-01-21",
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
