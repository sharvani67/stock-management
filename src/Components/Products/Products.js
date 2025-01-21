import React from "react";
import  { useState } from "react";
import AddProduct from "./AddProduct";

const ProductTable = () => {
  // Sample product data
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", description: "This is product 1" },
    { id: 2, name: "Product 2", description: "This is product 2" },
  ]);

   // Add new product
   const handleAddProduct = (newProduct) => {
    setProducts([
      ...products,
      { id: products.length + 1, ...newProduct },
    ]);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product Table</h2>
      <AddProduct onAddProduct={handleAddProduct} />
      <table className="table table-bordered table-hover ">
        <thead className="table-dark">
          <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
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

export default ProductTable;
