import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Patients.css';

const Patients = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const patientsPerPage = 10;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const patients = [
    { name: 'Arrow Meting', age: '2y 11m', breed: 'Siberian Husky', gender: 'male', image: 'src\components\patient list\arrow.jpg', height: '42 cm', weight: '15.5 kg', color: 'Black and White' },
    { name: 'Browny Smith', age: '2 years', breed: 'Golden Retriever', gender: 'male', image: 'src\components\patient list\browny.jpeg', height: '50 cm', weight: '20 kg', color: 'Golden' },
    { name: 'Whiskers Doe', age: '1 year', breed: 'Persian Cat', gender: 'female', image: 'src\components\patient list\whiskers.jpg', height: '30 cm', weight: '5 kg', color: 'White' },
    { name: 'Arrow Meting', age: '2y 11m', breed: 'Siberian Husky', gender: 'male', image: 'src\components\patient list\arrow.jpg', height: '42 cm', weight: '15.5 kg', color: 'Black and White' },
    // Add more patients as needed
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  return (
    <section id="hero" className="hero section">
      <div className="header-wrapper d-flex align-items-center">
        <div className="logo-container d-flex align-items-center">
          <img src="src\components\pictures\Pawfinds_Logo.png" alt="Paw Finds Logo" width="80" height="80" />
        </div>

        <header id="header" className="header d-flex align-items-center">
          <div className="header-container container-fluid container-xl d-flex align-items-center justify-content-between">
            <nav id="navmenu" className="navmenu">
              <ul className="d-flex align-items-center">
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/patients" className="active">Patients</Link></li>
              </ul>
            </nav>

            <div className="profile-dropdown">
              <div className="profile d-flex align-items-center" onClick={toggleDropdown}>
                <img src="src\components\pictures\dokhayop.jpg" alt="Profile" className="profile-pic" />
                <span className="clinic-name">Dok Hayop Spa</span>
                <i className={`dropdown-icon bi ${dropdownOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`}></i>
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li><a href="#profile">My Profile</a></li>
                    <li><a href="#logout">Logout</a></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      <div className="patients-container">
        <div className="page-header d-flex align-items-center justify-content-between">
          <h2>Patients 🐾</h2>
          <div className="patient-search-filters d-flex align-items-center">
            <div className="patient-search-bar d-flex align-items-center">
              <img src="src\components\pictures\search-icon.png" alt="Search Icon" className="patient-search-icon" />
              <input
                type="text"
                placeholder="Search patients..."
                className="patient-search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className={`patient-box ${currentPatients.length <= 6 ? 'no-scroll' : ''}`}>
          {selectedPatient ? (
            <div className="patient-details">
              <div className="patient-image-container">
                <img src={selectedPatient.image} alt={selectedPatient.name} className="patient-image-large" />
              </div>
              <div className="patient-info-container">
                <div className="patient-header">
                  <div className="text">
                    <h3>{selectedPatient.name}</h3>
                    <p className='patient-breed'>{selectedPatient.breed} · {selectedPatient.age}</p>
                  </div>
                  <div className="gender-icon">
                    {selectedPatient.gender === 'female' ? (
                      <img src="src\components\pictures\female.png" alt="Female" />
                    ) : (
                      <img src="src\components\pictures\male.png" alt="Male" />
                    )}
                  </div>
                </div>
                <div className="patient-needs">
                  <h4><i className='fa fa-medkit'></i>Special Needs</h4>
                  <div className="tags">
                    <span>Monthly Groom</span>
                    <span>Exercise</span>
                    <span>Mental Stimulation</span>
                    <span>Controlled Diet</span>
                    <span>Dental Care</span>
                  </div>
                  <h4>Medical History</h4>
                  <div className="tags">
                    <span>Food Allergy</span>
                    <span>Nose bleed due to excessive hot temperature</span>
                  </div>
                </div>
              </div>
              <div className="patient-characteristics">
                <div className="characteristic">
                  <p>Height</p>
                  <p className='pp'>{selectedPatient.height}</p>
                </div>
                <div className="characteristic">
                  <p>Weight</p>
                  <p className='pp'>{selectedPatient.weight}</p>
                </div>
                <div className="characteristic">
                  <p>Color</p>
                  <p className='pp'>{selectedPatient.color}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="patients-list">
              {currentPatients.length > 0 ? (
                currentPatients.map((patient, index) => (
                  <div key={index} className="patient-card" onClick={() => handlePatientClick(patient)}>
                    <img src={patient.image} alt={patient.name} className="patient-image" />
                    <div className="patient-info">
                      <p><strong>Name:</strong> {patient.name}</p>
                      <p><strong>Age:</strong> {patient.age}</p>
                      <p><strong>Breed:</strong> {patient.breed}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-patient-data">No patients found</p>
              )}
            </div>
          )}
        </div>
        {selectedPatient && (
          <div className="button-group">
            <button className="back-button" onClick={() => setSelectedPatient(null)}>Back</button>
            <button className="clinic-history-button">Clinic History</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Patients;