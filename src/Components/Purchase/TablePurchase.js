import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from '../../layout/DataTable'; // Assuming you have a DataTable component
import { FaEdit, FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ViewPurchase from './ViewPurchase';
import EditPurchase from './EditPurchase';

const TablePurchase = () => {
  const [purchaseData, setPurchaseData] = useState([
    { sNo: 1, stockName: 'Product A', quantity: 100, units: 'pcs', price: 10, supplierName: 'Supplier X', brandName: 'Brand Y' },
    { sNo: 2, stockName: 'Product B', quantity: 150, units: 'pcs', price: 20, supplierName: 'Supplier Y', brandName: 'Brand Z' },
    { sNo: 3, stockName: 'Product C', quantity: 200, units: 'pcs', price: 30, supplierName: 'Supplier Z', brandName: 'Brand X' },
    { sNo: 4, stockName: 'Product D', quantity: 50, units: 'pcs', price: 40, supplierName: 'Supplier W', brandName: 'Brand Y' },
    { sNo: 5, stockName: 'Product E', quantity: 300, units: 'pcs', price: 50, supplierName: 'Supplier V', brandName: 'Brand Z' },
  ]);

  const [viewModal, setViewModal] = useState(false);
const [editModal, setEditModal] = useState(false);
const [selectedPurchase, setSelectedPurchase] = useState(null);

const handleView = (item) => {
  setSelectedPurchase(item);
  setViewModal(true);
};

const handleEdit = (item) => {
  setSelectedPurchase(item);
  setEditModal(true);
};

const handleSave = (updatedData) => {
  const updatedList = purchaseData.map((item) =>
    item.sNo === updatedData.sNo ? updatedData : item
  );
  setPurchaseData(updatedList);
};

  // const handleView = (item) => {
  //   console.log('Viewing item:', item);
  // };
  

  // const handleEdit = (item) => {
  //   console.log('Editing item:', item);
  // };

  const handleDelete = (sNo) => {
    const updatedData = purchaseData.filter((item) => item.sNo !== sNo);
    setPurchaseData(updatedData);
  };

  const columns = [
    { Header: 'S.No', accessor: 'sNo' },
    { Header: 'Stock Name', accessor: 'stockName' },
    { Header: 'Quantity', accessor: 'quantity' },
    { Header: 'Units', accessor: 'units' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Supplier Name', accessor: 'supplierName' },
    { Header: 'Brand Name', accessor: 'brandName' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-info" size="sm" onClick={() => handleView(row.original)}>
            <FaEye />
          </Button>
          <Button variant="outline-warning" size="sm" onClick={() => handleEdit(row.original)}>
            <FaEdit />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(row.original.sNo)}
          >
            <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Purchase Management</h1>

      {/* Add New Purchase Button */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-purchase">
          <Button variant="primary"><FaPlus className="me-2" />Add New Purchase</Button>
        </Link>
      </div>

      {/* DataTable Wrapper */}
      {/* <div className="table-wrapper"> */}
        <DataTable columns={columns} data={purchaseData} />
      {/* </div> */}
      {viewModal && (
          <ViewPurchase
            show={viewModal}
            handleClose={() => setViewModal(false)}
            details={selectedPurchase}
          />
        )}
        {editModal && (
          <EditPurchase
            show={editModal}
            handleClose={() => setEditModal(false)}
            details={selectedPurchase}
            onSave={handleSave}
          />
        )}

    </div>
  );
};

export default TablePurchase;
