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
      {details && Object.keys(details).length > 0 ? ( // If returned object is empty symbol not found is rendered
          <div className="content">
            {!details.error ? (
              <>
                <h2>{details.name}</h2>
                <p>{details.ticker}</p>
                <img src={details.logo} alt={details.name} />
              </>
            ) : (
              <h1>{details.error}</h1>
            )}
          </div>
        ) : (
          <div className="content">
            <p>Symbol not found</p>
          </div>
        )}
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
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
`;

const ModalContainer = styled.div`
background-color: #fff;
padding: 20px;
border-radius: 8px;
box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.2);
max-width: 400px;
width: 90%;

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 4px;
}

.buttonContainer {
  display: flex;
  justify-content: flex-end;
}

button {
  background-color: #007BFF;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 16px;
}
`;

export default Modal;



