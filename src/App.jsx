// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/RegisterForm';
import DocumentUpload from './components/DocumentUpload';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<RegisterForm />} />
          <Route path="/document-upload" element={<DocumentUpload />} /> */}
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
