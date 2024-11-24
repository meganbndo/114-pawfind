// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './RegisterForm.css';

function RegisterForm() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [selectedServices, setSelectedServices] = useState({});
  const [clinicName, setClinicName] = useState('');
  const [openingDays, setOpeningDays] = useState({ start: '', end: '' });
  const [openingHours, setOpeningHours] = useState({ open: '', close: '' });
  const [address, setAddress] = useState({
    barangay: '',
    city: '',
    province: '',
    zip: ''
  });

  const services = [
    'General Check-Up and Wellness Exams',
    'Emergency and Critical Care',
    'Rehabilitation and Physical Therapy',
    'Vaccination and Preventive Care',
    'Pet Nutrition Counseling',
    'End-of-Life Care and Euthanasia',
    'Diagnostics and Imaging',
    'Geriatric (Senior) Pet Care',
    'Ophthalmology',
    'Surgery',
    'Behavioral Counseling',
    'Oncology',
    'Dental Care',
    'Pet Boarding and Daycare',
    'Cardiology',
    'Orthopedic Services',
    'Reproductive and Breeding Services',
    'Acupuncture and Alternative Therapies'
  ];

  const times = [
    '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM',
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
  ];

  const handleNext = () => {
    const formData = {
      clinicName,
      openingDays,
      openingHours,
      address,
      selectedServices: Object.keys(selectedServices).filter(service => selectedServices[service])
    };

    console.log('Submitting form data:', formData);

    // Validate form data before sending
    if (!clinicName || !openingDays.start || !openingDays.end || !openingHours.open || !openingHours.close || !address.barangay || !address.city || !address.province || !address.zip) {
      alert('Please fill out all fields.');
      return;
    }

    // POST request to save formData to the JSON server
    fetch('http://localhost:3000/clinics', { // Assuming the endpoint is /clinics
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      navigate('/document-upload'); // Navigate to the DocumentUpload page
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="clinic-signup">
      <h1>Continue Signing Up</h1>
      
      <div className="form-container">
        <div className="clinic-name-container">
          <input 
            type="text" 
            className="clinic-name-input" 
            placeholder="Clinic Name" 
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
          />
        </div>
        
        <div className="hours-container">  
          <div className="opening-days-selector">
            <span>Opening Days</span>
            <select 
              className="dropdown" 
              value={openingDays.start} 
              onChange={(e) => setOpeningDays({ ...openingDays, start: e.target.value })}
            >
              <option>Select</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
            <select 
              className="dropdown" 
              value={openingDays.end} 
              onChange={(e) => setOpeningDays({ ...openingDays, end: e.target.value })}
            >
              <option>Select</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>
          <div className="opening-hours-selector">
            <span>Opening Hours</span>
            <select 
              className="dropdown" 
              value={openingHours.open} 
              onChange={(e) => setOpeningHours({ ...openingHours, open: e.target.value })}
            >
              <option>Open</option>
              {times.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
            <select 
              className="dropdown" 
              value={openingHours.close} 
              onChange={(e) => setOpeningHours({ ...openingHours, close: e.target.value })}
            >
              <option>Close</option>
              {times.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="address-section">
          <h2>Address:</h2>
          <div className="address-inputs">
            <input 
              type="text" 
              placeholder="Barangay" 
              className="barangay-input" 
              value={address.barangay}
              onChange={(e) => setAddress({ ...address, barangay: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Municipality / City" 
              className="city-input" 
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Province" 
              className="province-input" 
              value={address.province}
              onChange={(e) => setAddress({ ...address, province: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Zip Code" 
              className="zip-input" 
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            />
          </div>
        </div>

        <div className="services-section">
          <h2>Services Offered:</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <input
                  type="checkbox"
                  id={`service-${index}`}
                  checked={selectedServices[service] || false}
                  onChange={(e) => setSelectedServices({
                    ...selectedServices,
                    [service]: e.target.checked
                  })}
                />
                <label htmlFor={`service-${index}`}>{service}</label>
              </div>
            ))}
          </div>
        </div>

        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default RegisterForm;
