import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from '../../layout/DataTable'; // Assuming you have a DataTable component
import { FaEdit, FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserNavbar from '../Navbar/UserNavbar';
// import ViewPurchase from './ViewPurchase';
// import EditPurchase from './EditPurchase';

const StockInTable = () => {
  const [purchaseData, setPurchaseData] = useState([
    { sNo: 1, productName: 'Cement', quantity: 100, units: 'Bags', price: 10, supplierName: 'Global Materials', brandName: 'Ultratech' },
    { sNo: 2, productName: 'Steel', quantity: 150, units: 'Sheets', price: 20, supplierName: 'ABC Supplies', brandName: 'TATA Steel' },
    { sNo: 3, productName: 'Tiles', quantity: 200, units: 'Boxes', price: 30, supplierName: 'XYZ Traders', brandName: 'Tiles Brand' },
    { sNo: 4, productName: 'Paints', quantity: 50, units: 'Litre', price: 40, supplierName: 'Global Materials', brandName: 'Asian' },
    { sNo: 5, productName: 'Bricks', quantity: 300, units: 'Piece ', price: 50, supplierName: 'Global Materials', brandName: 'BrickSphere' },
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
    { Header: 'Product Name', accessor: 'productName' },
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
    <div>
      <UserNavbar />
    <div className="container mt-5">
      <h1 className="mb-4">StockIn Management</h1>

      {/* Add New Purchase Button */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/stockin">
          <Button variant="primary" className='add-button'><FaPlus className="me-2" />Add New StockIn</Button>
        </Link>
      </div>

      {/* DataTable Wrapper */}
      {/* <div className="table-wrapper"> */}
        <DataTable columns={columns} data={purchaseData} />
      {/* </div> */}
      {/* {viewModal && (
          <ViewPurchase
            show={viewModal}
            handleClose={() => setViewModal(false)}
            details={selectedPurchase}
          />
        )} */}
        {/* {editModal && (
          <EditPurchase
            show={editModal}
            handleClose={() => setEditModal(false)}
            details={selectedPurchase}
            onSave={handleSave}
          />
        )} */}

    </div>
    </div>
  );
};

export default StockInTable;
