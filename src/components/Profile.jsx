// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:3001/profiles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data[0]); // Assuming there's only one profile
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfileData();
  }, []);

  // Temporary state to handle cancel functionality
  const [tempProfileData, setTempProfileData] = useState(profileData);

  useEffect(() => {
    if (profileData) {
      setTempProfileData(profileData);
    }
  }, [profileData]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleServiceChange = (service) => {
    const updatedServices = new Set(tempProfileData.services.split(', '));
    if (updatedServices.has(service)) {
      updatedServices.delete(service);
    } else {
      updatedServices.add(service);
    }
    setTempProfileData({ ...tempProfileData, services: Array.from(updatedServices).join(', ') });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/profiles/${tempProfileData.clinic_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempProfileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfileData(updatedProfile);
      console.log("Saved changes:", updatedProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleCancel = () => {
    // Discard changes
    setTempProfileData(profileData);
    console.log("Cancelled changes");
  };

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const hoursOfDay = [
    "12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am",
    "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm"
  ];

  const servicesOffered = [
    "General Check-Up and Wellness Exams",
    "Vaccination and Preventive Care",
    "Diagnostics and Imaging",
    "Surgery",
    "Dental Care",
    "Orthopedic Services",
    "Rehabilitation and Physical Therapy",
    "End-of-Life Care and Euthanasia",
    "Ophthalmology",
    "Emergency and Critical Care",
    "Pet Nutrition Counseling",
    "Geriatric (Senior) Pet Care",
    "Pet Refresher (Groom)",
    "Pet Boarding and Daycare",
    "Reproductive and Breeding Services",
    "Oncology",
    "Cardiology",
    "Acupuncture and Alternative Therapies"
  ];

  if (!tempProfileData) {
    return <div>Loading...</div>;
  }

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
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/patients">Patients</Link></li>
              </ul>
            </nav>

            {/* Profile Dropdown */}
            <div className="profile-dropdown">
              <div className="profile d-flex align-items-center" onClick={toggleDropdown}>
                <img src={tempProfileData.profile_pic} alt="Profile" className="profile-pic" />
                <span className="clinic-name">{tempProfileData.clinic_name}</span>
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

      <div className="profile-container">
        <div className="profile-header d-flex align-items-center justify-content-between">
          <h2>Edit Profile 📝</h2>
        </div>
        
        <div className="profile-box">
          <div className="profile-image">
            <img src={tempProfileData.profile_pic} alt="Profile" />
            <button className="change-picture-button">Change Picture</button>
          </div>
          <div className="profile-info">
            <div className="profile-field">
              <label>Clinic Name</label>
              <input type="text" value={tempProfileData.clinic_name} onChange={(e) => setTempProfileData({ ...tempProfileData, clinic_name: e.target.value })} />
            </div>
            <div className="profile-field">
              <label>Bio</label>
              <textarea value={tempProfileData.bio} onChange={(e) => setTempProfileData({ ...tempProfileData, bio: e.target.value })} />
            </div>
            <div className="profile-field address-group">
              <label>Address</label>
              <div className="address-fields">
                <input type="text" value={tempProfileData.barangay} onChange={(e) => setTempProfileData({ ...tempProfileData, barangay: e.target.value })} className="barangay" />
                <input type="text" value={tempProfileData.province} onChange={(e) => setTempProfileData({ ...tempProfileData, province: e.target.value })} className="province" />
                <input type="text" value={tempProfileData.zip_code} onChange={(e) => setTempProfileData({ ...tempProfileData, zip_code: e.target.value })} className="zip-code" />
              </div>
              <input type="text" value={tempProfileData.city} onChange={(e) => setTempProfileData({ ...tempProfileData, city: e.target.value })} className="city" />
            </div>
            <div className="open-days-hours">
              <div className="profile-field">
                <label>Open Days</label>
                <div className="days-fields">
                  <select value={tempProfileData.open_day} onChange={(e) => setTempProfileData({ ...tempProfileData, open_day: e.target.value })}>
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <span> to </span>
                  <select value={tempProfileData.close_day} onChange={(e) => setTempProfileData({ ...tempProfileData, close_day: e.target.value })}>
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="profile-field">
                <label>Open Hours</label>
                <div className="hours-fields">
                  <select value={tempProfileData.open_time} onChange={(e) => setTempProfileData({ ...tempProfileData, open_time: e.target.value })}>
                    {hoursOfDay.map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                  <span> to </span>
                  <select value={tempProfileData.close_time} onChange={(e) => setTempProfileData({ ...tempProfileData, close_time: e.target.value })}>
                    {hoursOfDay.map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="services-offered">
              <h3>Services Offered:</h3>
              <div className="services-list">
                {servicesOffered.map(service => (
                  <div key={service} className="service-item">
                    <input
                      type="checkbox"
                      id={service}
                      checked={tempProfileData.services.split(', ').includes(service)}
                      onChange={() => handleServiceChange(service)}
                    />
                    <label htmlFor={service}>{service}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="profile-actions">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
