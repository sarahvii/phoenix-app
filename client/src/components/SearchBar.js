import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import styled from 'styled-components';
import PortfolioContext from '../services/PortfolioContext';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BASE_URL = 'https://finnhub.io/api/v1/stock/';

const SearchBar = ({ setSelectedStock }) => {
  const [symbol, setSymbol] = useState('');
  const [details, setDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStock, setSelectedStockInternal] = useState(null); // Must be internal.
  const navigate = useNavigate();
  const { setShouldRefresh } = useContext(PortfolioContext);


  const detail = async (symbol) => {
    try {
      const response = await fetch(`${BASE_URL}profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_TOKEN}`);
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

  // const handleModalClose = () => {
  //   setOpenModal(false);
  //   setSymbol('');
  // };

  // const handleYesClick = () => {
  //   setSelectedStock(details.ticker); // Set the selected stock in the external state / MUST be details.ticker not selectedStock otherwise only renders on second attempt
  //   setOpenModal(false); 
  //   setShouldRefresh(true);
  //   navigate('/stocks'); 
  // };

  const handleModalConfirm = () => {
    setSelectedStock(details.ticker);
    setShouldRefresh(true);
    navigate('/stocks');
    setOpenModal(false);
    setSymbol('');
  };

  const handleModalCancel = () => {
    setOpenModal(false);
    setSymbol('');
  };

  return (
    <>
      <BigSearchBarContainer>
        <SearchBarContainer className="SearchBar">
          <Input data-testid="search-input" value={symbol} onChange={(evt) => setSymbol(evt.target.value)} />
          <Button data-testid="search-button" className="searchButton" onClick={handleClick}>
            <StyledIcon icon={faMagnifyingGlass} />
          </Button>
          <ConfirmationModal 
          open={openModal} 
          onClose={handleModalCancel} 
          details={details} 
          confirmAction={() => setSelectedStockInternal(details.ticker)} handleConfirm={handleModalConfirm} handleCancel={handleModalCancel}
          fromBuyPanel={false} />
        </SearchBarContainer>
        <SearchLabel>Search for a stock by ticker symbol (e.g. AAPL)</SearchLabel>
      </BigSearchBarContainer>
    </>
  );
}

const BigSearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchLabel = styled.p`
  color: white;
  font-size: 12px;
  margin-right: 35px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;

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
  margin-left: 10px;

  &:hover {
    color: #00b4d8;
  }
`

const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid white;
  transition-duration: 0.4s;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
  }
`;

export default SearchBar;




