import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './DocumentUpload.css';

function DocumentUpload({ onBack }) {
  const navigate = useNavigate(); // Initialize the navigate function
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState({
    'DTI Registration of your Clinic': [],
    'Medical Practitioner’s ID': []
  });
  const [dragActive, setDragActive] = useState(false);
  const [submittedDocuments, setSubmittedDocuments] = useState({
    'DTI Registration of your Clinic': false,
    'Medical Practitioner’s ID': false
  });
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const MAX_FILES = 5;

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setShowUploadPopup(true);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const currentFiles = uploadedDocuments[selectedDocument];
    
    if (currentFiles.length + files.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files for ${selectedDocument}.`);
      return;
    }

    const newFiles = files.filter(file => file.type === 'application/pdf' || file.type === 'image/jpeg')
                          .map(file => ({
                            name: file.name,
                            url: file.type === 'application/pdf'
                              ? 'src/components/pictures/PDF-icon.png'
                              : URL.createObjectURL(file)
                          }));

    if (newFiles.length !== files.length) {
      alert('Please upload only PDF or JPG files.');
    }

    setUploadedDocuments(prevState => ({
      ...prevState,
      [selectedDocument]: [...prevState[selectedDocument], ...newFiles]
    }));
  };

  const handleFileUpload = () => {
    if (uploadedDocuments[selectedDocument].length === 0) {
      alert(`Please upload files for ${selectedDocument}.`);
      return;
    }
    setSubmittedDocuments(prevState => ({
      ...prevState,
      [selectedDocument]: true
    }));
    setShowUploadPopup(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const files = Array.from(event.dataTransfer.files);
    const currentFiles = uploadedDocuments[selectedDocument];

    if (currentFiles.length + files.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files for ${selectedDocument}.`);
      return;
    }

    const newFiles = files.filter(file => file.type === 'application/pdf' || file.type === 'image/jpeg')
                          .map(file => ({
                            name: file.name,
                            url: file.type === 'application/pdf'
                              ? 'src/components/pictures/PDF-icon.png'
                              : URL.createObjectURL(file)
                          }));

    if (newFiles.length !== files.length) {
      alert('Please upload only PDF or JPG files.');
    }

    setUploadedDocuments(prevState => ({
      ...prevState,
      [selectedDocument]: [...prevState[selectedDocument], ...newFiles]
    }));
  };

  const handleRemoveFile = (fileName) => {
    setUploadedDocuments(prevState => ({
      ...prevState,
      [selectedDocument]: prevState[selectedDocument].filter(file => file.name !== fileName)
    }));
  };

  const handleGeneralSubmit = () => {
    if (!submittedDocuments['DTI Registration of your Clinic'] || !submittedDocuments['Medical Practitioner’s ID']) {
      alert('Please submit all required documents.');
      return;
    }
    setShowConfirmationPopup(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmationPopup(false);
    setShowSuccessPopup(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessPopup(false);
    navigate('/appointments'); // Navigate to the Appointments page
  };

  return (
    <div className="document-upload">
      <div className="verification-box">
        <h1>Verification</h1>
        <p>Please upload the following documents:</p>
        <div className="document-list">
          <div className="document-item" onClick={() => handleDocumentClick('DTI Registration of your Clinic')}>
            <span>DTI Registration of your Clinic</span>
            {submittedDocuments['DTI Registration of your Clinic'] && <span className="checkmark">✔</span>}
          </div>
          <div className="document-item" onClick={() => handleDocumentClick('Medical Practitioner’s ID')}>
            <span>Medical Practitioner’s ID</span>
            {submittedDocuments['Medical Practitioner’s ID'] && <span className="checkmark">✔</span>}
          </div>
        </div>
        <button className="submit-button" onClick={handleGeneralSubmit}>Submit</button>
        <button className="back-button" onClick={onBack}>Back</button>
      </div>
      {showUploadPopup && (
        <div className="upload-popup">
          <div className="upload-header">
            <h2>{selectedDocument}</h2>
            <button className="close-button" onClick={() => setShowUploadPopup(false)}>X</button>
          </div>
          <div 
            className={`upload-body ${dragActive ? 'drag-active' : ''}`} 
            onDragOver={handleDragOver} 
            onDragLeave={handleDragLeave} 
            onDrop={handleDrop}
          >
            {uploadedDocuments[selectedDocument].length > 0 ? (
              <div className="file-grid">
                {uploadedDocuments[selectedDocument].map(({ name, url }) => (
                  <div className="file-item" key={name}>
                    <img src={url} alt={name} className="thumbnail" />
                    <p className="file-name">{name}</p>
                    <button className="remove-button" onClick={() => handleRemoveFile(name)}>Remove</button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <img src="src/components/pictures/Upload-PNG.png" alt="Upload Icon" className="upload-icon" />
                <p className="small">(only accepts .jpg and .pdf format)</p>
                <p>Drag and Drop files here or</p>
                <label htmlFor="file-upload" className="upload-label">Browse Files</label>
                <input type="file" id="file-upload" onChange={handleFileChange} accept=".pdf, .jpg, .jpeg" multiple style={{ display: 'none' }} />
              </>
            )}
          </div>
          <button onClick={handleFileUpload} className="submit-upload-button">Submit</button>
        </div>
      )}
      {showConfirmationPopup && (
        <div className="overlay">
          <div className="popup">
            <h2>Confirmation</h2>
            <p>Are you sure you want to submit all documents?</p>
            <button onClick={handleConfirmSubmit}>Yes</button>
            <button onClick={() => setShowConfirmationPopup(false)}>No</button>
          </div>
        </div>
      )}
      {showSuccessPopup && (
        <div className="overlay">
          <div className="popup">
            <img src="src/components/pictures/Checkmark-circle-blue.png" alt="Check" width="250" height="250" />
            <h2>Successfully Uploaded!</h2>
            <p>We’ll email you after we check your documents and confirm your sign up.</p>
            <button onClick={handleCloseSuccess}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentUpload;
