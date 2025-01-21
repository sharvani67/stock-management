import React, { useState } from 'react';
import ModalPopup from './AddUser';

const Table = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([
    { name: 'Sharvani', mobile: '123-456-7890', email: 'sharvani@example.com', role: 'Admin' },
    { name: 'Maniteja', mobile: '987-654-3210', email: 'mani@example.com', role: 'Site Manager' },
    { name: 'Rajesh', mobile: '456-789-0123', email: 'rajesh@example.com', role: 'Admin' },
    { name: 'Hemanth', mobile: '123-456-7890', email: 'hemanth@example.com', role: 'Admin' },
    { name: 'Ganesh', mobile: '987-654-3210', email: 'ganesh@example.com', role: 'Site Manager' },
    { name: 'Karthik', mobile: '456-789-0123', email: 'karthik@example.com', role: 'Site Manager' },
  ]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleAddNewUserClick = () => {
    setSelectedUser(null); // No user is selected when adding a new user
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSave = (userData) => {
    if (selectedUser) {
      // Update the existing user
      const updatedData = data.map((user) =>
        user.name === selectedUser.name ? { ...user, ...userData } : user
      );
      setData(updatedData);
    } else {
      // Add a new user
      setData([...data, { ...userData, name: `${userData.name}` }]);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Users</h1>
      <button className="btn btn-primary mb-4" onClick={handleAddNewUserClick}>
        + Add New User
      </button>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.mobile}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <button className="btn btn-info mr-2">
                  <i className="fas fa-eye"></i> 
                </button>
                <button className="btn btn-warning mr-2" onClick={() => handleEditClick(item)}>
                  <i className="fas fa-edit"></i> 
                </button>
                <button className="btn btn-danger">
                  <i className="fas fa-trash-alt"></i> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup for Add/Edit */}
      <ModalPopup
        user={selectedUser}
        showModal={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Table;
