import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import PortfolioContext from '../services/PortfolioContext';

const BASE_URL = 'https://finnhub.io/api/v1/stock/';

export default function SearchBar({ setSelectedStock }) {
  const [symbol, setSymbol] = useState('');
  const [details, setDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStock, setSelectedStockInternal] = useState(null); // Rename the state variable to selectedStock
  const navigate = useNavigate();
  const { setShouldRefresh } = useContext(PortfolioContext);

  const detail = (symbol) => {
    return fetch(`${BASE_URL}profile2?symbol=${symbol}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`).then((res) => res.json());
  };

  const handleClick = async () => {
    try {
      const response = await detail(symbol);
      console.log(response);
      setDetails(response);
      setOpenModal(true);
    } catch (err) {
      console.log(err);
      setDetails({ error: 'symbol not found' });
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSymbol(''); // Clear the symbol input when the modal is closed
  };

  const handleYesClick = () => {
    setSelectedStock(details.ticker); // Set the selected stock in the external state
    setOpenModal(false); // Close the modal after clicking "Yes"
    setShouldRefresh(true);
    navigate('/stocks'); // Navigate to '/stocks' when the "Yes" button is clicked
  };

  return (
    <div className="SearchBar">
      <p>Search for a stock</p>
      <input value={symbol} onChange={(evt) => setSymbol(evt.target.value)} />
      <button className="searchButton" onClick={handleClick}>Search</button>
      <Modal open={openModal} onClose={handleModalClose} details={details} handleYesClick={handleYesClick} setSelectedStock={setSelectedStockInternal} /> {/* Pass details, handleYesClick, and setSelectedStock to the Modal */}
    </div>
  );
}




