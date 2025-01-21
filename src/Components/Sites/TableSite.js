import React, { useState } from 'react';

const SiteTable = () => {
  const [siteData] = useState([
    { siteCode: 'S001', siteName: 'Site A', inchargeName: 'John Doe', location: 'Location A', city: 'City A', state: 'State A', siteManager: 'Manager A', inchargeMobile: '123-456-7890' },
    { siteCode: 'S002', siteName: 'Site B', inchargeName: 'Jane Doe', location: 'Location B', city: 'City B', state: 'State B', siteManager: 'Manager B', inchargeMobile: '987-654-3210' },
    { siteCode: 'S003', siteName: 'Site C', inchargeName: 'Sam Smith', location: 'Location C', city: 'City C', state: 'State C', siteManager: 'Manager C', inchargeMobile: '456-789-0123' },
    { siteCode: 'S004', siteName: 'Site D', inchargeName: 'Mike Johnson', location: 'Location D', city: 'City D', state: 'State D', siteManager: 'Manager D', inchargeMobile: '123-456-7890' },
    { siteCode: 'S005', siteName: 'Site E', inchargeName: 'Sarah Lee', location: 'Location E', city: 'City E', state: 'State E', siteManager: 'Manager E', inchargeMobile: '987-654-3210' },
  ]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Site Management</h1>
      
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Site Code</th>
            <th>Site Name</th>
            <th>Incharge Name</th>
            <th>Location</th>
            <th>City</th>
            <th>State</th>
            <th>Site Manager</th>
            <th>Incharge Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {siteData.map((site, index) => (
            <tr key={index}>
              <td>{site.siteCode}</td>
              <td>{site.siteName}</td>
              <td>{site.inchargeName}</td>
              <td>{site.location}</td>
              <td>{site.city}</td>
              <td>{site.state}</td>
              <td>{site.siteManager}</td>
              <td>{site.inchargeMobile}</td>
              <td>
                <button className="btn btn-info mr-2">
                  <i className="fas fa-eye"></i> View
                </button>
                <button className="btn btn-warning mr-2">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger">
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SiteTable;
