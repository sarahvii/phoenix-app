import React from 'react';
import styled from 'styled-components';

const ConfirmationModal = ({ open, onClose, details, confirmAction, handleConfirm, handleCancel, fromBuyPanel}) => {
    console.log('Modal details:', details);
    if (!open) return null;


    const handleConfirmButtonClick = () => {
        confirmAction();
        handleConfirm(); // updates state and shows new stock details in modal
        onClose();
    };

    if (!details || !details.ticker) {
      return (
          <ModalOverlay>
              <ModalContainer>
                  <div className="content">
                      <h3>Ticker not found</h3>
                  </div>
                  <div className="buttonContainer">
                      <button className="buttonYes" onClick={handleConfirmButtonClick}>
                          <span className="bold">OK</span>
                      </button>
                  </div>
              </ModalContainer>
          </ModalOverlay>
      );
  }

    return (
        <ModalOverlay>
          <ModalContainer>
            <div  className="content">
            <img src={details.logo} alt={details.name} />
              <h2 data-testid="modal-name">{details.name}</h2>
              <p>{details.ticker}</p>
              {fromBuyPanel && details.shares !== null ? (
              <p>You have {details.orderType === 'buy' ? "bought" : "sold"} {details.shares} {details.shares === 1 ? "share" : "shares"} of {details.name} for ${details.currentPrice} per share.</p>
                ) : null}
            </div>
            <div className="buttonContainer">
              <button className="buttonYes" onClick={handleConfirmButtonClick}>
                <span className="bold">Continue</span>
              </button>
              {!fromBuyPanel && 
                <button className="buttonCancel" onClick={handleCancel}>
                  <span className="bold">Cancel</span>
                </button>
                 }
            </div>
          </ModalContainer>
        </ModalOverlay>
      );
    };

    const ModalOverlay = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    `;
    
    const ModalContainer = styled.div`
    background-color: rgba(130, 125, 121, 0.9);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 90%;
    z-index: 1001;
    
    h2 {
      font-size: 24px;
      margin-bottom: 10px;
      color: black;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
      color: black;
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
      background-color: rgb(179, 109, 39);
      color: #fff;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 10px;
      font-size: 16px;
    }
    `;

export default ConfirmationModal;
