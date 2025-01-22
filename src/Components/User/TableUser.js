import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from '../../layout/DataTable';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import ModalPopup from './AddUser';
import ViewUser from './ViewUser';
import EditUser from './EditUser';

const Table = () => {
  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [data, setData] = useState([
    { id: 1, name: 'Sharvani', mobile: '123-456-7890', email: 'sharvani@example.com', role: 'Admin' },
    { id: 2, name: 'Maniteja', mobile: '987-654-3210', email: 'mani@example.com', role: 'Site Manager' },
    { id: 3, name: 'Rajesh', mobile: '456-789-0123', email: 'rajesh@example.com', role: 'Admin' },
  ]);

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

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      setData((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? { ...user, ...userData } : user))
      );
    } else {
      const newId = Math.max(...data.map((user) => user.id)) + 1;
      setData((prev) => [...prev, { id: newId, ...userData }]);
    }
    setSelectedUser(null);
  };

  const handleDeleteUser = (userToDelete) => {
    setData((prev) => prev.filter((user) => user.id !== userToDelete.id));
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
        <Button variant="primary" onClick={handleAddUser}>
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
