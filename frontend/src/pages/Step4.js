import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step4.css';
import Background from '../components/HTLBG.png';  // Adjust the path to your background image
import Logo from '../components/Hill Track Logo.png';  // Adjust the path to your logo

const Step4 = ({ onSubmit }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseDown = (e) => {
      isDrawing.current = true;
      [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
    };

    const handleMouseMove = (e) => {
      if (!isDrawing.current) return;
      ctx.beginPath();
      ctx.moveTo(lastX.current, lastY.current);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseout', handleMouseUp);
    };
  }, []);

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL();
    const data = { signatures: signatureData };
    console.log('Submitting data:', data);
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
          <canvas ref={canvasRef} width="400" height="200" className="signature-canvas"></canvas>
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
