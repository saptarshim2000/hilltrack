import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import background from '../components/HTLBG.png'; // Ensure the path to your background image is correct
import logo from '../components/Hill Track Logo.png'; // Ensure the path to your logo image is correct

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="background-wrapper">
        <img src={background} alt="Background" className="background" />
      </div>
      <div className="content">
        <Link to="/" className="logo-link animated fadeInDown">
          <img src={logo} alt="HillTrack by HDG" className="logo" />
        </Link>
        <h1 className="title animated fadeInUp">Let's Get Started!</h1>
        <div className="buttons animated fadeInUp">
          <Link to="/admin-login" className="btn">Login</Link>
          <Link to="/welcome" className="btn">Upload</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
