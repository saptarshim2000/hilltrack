import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import './Step4.css';
import Background from '../components/HTLBG.png';  // Adjust the path to your background image
import Logo from '../components/HillTrackLogo.png';  // Adjust the path to your logo

const Step4 = ({ onSubmit }) => {
  const sigCanvas = useRef({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    const data = { signatures: signatureData };
    onSubmit(data, navigate);
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);

  return (
    <div className="step-page">
      <img src={Background} alt="Background Element" className="background-element" />
      <div className="content">
        <img src={Logo} alt="HillTrack by HDG" className="logo" />
        <div className="form-container">
          <h2>Signature</h2>
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{ width: 400, height: 200, className: 'signature-canvas' }}
          />
          <div className="button-container">
            <button onClick={() => navigate('/step3')}>Prev</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {submitted && <p>Vehicle Details Submitted Successfully</p>}
        </div>
        <p className="footer">Designed with ❤️ by HDG Technical Team</p>
      </div>
    </div>
  );
};

export default Step4;
