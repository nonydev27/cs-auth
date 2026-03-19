import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    group: '',
    gender: '',
    contact: '',
    email: '',
    referenceNumber: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef(null);
  const [excelData, setExcelData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(jsonData);
        alert('Excel file loaded successfully!');
      } catch (error) {
        console.error('Error reading Excel file:', error);
        alert('Error reading Excel file. Please ensure it is a valid .xlsx or .xls file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const validateReference = () => {
    if (!excelData || excelData.length === 0) {
      return { valid: false, message: 'Please upload the Excel file first!' };
    }

    // Look for reference number in Excel data
    // Assuming the column might be named "Reference" or "Reference Number" or similar
    const found = excelData.find(row => {
      const refValue = row['Reference Number'] || row['Reference'] || row['reference'] || row['ReferenceNumber'];
      return String(refValue).trim() === String(formData.referenceNumber).trim();
    });

    if (found) {
      // Assign WhatsApp group based on group selection
      const group1Link = 'https://chat.whatsapp.com/group1'; // Replace with actual link
      const group2Link = 'https://chat.whatsapp.com/group2'; // Replace with actual link
      
      return {
        valid: true,
        link: formData.group === '1' ? group1Link : group2Link
      };
    }

    return { valid: false, message: 'Information not found!' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Simulate processing delay
    setTimeout(() => {
      const result = validateReference();
      
      if (result.valid) {
        setWhatsappLink(result.link);
        setStatus('success');
        setShowSuccessModal(true);
      } else {
        setStatus('error');
        setErrorMessage(result.message);
      }
    }, 1500);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setFormData({
      name: '',
      group: '',
      gender: '',
      contact: '',
      email: '',
      referenceNumber: ''
    });
    setStatus('idle');
  };

  return (
    <div className="app-container">
      <div className="background-effects">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <header className="header">
        <div className="logo-container">
          <div className="logo-icon">⚛</div>
          <h1>COMPUTER SCIENCE</h1>
          <h2>2028 AUTH</h2>
        </div>
        <p className="tagline">Verify your identity to join your group</p>
      </header>

      <main className="main-content">
        <div className="auth-card">
          <div className="card-header">
            <div className="header-accent"></div>
            <h3>Student Authentication</h3>
          </div>

          <div className="excel-upload-section">
            <label className="upload-label">
              <span>📋 Upload Excel File (Required)</span>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="file-input"
              />
            </label>
            {excelData && (
              <div className="file-status">
                ✓ Excel loaded ({excelData.length} records)
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="group">
                  <span className="label-icon">👥</span>
                  Group
                </label>
                <select
                  id="group"
                  name="group"
                  value={formData.group}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Group</option>
                  <option value="1">Group 1</option>
                  <option value="2">Group 2</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="gender">
                  <span className="label-icon">⚧</span>
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact">
                <span className="label-icon">📱</span>
                Contact Number
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <span className="label-icon">✉️</span>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="referenceNumber">
                <span className="label-icon">🔢</span>
                Reference Number
              </label>
              <input
                type="text"
                id="referenceNumber"
                name="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleInputChange}
                placeholder="Enter your reference number"
                required
                className="form-input reference-input"
              />
            </div>

            {status === 'error' && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className={`submit-btn ${status === 'loading' ? 'loading' : ''}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="loading-content">
                  <span className="spinner"></span>
                  Verifying...
                </span>
              ) : (
                <>
                  <span className="btn-icon">🔓</span>
                  Verify & Proceed
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {showSuccessModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content success-modal" onClick={e => e.stopPropagation()}>
            <div className="success-icon">🎉</div>
            <h2>Verification Successful!</h2>
            <p>Welcome, <strong>{formData.name}</strong>!</p>
            <p className="group-info">
              You have been assigned to <strong>Group {formData.group}</strong>
            </p>
            
            <div className="whatsapp-section">
              <p>Click below to join your WhatsApp group:</p>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                <span>💬</span>
                Join WhatsApp Group
              </a>
            </div>

            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2026 Computer Science 2028 • All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
