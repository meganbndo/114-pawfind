import React, { useState } from 'react';
import './ClinicHistory.css';

const ClinicHistory = ({ patientId, history, searchQuery, onUpdateHistory }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [visitHistory, setVisitHistory] = useState(history);
  const [showModal, setShowModal] = useState(false);
  const [newPurpose, setNewPurpose] = useState('');
  const [newFiles, setNewFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleViewClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDeleteClick = (index) => {
    const updatedHistory = visitHistory.filter((_, i) => i !== index);
    setVisitHistory(updatedHistory);
    onUpdateHistory(updatedHistory);
  };

  const handleAddVisitClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewPurpose('');
    setNewFiles([]);
  };

  const handlePurposeChange = (event) => {
    setNewPurpose(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file), // Create URL for viewing
      thumbnail: file.type === 'application/pdf'
        ? 'src/components/pictures/PDF-icon.png' // Use a PDF icon for PDFs
        : URL.createObjectURL(file) // Create URL for image preview
    }));
    setNewFiles(validFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file), // Create URL for viewing
      thumbnail: file.type === 'application/pdf'
        ? 'src/components/pictures/PDF-icon.png' // Use a PDF icon for PDFs
        : URL.createObjectURL(file) // Create URL for image preview
    }));
    setNewFiles(validFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleAddVisit = async () => {
    if (newPurpose) {
      const newVisit = {
        purpose: newPurpose,
        date: new Date().toLocaleDateString(),
        files: newFiles.map(file => ({
          name: file.name,
          type: file.type,
          url: file.url,
          thumbnail: file.thumbnail
        })),
      };
      const updatedHistory = [...visitHistory, newVisit];
      setVisitHistory(updatedHistory);
      await onUpdateHistory(updatedHistory);
      handleModalClose();
    } else {
      alert('Please enter a purpose for the visit.');
    }
  };

  const handleAddFiles = (index) => {
    if (newFiles.length === 0) {
      alert('Please select files to add.');
      return;
    }
    const updatedHistory = [...visitHistory];
    updatedHistory[index].files = [...updatedHistory[index].files, ...newFiles];
    setVisitHistory(updatedHistory);
    onUpdateHistory(updatedHistory);
    setNewFiles([]);
  };

  const handleRemoveFile = (visitIndex, fileIndex) => {
    const updatedHistory = [...visitHistory];
    updatedHistory[visitIndex].files.splice(fileIndex, 1);
    setVisitHistory(updatedHistory);
    onUpdateHistory(updatedHistory);
  };

  const handleFileClick = (file) => {
    window.open(file.url, '_blank');
  };

  const filteredHistory = visitHistory.filter(entry =>
    entry.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="clinic-history">
      <div className="clinic-history-header">
        <h3 className="clinic-history-title">
          Clinic History
          <button className="add-visit-button" onClick={handleAddVisitClick}>Add Visit</button>
        </h3>
      </div>
      <div className="history">
        <table className="clinic-history-table">
          <thead>
            <tr>
              <th style={{ width: '60%' }}>Purpose of Visit</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Date</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((entry, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{entry.purpose}</td>
                  <td style={{ textAlign: 'center' }}>{entry.date}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="view-button" onClick={() => handleViewClick(index)}>
                      {expandedIndex === index ? 'Hide' : 'View'}
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteClick(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedIndex === index && (
                  <tr>
                    <td colSpan="3">
                      <div className="expanded-content">
                        <div className="file-grid">
                          {entry.files.map((file, fileIndex) => (
                            <div
                              className="file-item"
                              key={fileIndex}
                              onClick={() => handleFileClick(file)}
                              style={{ cursor: 'pointer' }}
                            >
                              <img src={file.thumbnail} alt={file.name} className="thumbnail-file" />
                              <div className="file-details">
                                <p className="file-name">{file.name}</p>
                                <button className="remove-button" onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFile(index, fileIndex);
                                }}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="add-files-section">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf, .jpg, .jpeg"
                            multiple
                          />
                          <button className="add-files-button" onClick={() => handleAddFiles(index)}>
                            Add Files
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add New Visit</h4>
              <button className="close-button" onClick={handleModalClose}>×</button>
            </div>
            <hr />
            <div className="modal-body">
              <label>
                Reason of Visit:
                <input type="text" value={newPurpose} onChange={handlePurposeChange} />
              </label>
              <div
                className={`upload-body ${dragActive ? 'drag-active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {newFiles.length > 0 ? (
                  <div className="file-grid">
                    {newFiles.map((file, index) => (
                      <div
                        className="file-item"
                        key={index}
                        onClick={() => handleFileClick(file)}
                        style={{ cursor: 'pointer' }}
                      >
                        <img src={file.thumbnail} alt={file.name} className="thumbnail-file" />
                        <div className="file-details">
                          <p className="file-name">{file.name}</p>
                          <button className="remove-button" onClick={(e) => {
                            e.stopPropagation();
                            setNewFiles(newFiles.filter((_, i) => i !== index));
                          }}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <img src="https://placeholder.pics/svg/38x30" alt="Upload Icon" className="upload-icon" />
                    <p>Drag and Drop files here or</p>
                    <label htmlFor="file-upload" className="upload-label">Browse Files</label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      accept=".pdf, .jpg, .jpeg"
                      multiple
                      style={{ display: 'none' }}
                    />
                  </div>
                )}
              </div>
              <p className="file-types">only accepts jpg, JPEG and PDF</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={handleModalClose}>Cancel</button>
              <button className="upload-button" onClick={handleAddVisit}>Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicHistory;
