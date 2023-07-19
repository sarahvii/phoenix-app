import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import styled from 'styled-components';
import PortfolioContext from '../services/PortfolioContext';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <SearchBarContainer className="SearchBar">
      <input value={symbol} onChange={(evt) => setSymbol(evt.target.value)} />
      <Button className="searchButton" onClick={handleClick}>
        <StyledIcon icon={faMagnifyingGlass} />
      </Button>
      <Modal open={openModal} onClose={handleModalClose} details={details} handleYesClick={handleYesClick} setSelectedStock={setSelectedStockInternal} /> {/* Pass details, handleYesClick, and setSelectedStock to the Modal */}
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  height: 40px;
  width: 40px;
  margin: 10px;

  &:hover {
    color: purple;
  }
`

export default SearchBar;




