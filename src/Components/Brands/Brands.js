import React from "react";
import  { useState } from "react";
import AddBrand from "./AddBrand";

const Brand = () => {
  // Sample brand data
  const [brands,setbrands ] = useState([
    { id: 1, brandname: "Brand 1", description: "This is brand 1" },
    { id: 2, brandname: "Brand 2", description: "This is brand 2" },
  ]);

   // Add new brand
   const handleAddBrand = (newBrand) => {
    setbrands([
      ...brands,
      { id: brands.length + 1, ...newBrand },
    ]);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Brand Table</h2>
      <AddBrand onAddBrand={handleAddBrand} />
      <table className="table table-bordered table-hover ">
        <thead className="table-dark">
          <tr>
            <th>S.No</th>
            <th>Brand Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={brand.id}>
              <td>{index + 1}</td>
              <td>{brand.brandname}</td>
              <td>{brand.description}</td>
              <td>
                <button className="btn btn-sm btn-primary mx-1">
                  <i className="fas fa-eye"></i> 
                </button>
                <button className="btn btn-sm btn-warning mx-1">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-sm btn-danger mx-1">
                  <i className="fas fa-trash-alt"></i> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Brand;
