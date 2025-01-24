import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from '../../layout/DataTable';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import ModalPopup from './AddUser';
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import axios from 'axios';

const Table = () => {
  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [data, setData] = useState([]);

  // Fetch users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users'); // Update the URL if needed
        setData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewModalShow(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditModalShow(true);
  };

  const handleAddUser = () => {
    setAddModalShow(true);
  };

  const handleSaveUser = async (userData) => {
    try {
      if (selectedUser) {
        // Update user
        const updatedUser = { ...selectedUser, ...userData };
        setData((prev) =>
          prev.map((user) => (user.id === selectedUser.id ? updatedUser : user))
        );
        // Add update API call if necessary
      } else {
        // Add new user
        const response = await axios.post('http://localhost:5000/users', userData);
        setData((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userToDelete) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userToDelete.id}`); // Ensure your server supports DELETE
      setData((prev) => prev.filter((user) => user.id !== userToDelete.id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    { Header: 'S.No', Cell: ({ row }) => row.index + 1 },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Mobile', accessor: 'mobile' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-info" size="sm" onClick={() => handleViewUser(row.original)}>
            <FaEye />
          </Button>
          <Button variant="outline-warning" size="sm" onClick={() => handleEditUser(row.original)}>
            <FaEdit />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDeleteUser(row.original)}>
            <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Users</h1>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" className="add-button" onClick={handleAddUser}>
          <FaPlus className="me-2" />
          Add New User
        </Button>
      </div>

      <DataTable columns={columns} data={data} />

      <ModalPopup
        user={selectedUser}
        showModal={addModalShow}
        handleClose={() => setAddModalShow(false)}
        handleSave={handleSaveUser}
      />

      <ViewUser
        user={selectedUser}
        showModal={viewModalShow}
        handleClose={() => setViewModalShow(false)}
      />

      <EditUser
        user={selectedUser}
        showModal={editModalShow}
        handleClose={() => setEditModalShow(false)}
        handleSave={handleSaveUser}
      />
    </div>
  );
};

export default Table;
