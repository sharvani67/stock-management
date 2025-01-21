import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddSiteForm from './AddSite';
import DataTable from '../DataTable';

// Define the columns for the data table
const columns = [
  {
    Header: 'Site Code',
    accessor: 'siteCode',
  },
  {
    Header: 'Site Name',
    accessor: 'siteName',
  },
  {
    Header: 'Incharge Name',
    accessor: 'inchargeName',
  },
  {
    Header: 'Location',
    accessor: 'location',
  },
  {
    Header: 'City',
    accessor: 'city',
  },
  {
    Header: 'State',
    accessor: 'state',
  },
  {
    Header: 'Site Manager',
    accessor: 'siteManager',
  },
  {
    Header: 'Incharge Mobile',
    accessor: 'inchargeMobile',
  },
];

const SiteTable = () => {
  const [siteData, setSiteData] = useState([
    { siteCode: 'S001', siteName: 'Site A', inchargeName: 'John Doe', location: 'Location A', city: 'City A', state: 'State A', siteManager: 'Manager A', inchargeMobile: '123-456-7890' },
    { siteCode: 'S002', siteName: 'Site B', inchargeName: 'Jane Doe', location: 'Location B', city: 'City B', state: 'State B', siteManager: 'Manager B', inchargeMobile: '987-654-3210' },
    { siteCode: 'S003', siteName: 'Site C', inchargeName: 'Sam Smith', location: 'Location C', city: 'City C', state: 'State C', siteManager: 'Manager C', inchargeMobile: '456-789-0123' },
    { siteCode: 'S004', siteName: 'Site D', inchargeName: 'Mike Johnson', location: 'Location D', city: 'City D', state: 'State D', siteManager: 'Manager D', inchargeMobile: '123-456-7890' },
    { siteCode: 'S005', siteName: 'Site E', inchargeName: 'Sarah Lee', location: 'Location E', city: 'City E', state: 'State E', siteManager: 'Manager E', inchargeMobile: '987-654-3210' },
    { siteCode: 'S005', siteName: 'Site E', inchargeName: 'Sarah Lee', location: 'Location E', city: 'City E', state: 'State E', siteManager: 'Manager E', inchargeMobile: '987-654-3210' },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const addSite = (newSite) => {
    setSiteData([...siteData, newSite]);
  };

  return (
    <div className="container mt-5">
  <h1 className="mb-4">Site Management</h1>

  {/* Add New Site Button aligned to the right (green color) */}
  <div className="d-flex justify-content-end mb-3">
    <Button variant="success" onClick={handleShow}>
      Add New Site
    </Button>
  </div>

  {/* Use DataTable component with proper props */}
  <DataTable columns={columns} data={siteData} />

  <AddSiteForm addSite={addSite} showModal={showModal} handleClose={handleClose} />
  </div>

  );
};

export default SiteTable;
