import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from '../../layout/DataTable';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import AddUnit from './AddUnit';
import ViewUnit from './ViewUnit';
import EditUnit from './EditUnit';
import axios from 'axios';
import Sidebar from '../../Shared/SideBar/SideBar';

const UnitTable = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const [data, setData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/units'); // Replace with your API endpoint
      setData(response.data); // Populate table with data from the API
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching units.');
      setLoading(false);
    }
  };

  const handleViewUnit = (unit) => {
    setSelectedUnit(unit); // Set the selected unit for viewing
    setViewModalShow(true); // Show the modal
  };

  const handleEditUnit = (unit) => {
    setSelectedUnit(unit); // Set the unit to edit
    setEditModalShow(true); // Show the edit modal
  };

  const handleAddUnit = () => {
    setAddModalShow(true); // Show the add unit modal
  };

  const handleSaveUnit = (unitData) => {
    if (selectedUnit) {
      // Update the selected unit
      setData((prev) =>
        prev.map((unit) => (unit.serialNo === selectedUnit.serialNo ? { ...unit, ...unitData } : unit))
      );
    } else {
      // Add a new unit
      const newSerialNo = Math.max(...data.map((unit) => unit.serialNo)) + 1;
      setData((prev) => [...prev, { serialNo: newSerialNo, ...unitData }]);
    }
    setSelectedUnit(null);
  };

  const handleDeleteUnit = (unitToDelete) => {
    setData((prev) => prev.filter((unit) => unit.serialNo !== unitToDelete.serialNo));
  };

  const columns = [
    { Header: 'Serial No', accessor: 'serialNo' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Short Name', accessor: 'shortName' },
    { Header: 'Base Unit', accessor: 'baseUnit' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-info" size="sm" onClick={() => handleViewUnit(row.original)}>
            <FaEye />
          </Button>
          <Button variant="outline-warning" size="sm" onClick={() => handleEditUnit(row.original)}>
            <FaEdit />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDeleteUnit(row.original)}>
            <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admintablelayoutContainer">
    <Sidebar onToggleSidebar={setCollapsed} />
    <div className={`admintablelayout ${collapsed ? "collapsed" : ""}`}>
    <div className="container mt-5">
      <h1 className="mb-4">Unit Management</h1>

      {/* Add New Unit Button */}
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" className="add-button" onClick={handleAddUnit}>
          <FaPlus className="me-2" />
          Add New Unit
        </Button>
      </div>

      {/* Table Wrapper */}
      <div className="table-wrapper">
        <DataTable columns={columns} data={data} />
      </div>

      {/* Modal Popups */}
      <AddUnit
        show={addModalShow}
        handleClose={() => setAddModalShow(false)}
        handleSave={handleSaveUnit}
      />

      {/* Passing selectedUnit to ViewUnit modal */}
      <ViewUnit
        show={viewModalShow}
        handleClose={() => setViewModalShow(false)}
        details={selectedUnit}
      />

      <EditUnit
        show={editModalShow}
        handleClose={() => setEditModalShow(false)}
        details={selectedUnit}
        onSave={handleSaveUnit}
      />
    </div>
    </div>
    </div>
  );
};

export default UnitTable;
