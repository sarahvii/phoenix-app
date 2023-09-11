import { addBusinessDays } from 'date-fns';
import React, { useState, useContext } from 'react';
import PortfolioContext from '../services/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ConfirmationModal from './ConfirmationModal';

const BuyPanel = ({ currentPrice, stockName, stockTicker, logo }) => {
  const [shares, setShares] = useState(0);
  const { setPortfolioData, setShouldRefresh, shouldRefresh } = useContext(PortfolioContext); //added
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [orderType, setOrderType] = useState(null);

  const handleSharesChange = (event) => {
    setShares(Number(event.target.value));
  };

  const handleStockTrade = async (event, type) => {
    event.preventDefault();
    const action = type === 'buy' ? 'buying' : 'selling';
    console.log(action, stockName);
    // console.log('shares', shares);
    // console.log('currentPrice', currentPrice);
    // console.log('stockName', stockName);
    // console.log('stockTicker', stockTicker);
    console.log(stockName)
    setOpenModal(true);
    setOrderType(type);

    const order = {
      sharesQuantity: parseInt(shares),
      date: new Date().toISOString().slice(0, 10),
      pricePerShare: currentPrice,
      type: type,
    };

    const data = {
      stockName: stockName,
      ticker: stockTicker,
      order: order,
    };

    try {
      const response = await fetch('http://localhost:9000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Sucessful order:",  data);
        setPortfolioData(data); // added



        if (shouldRefresh) {
          setShouldRefresh(false); // toggle off shouldRefresh
        } else {
          setShouldRefresh(true); // toggle on shouldRefresh
        }




        // Add any success handling here
      } else {
        console.error('Failed to', action, stockName);
        // Add any error handling here
      }
    } catch (error) {
      console.error('Error while', action, 'stock:', error);
      // Add any error handling here
    }
  };

  const minusIcon = <FontAwesomeIcon icon={faMinus} style={{color: "#f2020e",}} />
  const plusIcon = <FontAwesomeIcon icon={faPlus} style={{color: "#2df505",}} />

  const handleModalConfirm = () => {
    handleModalClose();
    setShouldRefresh(true);
    navigate('/portfolio');
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };



  return (
    <>
    <StyledPanel>
      <form id="buy_form">
        <label>
          <Input
            type="number"
            placeholder="0"
            name="shares"
            value={shares}
            onChange={handleSharesChange}
          />

        </label>

        <Button type="submit" onClick={(e) => handleStockTrade(e, 'buy')}>
          Buy Shares {plusIcon}
        </Button>
        <Button type="submit" onClick={(e) => handleStockTrade(e, 'sell')}>
          Sell Shares {minusIcon}
        </Button>
      </form>
      </StyledPanel>
      
      <ConfirmationModal 
      open={openModal} 
      onClose={handleModalClose}
      details={{name: stockName, ticker: stockTicker, shares: shares, logo: logo, currentPrice: currentPrice, orderType: orderType}}
      confirmAction={handleModalConfirm}
      handleConfirm={handleModalConfirm}
      handleCancel={handleModalClose}
      fromBuyPanel={true} />
    </>
  );
};

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  background-color: rgb(255, 255, 255, 0.0);
  color: black;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  border-radius: 5px;
  border: 2px solid black;
  transition-duration: 0.4s;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
  }
`;

const Input = styled.input`
  background-color: rgb(255, 255, 255, 0.0);
  color: black;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  border-radius: 5px;
  border: 2px solid black;
  transition-duration: 0.4s;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
  }
`;

export default BuyPanel;


