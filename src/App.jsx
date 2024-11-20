// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/RegisterForm';
import DocumentUpload from './components/DocumentUpload';
import Appointments from './components/Appointments';
import Patients from './components/Patients'; // Import the Patients component

function App() {
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            showDocumentUpload ? (
              <DocumentUpload onBack={() => setShowDocumentUpload(false)} />
            ) : (
              <RegisterForm onNext={() => setShowDocumentUpload(true)} />
            )
          } />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} /> {/* Ensure this route is defined */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
