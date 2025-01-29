import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import DataTable from '../../layout/DataTable'; // Assuming you have a DataTable component
import { FaEdit, FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserNavbar from '../Navbar/UserNavbar';
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from '../../ApiService/Api';

const StockInTable = () => {
  const { user } = useContext(AuthContext);
  const [purchaseData, setPurchaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stock-in data from API
  useEffect(() => {
    const fetchStockInRecords = async () => {
      if (!user?.id) return; // Ensure user ID is available

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/stock-in`, {
          params: { userid: user.id }, // Pass user ID as query param
        });

        setPurchaseData(response.data); // Update state with API data
      } catch (err) {
        console.error("Error fetching stock-in records:", err);
        setError("Failed to fetch stock-in data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockInRecords();
  }, [user]); // Re-run when user changes

  // Delete a stock-in entry
  const handleDelete = async (sNo) => {
    const updatedData = purchaseData.filter((item) => item.sNo !== sNo);
    setPurchaseData(updatedData);
  };

  const columns = [
    // { Header: 'S.No', accessor: 'sNo' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Product Name', accessor: 'product' },
    { Header: 'Brand Name', accessor: 'brand' },
    { Header: 'Quantity', accessor: 'quantity_in' },
    { Header: 'Units', accessor: 'units' },
    // { Header: 'Price', accessor: 'price' },
    { Header: 'Supplier Name', accessor: 'supplier' },
  
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-info" size="sm">
            <FaEye />
          </Button>
          <Button variant="outline-warning" size="sm">
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

        {/* Show loading or error message */}
        {loading && <p>Loading data...</p>}
        {error && <p className="text-danger">{error}</p>}

        {/* Add New Purchase Button */}
        <div className="d-flex justify-content-end mb-3">
          <Link to="/stockin">
            <Button variant="primary" className="add-button">
              <FaPlus className="me-2" /> Add New StockIn
            </Button>
          </Link>
        </div>

        {/* DataTable */}
        <DataTable columns={columns} data={purchaseData} />
      </div>
    </div>
  );
};

export default StockInTable;
