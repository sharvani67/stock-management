import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AddSiteForm from './AddSite';
import DataTable from '../../layout/DataTable';
import { FaEdit, FaTrashAlt, FaEye, FaPlus } from 'react-icons/fa';
import EditSite from './EditSite';
import ViewSite from './ViewSite';
import axios from 'axios';

import { BASE_URL } from '../../ApiService/Api';
import AdminNavbar from '../../Admin/Navbar/Navbar';

const SiteTable = () => {
  const [collapsed, setCollapsed] = useState(false);
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

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sites`);
        const sortedData = response.data.sort((a, b) => b.siteCode - a.siteCode); // Sorting in descending order
        setSiteData(sortedData);
      } catch (error) {
        console.error('Error fetching site data:', error);
      }
    };
    fetchSiteData();
  }, []);

  const addSite = (newSite) => {
    setSiteData((prevData) => [newSite, ...prevData]); // Add new site at the beginning
    handleClose();
  };

  const updateSite = (updatedSite) => {
    setSiteData((prevData) =>
      prevData.map((site) => (site.siteCode === updatedSite.siteCode ? updatedSite : site))
    );
    handleClose();
  };

  const handleView = (site) => {
    setSelectedSite(site);
    setShowViewModal(true);
  };

  const handleEdit = (site) => {
    setSelectedSite(site);
    setShowEditModal(true);
  };

  const handleDelete = (siteCode) => {
    setSiteData((prevData) => prevData.filter((site) => site.siteCode !== siteCode));
  };

  const columns = [
    { Header: 'Site Code', accessor: 'siteCode' },
    { Header: 'Site Name', accessor: 'siteName' },
    { Header: 'Location', accessor: 'location' },
    { Header: 'City', accessor: 'city' },
    { Header: 'State', accessor: 'state' },
    { Header: 'Site Manager', accessor: 'siteManager' },
    { Header: 'Manager Mobile', accessor: 'managerMobile' },
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
    <div className="admintablelayoutContainer">
      < AdminNavbar />
      <div className={`admintablelayout ${collapsed ? 'collapsed' : ''}`}>
        <div className="container mt-5">
          <h1 className="mb-4">Site Management</h1>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" className="add-button" onClick={handleShowAdd}>
              <FaPlus className="me-2" />
              Add New Site
            </Button>
          </div>
          <div className="table-wrapper">
            <DataTable columns={columns} data={siteData} />
          </div>
          <AddSiteForm addSite={addSite} showModal={showAddModal} handleClose={handleClose} />
          <ViewSite site={selectedSite} showModal={showViewModal} handleClose={handleClose} />
          <EditSite site={selectedSite} updateSite={updateSite} showModal={showEditModal} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default SiteTable;
