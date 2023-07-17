import React from 'react';
import styled from 'styled-components';

const Modal = ({ open, onClose, details, handleYesClick, setSelectedStock }) => {


  const handleYesButtonClick = () => {
    setSelectedStock(details.ticker); // Set the selected stock in the internal state
    handleYesClick(); // Call the handleYesClick function from SearchBar
  };

  if (!open) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <div className="content">
          {details && !details.error ? (
            <div>
              <h2>{details.name}</h2>
              <p>{details.ticker}</p>
              <img src={details.logo} alt={details.name} />
            </div>
          ) : (
            <h1>{details.error}</h1>
          )}
        </div>
        <div className="buttonContainer">
          <button className="buttonYes" onClick={handleYesButtonClick}>
            <span className="bold">Yes</span>
          </button>
          <button className="buttonCancel" onClick={onClose}>
            <span className="bold">Cancel</span>
          </button>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
`;
const ModalContainer = styled.div`
  max-width: 600px;
  width: 100%;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
`;

export default Modal;



