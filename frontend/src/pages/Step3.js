import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step3.css';
import Background from '../components/HTLBG.png';  // Adjust the path to your background image
import Logo from '../components/Hill Track Logo.png';  // Adjust the path to your logo

const Step3 = ({ onNext }) => {
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (notes.trim()) {
      onNext(navigate, { notes });
    }
  };

  return (
    <div className="step-page">
      <img src={Background} alt="Background Element" className="background-element" />
      <div className="content">
        <img src={Logo} alt="HillTrack by HDG" className="logo" />
        <div className="form-container">
          <h2>Additional Notes</h2>
          <textarea
            placeholder="Enter additional notes here..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          ></textarea>
          <div className="button-container">
            <button onClick={() => navigate('/step2')}>Prev</button>
            <button onClick={handleSubmit}>Next</button>
          </div>
        </div>
        <p className="footer">Designed with ❤️ by HDG Technical Team</p>
      </div>
    </div>
  );
};

export default Step3;
