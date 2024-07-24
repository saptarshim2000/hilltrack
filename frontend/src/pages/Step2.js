import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step2.css';
import Background from '../components/HTLBG.png';  // Adjust the path to your background image
import Logo from '../components/Hill Track Logo.png';  // Adjust the path to your logo

const Step2 = ({ onNext }) => {
  const [numberOfParcels, setNumberOfParcels] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (numberOfParcels.trim()) {
      onNext(navigate, { numberOfParcels });
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
