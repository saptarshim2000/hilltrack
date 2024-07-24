import React from 'react';

const ImageUpload = ({ onFileChange }) => {
  return (
    <div className="image-upload">
      <label htmlFor="file-input" className="file-input-label">
        <img src="/path-to-camera-icon.png" alt="Upload" className="camera-icon" />
      </label>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        capture="environment"
        onChange={onFileChange}
        className="file-input"
      />
    </div>
  );
};

export default ImageUpload;
