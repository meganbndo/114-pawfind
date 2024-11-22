import React, { useState } from 'react';
import './RegisterForm.css';

function RegisterForm({ onNext }) {
  const [selectedServices, setSelectedServices] = useState({});

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

  return (
    <div className="clinic-signup">
      <h1>Continue Signing Up</h1>
      
      <div className="form-container">
        <div className="clinic-name-container">
          <input 
            type="text" 
            className="clinic-name-input" 
            placeholder="Clinic Name" 
          />
        </div>
        
        <div className="hours-container">  
          <div className="opening-days-selector">
            <span>Opening Days</span>
            <select className="dropdown">
              <option>Select</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
            <select className="dropdown">
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
            <select className="dropdown">
              <option>Open</option>
              {times.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
            <select className="dropdown">
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
            <input type="text" placeholder="Barangay" className="barangay-input" />
            <input type="text" placeholder="Municipality / City" className="city-input" />
            <input type="text" placeholder="Province" className="province-input" />
            <input type="text" placeholder="Zip Code" className="zip-input" />
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

        <button className="next-button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

export default RegisterForm;
