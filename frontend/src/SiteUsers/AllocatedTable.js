import React, { useMemo } from "react";
import DataTable from "../layout/DataTable";
import UserNavbar from "./Navbar/UserNavbar";


const AllocatedStock = () => {
  // Define columns for the table
  const columns = useMemo(
    () => [
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
        Header: "From Site",
        accessor: "fromSite",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ value }) => (
          <select
            defaultValue={value}
            className="form-select"
            style={{ width: "150px" }}
          >
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        ),
      },
    ],
    []
  );

  // Sample data for the table
  const data = useMemo(
    () => [
      {
        productName: "Product A",
        brandName: "Brand X",
        quantity: 1000,
        units: "kg",
        fromSite: "Site A",
        actions: "Approved",
      },
      {
        productName: "Product B",
        brandName: "Brand Y",
        quantity: 500,
        units: "liters",
        fromSite: "Site B",
        actions: "Rejected",
      },
      {
        productName: "Product C",
        brandName: "Brand Z",
        quantity: 1200,
        units: "kg",
        fromSite: "Site C",
        actions: "Approved",
      },
    ],
    []
  );

  return (
    <div>
      <UserNavbar />
      <div className="container mt-4">
        <h1 className="mb-4">Allocated Stock</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AllocatedStock;
