import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from '../../layout/DataTable';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import ModalPopup from './AddUser';
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import axios from 'axios';

import '../../CSS/AdminPaneltable.css';
import { BASE_URL } from '../../ApiService/Api';
import AdminNavbar from '../../Admin/Navbar/Navbar';

const UserTable = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);

  // ✅ Fetch users from the database
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      const sortedData = response.data.sort((a, b) => b.id - a.id); // Sort users in descending order
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // ✅ View User
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewModalShow(true);
  };

  // ✅ Edit User
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditModalShow(true);
  };

  // ✅ Add New User
  const handleAddUser = () => {
    setSelectedUser(null);
    setAddModalShow(true);
  };

  // ✅ Save or Update User
  const handleSaveUser = async (userData) => {
    try {
      if (selectedUser) {
        // 🔹 Update user
        await axios.put(`${BASE_URL}/users/${selectedUser.id}`, userData);
        setData((prev) =>
          prev.map((user) => (user.id === selectedUser.id ? { ...selectedUser, ...userData } : user))
        );
      } else {
        // 🔹 Add new user
        const response = await axios.post(`${BASE_URL}/users`, userData);
        setData((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
    setSelectedUser(null);
    fetchUsers(); // Refresh user list
  };

  // ✅ Delete User with Confirmation
  const handleDeleteUser = async (userToDelete) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${userToDelete.name}?`);
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`${BASE_URL}/users/${userToDelete.id}`);
  
      if (response.status === 200) {
        setData((prev) => prev.filter((user) => user.id !== userToDelete.id));
      } else {
        alert('Error deleting user. Please try again.');
      }
    } catch (error) {
      console.error('Delete Error:', error.response ? error.response.data : error.message);
      alert('Failed to delete user. Please check console.');
    }
  };
  

  // ✅ Table Columns
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
    <div className="adminpaneltablelayoutContainer">
      <AdminNavbar />
      <div className={`adminpaneltablelayout ${collapsed ? "collapsed" : ""}`}>
        <h1 className="mb-4">Users</h1>
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" className="add-button" onClick={handleAddUser}>
            <FaPlus className="me-2" />
            Add New User
          </Button>
        </div>

        {/* ✅ User Data Table */}
        <DataTable columns={columns} data={data} />

        {/* ✅ Modals for View, Add & Edit */}
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
    </div>
  );
};

export default UserTable;
