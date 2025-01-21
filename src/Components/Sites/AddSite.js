import React, { useState } from 'react';

const AddSiteForm = ({ addSite }) => {
  const [siteCode, setSiteCode] = useState('');
  const [siteName, setSiteName] = useState('');
  const [inchargeName, setInchargeName] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [siteManager, setSiteManager] = useState('');
  const [inchargeMobile, setInchargeMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSite = {
      siteCode,
      siteName,
      inchargeName,
      location,
      city,
      state,
      siteManager,
      inchargeMobile,
    };

    addSite(newSite); // Function to add the site
    // Clear form after submission
    setSiteCode('');
    setSiteName('');
    setInchargeName('');
    setLocation('');
    setCity('');
    setState('');
    setSiteManager('');
    setInchargeMobile('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Add New Site</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Site Code:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={siteCode}
                        onChange={(e) => setSiteCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Site Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Incharge Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={inchargeName}
                        onChange={(e) => setInchargeName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Location:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>City:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>State:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Site Manager:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={siteManager}
                        onChange={(e) => setSiteManager(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Incharge Mobile:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={inchargeMobile}
                        onChange={(e) => setInchargeMobile(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-success btn-block mt-3">
                  Add Site
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSiteForm;
