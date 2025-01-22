import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from "../../layout/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import ModalPopup from './AddUser';

const Table = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([
    { id: 1, name: 'Sharvani', mobile: '123-456-7890', email: 'sharvani@example.com', role: 'Admin' },
    { id: 2, name: 'Maniteja', mobile: '987-654-3210', email: 'mani@example.com', role: 'Site Manager' },
    { id: 3, name: 'Rajesh', mobile: '456-789-0123', email: 'rajesh@example.com', role: 'Admin' },
    { id: 4, name: 'Hemanth', mobile: '123-456-7890', email: 'hemanth@example.com', role: 'Admin' },
    { id: 5, name: 'Ganesh', mobile: '987-654-3210', email: 'ganesh@example.com', role: 'Site Manager' },
    { id: 6, name: 'Karthik', mobile: '456-789-0123', email: 'karthik@example.com', role: 'Site Manager' },
  ]);

  const handleOpenModal = (action, user = null) => {
    setModalTitle(action === "Add New" ? "Add New User" : `${action} User`);
    setSelectedUser(user);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedUser(null);
    setModalTitle("");
  };

  const handleSave = (userData) => {
    if (selectedUser) {
      // Update the existing user
      setData(prev =>
        prev.map(user => (user.id === selectedUser.id ? { ...user, ...userData } : user))
      );
    } else {
      // Add a new user
      const newId = Math.max(...data.map(user => user.id)) + 1;
      setData(prev => [...prev, { id: newId, ...userData }]);
    }
  };

  const handleDelete = (userToDelete) => {
    setData(prev => prev.filter(user => user.id !== userToDelete.id));
  };

  const columns = [
    {
      Header: "S.No",
      Cell: ({ row }) => row.index + 1, // Display serial number based on row index
    },
    { Header: "Name", accessor: "name" },
    { Header: "Mobile", accessor: "mobile" },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "role" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-info"
            size="sm"
            title="View"
            onClick={() => console.log("View user:", row.original)}
          >
            <FaEye />
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            title="Edit"
            onClick={() => handleOpenModal("Edit", row.original)}
          >
            <FaEdit />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Users</h1>

      {/* Add New User Button */}
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={() => handleOpenModal("Add New")}>
          <FaPlus className="me-2" />
          Add New User
        </Button>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={data} />

      {/* Modal Popup */}
      <ModalPopup
        user={selectedUser}
        showModal={modalShow}
        handleClose={handleCloseModal}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Table;
