import React, { useState } from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleDetectClick = () => {
    if (!document.getElementById('imageInput').value) {
      setErrorMessage('Please upload an image.');
    } else {
      setErrorMessage('');
      onButtonSubmit();
    }
  };

  return (
    <div>
      <p className="f3">{'This magic brain will detect faces in your images. Give it a try.'}</p>
      {errorMessage && <p className="error-message red f6">{errorMessage}</p>}
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            id="imageInput"
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={handleDetectClick}
          >
            Detect
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ImageLinkForm;
