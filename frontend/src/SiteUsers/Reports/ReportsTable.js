import React, { useMemo } from "react";
import DataTable from "../../layout/DataTable";
import UserNavbar from "../Navbar/UserNavbar";

const StockSummaryTable = () => {
  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: "Stock In",
        accessor: "stockIn",
      },
      {
        Header: "Stock Out",
        accessor: "stockOut",
      },
      {
        Header: "Consumed",
        accessor: "consumed",
      },
      {
        Header: "Remaining Stock",
        accessor: "remainingStock",
      },
    ],
    []
  );

  // Sample data for the table
  const data = useMemo(
    () => [
      {
        productName: "Product A",
        stockIn: 1000,
        stockOut: 200,
        consumed: 100,
        remainingStock: 700,
      },
      {
        productName: "Product B",
        stockIn: 500,
        stockOut: 150,
        consumed: 50,
        remainingStock: 300,
      },
      {
        productName: "Product C",
        stockIn: 1200,
        stockOut: 500,
        consumed: 300,
        remainingStock: 400,
      },
    ],
    []
  );

  return (
    <div>
      <UserNavbar />
    
    <div className="container mt-4">
      <h1 className="mb-4">Stock Summary</h1>
      <DataTable columns={columns} data={data} />
    </div>
    </div>
  );
};

export default StockSummaryTable;
