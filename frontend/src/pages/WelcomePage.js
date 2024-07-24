import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import Logo from '../components/Hill Track Logo.png';  // Adjust the path to your logo
import Background from '../components/HTLBG.png';  // Adjust the path to your background image

const WelcomePage = ({ onNext }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    onNext(navigate, { firstName, lastName, contactNumber });
  };

  return (
    <div className="welcome-page">
      <img src={Background} alt="Background Element" className="background-element" />
      <div className="content">
        <img src={Logo} alt="HillTrack by HDG" className="logo" />
        <div className="form-container">
          <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          <input type="text" placeholder="Contact Number" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
          <div className="button-container">
            <button onClick={() => navigate('/')}>Prev</button>
            <button onClick={handleSubmit}>Next</button>
          </div>
        </div>
        <p className="footer">Designed with ❤️ by HDG Technical Team</p>
      </div>
    </div>
  );
};

export default WelcomePage;
