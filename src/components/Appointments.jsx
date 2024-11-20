import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Appointments.css';

const Appointments = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [hideNoted, setHideNoted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with today's date
  const appointmentsPerPage = 7;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Example data with initial actions set to 'Pending'
  const [appointments, setAppointments] = useState([
    { date: '2024-10-02', time: '7:00 - 7:10', furparent: 'Lance Meting', type: 'Dog', furpatient: 'Arrow Meting', status: 'Ongoing', actions: 'Pending' },
    { date: '2024-10-02', time: '8:20 - 8:30', furparent: 'Carter Smith', type: 'Dog', furpatient: 'Browny Smith', status: 'Ongoing', actions: 'Pending' },
    { date: '2024-10-03', time: '9:00 - 9:10', furparent: 'John Doe', type: 'Cat', furpatient: 'Whiskers Doe', status: 'Ongoing', actions: 'Pending' },
    // Add more data as needed
  ]);

  // Format date to a readable string
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  // Filter appointments based on search query, hide noted status, and current date
  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = appointment.date === currentDate;
    const matchesSearchQuery = appointment.furparent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.furpatient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesHideNoted = hideNoted ? appointment.status.toLowerCase() !== 'noted' : true;

    return matchesDate && matchesSearchQuery && matchesHideNoted;
  });

  // Calculate the current appointments to display
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle hide noted checkbox change
  const handleHideNotedChange = (event) => {
    setHideNoted(event.target.checked);
    setCurrentPage(1); // Reset to first page when toggling hide noted
  };

  // Handle date change from date picker
  const handleDateChange = (event) => {
    setCurrentDate(event.target.value);
    setCurrentPage(1); // Reset to first page on date change
  };

  // Handle next date
  const handleNextDate = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate.toISOString().split('T')[0]);
  };

  // Handle previous date
  const handlePreviousDate = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate.toISOString().split('T')[0]);
  };

  // Handle status change to "Noted" or "Cancelled"
  const handleStatusChange = (index, newStatus) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index].status = newStatus;
    updatedAppointments[index].actions = newStatus === 'Noted' ? 'COMPLETED' : 'CANCELLED';
    setAppointments(updatedAppointments);
  };

  return (
    <section id="hero" className="hero section">
      {/* Header Section */}
      <div className="header-wrapper d-flex align-items-center">
        <div className="logo-container d-flex align-items-center">
          <img src="src\components\pictures\Pawfinds_Logo.png" alt="Paw Finds Logo" width="80" height="80" />
        </div>

        <header id="header" className="header d-flex align-items-center">
          <div className="header-container container-fluid container-xl d-flex align-items-center justify-content-between">
            <nav id="navmenu" className="navmenu">
              <ul className="d-flex align-items-center">
              <li><Link to="/appointments" className="active">Appointments</Link></li>
                <li><Link to="/patients">Patients</Link></li>
              </ul>
            </nav>

            {/* Profile Dropdown */}
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
                    <li><a href="#settings">Settings</a></li>
                    <li><a href="#logout">Logout</a></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Appointments Section */}
      <div className="appointments-container">
        <div className="page-header d-flex align-items-center justify-content-between">
          <h2>Appointments 📅</h2>
          <div className="search-filters d-flex align-items-center">
            <div className="search-bar d-flex align-items-center">
              <img src="src\components\pictures\search-icon.png" alt="Search Icon" className="search-icon" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="filters d-flex align-items-center">
              <label className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={hideNoted}
                  onChange={handleHideNotedChange}
                /> Hide Noted
              </label>
              <div className="date-navigation">
                <button onClick={handlePreviousDate}>◀</button>
                <div className="date-display" onClick={() => document.getElementById('date-picker').showPicker()}>
                  <span>{formatDate(currentDate)}</span>
                </div>
                <button onClick={handleNextDate}>▶</button>
                <input
                  type="date"
                  id="date-picker"
                  value={currentDate}
                  onChange={handleDateChange}
                  className="date-picker"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <table className="appointments-table">
          <thead>
            <tr>
              <th className='time-column'>Time</th>
              <th className="furparent-column">Furparent</th>
              <th className='type-column'>Type</th>
              <th className="furpatient-column">Fur Patient</th>
              <th className='status-column'>Status</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.length > 0 ? (
              currentAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.time}</td>
                  <td>{appointment.furparent}</td>
                  <td>{appointment.type}</td>
                  <td>{appointment.furpatient}</td>
                  <td><span className={`status-badge ${appointment.status.toLowerCase()}`}>{appointment.status}</span></td>
                  <td className="actions">
                    {appointment.actions === 'COMPLETED' || appointment.actions === 'CANCELLED' ? (
                      <span className={`status-${appointment.actions.toLowerCase()}`}>{appointment.actions}</span>
                    ) : (
                      <>
                        <button className="action-btn complete-btn" onClick={() => handleStatusChange(index, 'Noted')}>Complete</button>
                        <button className="action-btn cancel-btn" onClick={() => handleStatusChange(index, 'Cancelled')}>Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No appointments available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination */}
      <footer className="footer">
        <div className="pagination">
          <span>Page</span>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>
          <span className="page-number">{currentPage}</span>
          <span>...</span>
          <span className="page-number">{Math.ceil(filteredAppointments.length / appointmentsPerPage)}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredAppointments.length / appointmentsPerPage)}>
            &gt;
          </button>
        </div>
      </footer>
    </section>
  );
};

export default Appointments;
