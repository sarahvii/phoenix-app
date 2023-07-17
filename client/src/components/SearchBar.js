import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import PortfolioContext from '../services/PortfolioContext';

const BASE_URL = 'https://finnhub.io/api/v1/stock/';
const API_TOKEN = 'cim0421r01qucvvrg00gcim0421r01qucvvrg010';

const SearchBar = ({ setSelectedStock }) => {
  const [symbol, setSymbol] = useState('');
  const [details, setDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStock, setSelectedStockInternal] = useState(null); // Must be internal.
  const navigate = useNavigate();
  const { setShouldRefresh } = useContext(PortfolioContext);


  const detail = async (symbol) => {
    try {
      const response = await fetch(`${BASE_URL}profile2?symbol=${symbol}&token=${API_TOKEN}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      return { error: 'Symbol not found' };
    }
  };

  const handleClick = async () => {
    try {
      const response = await detail(symbol);
      setDetails(response);
      console.log(response);
      setOpenModal(true);
    } catch (err) {
      console.log(err);
      setDetails({ error: 'symbol not found' });
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSymbol('');
  };

  const handleYesClick = () => {
    setSelectedStock(details.ticker); // Set the selected stock in the external state / MUST be details.ticker not selectedStock otherwise only renders on second attempt
    setOpenModal(false); 
    setShouldRefresh(true);
    navigate('/stocks'); 
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

export default SearchBar;




