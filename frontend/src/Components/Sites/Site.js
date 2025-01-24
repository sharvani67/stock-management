import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AddSiteForm from './AddSite';
import DataTable from '../../layout/DataTable';
import { FaEdit, FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa'; // Import icons
import EditSite from './EditSite';
import ViewSite from './ViewSite';
import axios from 'axios'; // Import axios for API calls

const SiteTable = () => {
  const [siteData, setSiteData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleShowEdit = () => setShowEditModal(true);
  const handleShowView = () => setShowViewModal(true);

  // Fetch site data from the API when the component mounts
  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sites');
        setSiteData(response.data); // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching site data:', error);
      }
    };
    fetchSiteData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const addSite = (newSite) => {
    setSiteData([...siteData, newSite]);
    handleClose(); // Close modal after adding site
  };

  const updateSite = (updatedSite) => {
    setSiteData((prevData) =>
      prevData.map((site) => (site.siteCode === updatedSite.siteCode ? updatedSite : site))
    );
    handleClose(); // Close modal after updating site
  };

  const handleView = (site) => {
    setSelectedSite(site); // Set the selected site
    setShowViewModal(true); // Show the ViewSite modal
  };

  const handleEdit = (site) => {
    setSelectedSite(site);
    setShowEditModal(true); // Open EditSite modal
  };

  const handleDelete = (siteCode) => {
    const updatedData = siteData.filter((site) => site.siteCode !== siteCode);
    setSiteData(updatedData);
  };

  const columns = [
    { Header: 'Site Code', accessor: 'site_code' }, // Updated to match API key
    { Header: 'Site Name', accessor: 'site_name' }, // Updated to match API key
    { Header: 'Incharge Name', accessor: 'incharge_name' }, // Updated to match API key
    { Header: 'Location', accessor: 'location' },
    { Header: 'City', accessor: 'city' },
    { Header: 'State', accessor: 'state' },
    { Header: 'Site Manager', accessor: 'site_manager' }, // Updated to match API key
    { Header: 'Incharge Mobile', accessor: 'incharge_mobile' }, // Updated to match API key
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-info" size="sm" onClick={() => handleView(row.original)}>
            <FaEye />
          </Button>
          <Button variant="outline-warning" size="sm" onClick={() => handleEdit(row.original)}>
            <FaEdit />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(row.original.siteCode)}
          >
            <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Site Management</h1>

      {/* Add New Site Button */}
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" className='add-button' onClick={handleShowAdd}>
          <FaPlus className="me-2" />
          Add New Site
        </Button>
      </div>

      {/* Table Wrapper with Scroll */}
      <div className="table-wrapper">
        <DataTable columns={columns} data={siteData} />
      </div>

      {/* Add Site Modal */}
      <AddSiteForm
        addSite={addSite}
        showModal={showAddModal}
        handleClose={handleClose}
      />

      {/* View Site Modal */}
      <ViewSite
        site={selectedSite}
        showModal={showViewModal}
        handleClose={handleClose}
      />

      {/* Edit Site Modal */}
      <EditSite
        site={selectedSite}
        updateSite={updateSite}
        showModal={showEditModal}
        handleClose={handleClose}
      />
    </div>
  );
};

export default SiteTable;
