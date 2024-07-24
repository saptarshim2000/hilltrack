import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step2.css';
import Background from '../components/HTLBG.png';  // Adjust the path to your background image
import Logo from '../components/Hill Track Logo.png';  // Adjust the path to your logo

const Step2 = ({ onNext }) => {
  const [numberOfParcels, setNumberOfParcels] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (numberOfParcels.trim() && file) {
      onNext(navigate, { numberOfParcels, file });
    }
  };

  return (
    <div className="step-page">
      <img src={Background} alt="Background Element" className="background-element" />
      <div className="content">
        <img src={Logo} alt="HillTrack by HDG" className="logo" />
        <div className="form-container">
          <h2>Enter Number of Packages</h2>
          <input
            type="number"
            placeholder="Number of Packages"
            value={numberOfParcels}
            onChange={e => setNumberOfParcels(e.target.value)}
          />
          <h2>Upload Image</h2>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="file-input"
          />
          <div className="button-container">
            <button onClick={() => navigate('/step1')}>Prev</button>
            <button onClick={handleSubmit}>Next</button>
          </div>
        </div>
        <p className="footer">Designed with ❤️ by HDG Technical Team</p>
      </div>
    </div>
  );
};

export default Step2;
