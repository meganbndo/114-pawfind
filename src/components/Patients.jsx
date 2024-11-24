import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClinicHistory from './ClinicHistory';
import './Patients.css';

const Patients = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [clinicSearchQuery, setClinicSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewClinicHistory, setViewClinicHistory] = useState(false);
  const [patients, setPatients] = useState([]);
  const patientsPerPage = 10;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3001/patients');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleClinicSearchChange = (event) => {
    setClinicSearchQuery(event.target.value);
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setViewClinicHistory(false);
  };

  const handleClinicHistoryClick = () => {
    setViewClinicHistory(true);
  };

  const handleBackClick = () => {
    if (viewClinicHistory) {
      setViewClinicHistory(false);
    } else {
      setSelectedPatient(null);
    }
  };

  const handleUpdateHistory = async (updatedHistory) => {
    if (selectedPatient) {
      try {
        const response = await fetch(`http://localhost:3001/patients/${selectedPatient.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ history: updatedHistory }),
        });
        if (!response.ok) {
          throw new Error('Failed to update patient history');
        }
        const updatedPatients = patients.map(patient =>
          patient.id === selectedPatient.id ? { ...patient, history: updatedHistory } : patient
        );
        setPatients(updatedPatients);
        setSelectedPatient({ ...selectedPatient, history: updatedHistory });
      } catch (error) {
        console.error('Error updating patient history:', error);
      }
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

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
                    <li><a href="/profile">My Profile</a></li>
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
          <h2>
            {viewClinicHistory && selectedPatient ? `${selectedPatient.name}'s Clinic History` : 'Patients 🐾'}
          </h2>
          {!selectedPatient && !viewClinicHistory && (
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
          )}
          {viewClinicHistory && (
            <input
              type="text"
              placeholder="Search Clinic History"
              className="search-bar"
              value={clinicSearchQuery}
              onChange={handleClinicSearchChange}
            />
          )}
        </div>

        <div className={`patient-box ${currentPatients.length <= 6 ? 'no-scroll' : ''}`}>
          {selectedPatient && viewClinicHistory ? (
            <ClinicHistory
              patientId={selectedPatient.id}
              history={selectedPatient.history}
              searchQuery={clinicSearchQuery}
              onUpdateHistory={handleUpdateHistory}
            />
          ) : selectedPatient ? (
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
            <button className="back-button" onClick={handleBackClick}>Back</button>
            {!viewClinicHistory && (
              <button className="clinic-history-button" onClick={handleClinicHistoryClick}>Clinic History</button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Patients;
