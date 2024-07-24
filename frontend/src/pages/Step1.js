import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faCamera } from '@fortawesome/free-solid-svg-icons';
import './Step1.css';
import logo from '../components/Hill Track Logo.png'; // Update this path to your actual logo path
import backgroundImage from '../components/HTLBG.png'; // Update this path to your actual background image path

const Step1 = ({ onNext }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [fileName, setFileName] = useState('No file chosen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setLoading(true);
      setError('');
      Tesseract.recognize(
        file,
        'eng',
        {
          logger: m => console.log(m) // Log progress for debugging
        }
      ).then(({ data: { text } }) => {
        setVehicleNumber(text.trim());
        setLoading(false);
      }).catch(err => {
        setError('Failed to process image. Please try again.');
        setLoading(false);
      });
    }
  };

  const handleSnap = async () => {
    try {
      console.log('Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera stream obtained:', stream);
      streamRef.current = stream;
      setIsCameraOpen(true);
    } catch (err) {
      console.error('Error accessing camera: ', err);
      setError('Failed to access camera. Please check camera permissions.');
    }
  };

  useEffect(() => {
    if (isCameraOpen && videoRef.current) {
      console.log('Setting video srcObject');
      videoRef.current.srcObject = streamRef.current;

      const interval = setInterval(async () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert to grayscale
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg; // Red
          data[i + 1] = avg; // Green
          data[i + 2] = avg; // Blue
        }
        context.putImageData(imageData, 0, 0);

        // Apply slight sharpening
        context.filter = 'contrast(150%)';
        context.drawImage(canvas, 0, 0);

        // Convert canvas to data URL
        const dataURL = canvas.toDataURL('image/png');

        // Use Tesseract to recognize text
        const { data: { text } } = await Tesseract.recognize(dataURL, 'eng', {
          logger: m => console.log(m), // Log progress for debugging
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '
        });

        console.log('Text recognized: ', text);
        if (text.trim()) {
          setVehicleNumber(text.trim());
          clearInterval(interval);
          streamRef.current.getTracks().forEach(track => track.stop());
          setIsCameraOpen(false);
        }
      }, 1000);
    }
  }, [isCameraOpen]);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      // Clean up camera stream on component unmount
      if (video && video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleSubmit = () => {
    if (vehicleNumber.trim()) {
      onNext(navigate, { vehicleNumber });
    } else {
      setError('Please provide a vehicle number.');
    }
  };

  return (
    <div className="step-page">
      <img src={backgroundImage} alt="Background" className="background-element" />
      <div className="content">
        <img src={logo} alt="HillTrack by HDG" className="logo" />
        <div className="form-container">
          <h2>Upload or Enter Number Plate</h2>
          <div className="file-upload-container">
            <label className="custom-file-upload">
              <FontAwesomeIcon icon={faFile} />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </label>
            <button className="snap-button" onClick={handleSnap}>
              <FontAwesomeIcon icon={faCamera} />
            </button>
            <span className="file-name">{fileName}</span>
          </div>
          {loading && <p>Processing image, please wait...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input type="text" placeholder="Number Plate" value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} />
          <div className="button-container">
            <button onClick={() => navigate('/welcome')}>Prev</button>
            <button onClick={handleSubmit}>Next</button>
          </div>
        </div>
        <div className="footer">Designed with ❤️ by HDG Technical Team</div>
      </div>
      {isCameraOpen && (
        <div className="camera-modal">
          <video ref={videoRef} autoPlay playsInline />
        </div>
      )}
    </div>
  );
};

export default Step1;
