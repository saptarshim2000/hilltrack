import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step2.css';
import Background from '../components/HTLBG.png';
import Logo from '../components/Hill Track Logo.png';

const Step2 = ({ onNext }) => {
  const [numberOfParcels, setNumberOfParcels] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (numberOfParcels.trim() && image) {
      onNext(navigate, { numberOfParcels, image });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="step-page">
      <img src={Background} alt="Background Element" className="background-element" />
      <div className="content">
        <img src={Logo} alt="HillTrack by HDG" className="logo" />
        <div className="form-container">
          <h2>Enter Number of Packages and Upload an Image</h2>
          <input
            type="number"
            placeholder="Number of Packages"
            value={numberOfParcels}
            onChange={e => setNumberOfParcels(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
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
