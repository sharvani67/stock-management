import React, { useState } from 'react';

const AddPurchaseForm = ({ onAddPurchase }) => {
  const [formData, setFormData] = useState({
    stockName: '',
    quantity: '',
    units: '',
    price: '',
    supplierName: '',
    brandName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPurchase(formData);
    setFormData({
      stockName: '',
      quantity: '',
      units: '',
      price: '',
      supplierName: '',
      brandName: '',
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Add New Purchase</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="stockName"><strong>Stock Name:</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="stockName"
                        name="stockName"
                        value={formData.stockName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="quantity"><strong>Quantity:</strong></label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="units"><strong>Units:</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="units"
                        name="units"
                        value={formData.units}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="price"><strong>Price:</strong></label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="supplierName"><strong>Supplier Name:</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="supplierName"
                        name="supplierName"
                        value={formData.supplierName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="brandName"><strong>Brand Name:</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="brandName"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-success btn-block mt-3">
                  Add Purchase
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseForm;
