import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "../../layout/DataTable";

const CentralStockTable = () => {
  const [data] = useState([
    { stockSummary: "Category 1", brandName: "Brand A", qtyIn: 100, qtyOut: 40, remaining: 60 },
    { stockSummary: "Category 2", brandName: "Brand B", qtyIn: 200, qtyOut: 70, remaining: 130 },
    { stockSummary: "Category 3", brandName: "Brand C", qtyIn: 150, qtyOut: 50, remaining: 100 },
  ]);

  const columns = [
    { Header: "Stock Summary", accessor: "stockSummary" },
    { Header: "Brand Name", accessor: "brandName" },
    { Header: "Qty In", accessor: "qtyIn" },
    { Header: "Qty Out", accessor: "qtyOut" },
    { Header: "Remaining", accessor: "remaining" },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Central Stock Summary</h1>

      {/* Table Wrapper */}
      <div className="table-wrapper">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default CentralStockTable;
