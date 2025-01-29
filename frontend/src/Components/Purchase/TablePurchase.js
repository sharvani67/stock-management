import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from '../../layout/DataTable';
import { FaEdit, FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ViewPurchase from './ViewPurchase';
import EditPurchase from './EditPurchase';
import Sidebar from '../../Shared/SideBar/SideBar';
import { BASE_URL } from '../../ApiService/Api';

const TablePurchase = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [purchaseData, setPurchaseData] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  useEffect(() => {
    // Fetch purchase data
    fetch(`${BASE_URL}/api/purchases`)
      .then((response) => response.json())
      .then((data) => setPurchaseData(data))
      .catch((error) => console.error('Error fetching purchases:', error));
  }, []);

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

  const handleDelete = (sNo) => {
    const updatedData = purchaseData.filter((item) => item.sNo !== sNo);
    setPurchaseData(updatedData);
  };

  const columns = [
    { Header: 'S.No', accessor: 'sNo' },
    { Header: 'Stock Name', accessor: 'productName' },
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
    <div className="admintablelayoutContainer">
    <Sidebar onToggleSidebar={setCollapsed} />
    <div className={`admintablelayout ${collapsed ? "collapsed" : ""}`}>
    <div className="container mt-5">
      <h1 className="mb-4">Purchase Management</h1>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-purchase">
          <Button variant="primary" className="add-button">
            <FaPlus className="me-2" />Add New Purchase
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={purchaseData} />
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
    </div>
    </div>
  );
};

export default TablePurchase;
