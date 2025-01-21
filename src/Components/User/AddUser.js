import React, { useState, useEffect } from 'react';

const ModalPopup = ({ user, showModal, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    role: ''
  });

  // If user is passed (for edit), pre-fill the form with the user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        role: user.role
      });
    } else {
      // Clear form data for adding a new user
      setFormData({
        name: '',
        mobile: '',
        email: '',
        role: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose(); // Close the modal after saving
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} aria-hidden={!showModal}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{user ? 'Edit User' : 'Add New User'}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input type="text" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input type="text" className="form-control" name="role" value={formData.role} onChange={handleChange} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              {user ? 'Save changes' : 'Add User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
