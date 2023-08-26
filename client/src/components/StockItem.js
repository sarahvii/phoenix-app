import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import calculateProfitLoss from "../services/CalculateProfitOrLoss";
import {StockContext} from "../services/StockContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const StockItem = ({ stock, handleStockClick}) => {
  const [livePriceData, setLivePriceData] = useState(null);
  const [liveCompanyData, setLiveCompanyData] = useState(null);


  const { setCalculatedValsList } = useContext(StockContext);

  useEffect(() => {
    fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${process.env.REACT_APP_FINNHUB_API_TOKEN}`)
      .then((res) => res.json())
      .then((data) => setLivePriceData(data));
  }, [stock.ticker]);

  useEffect(() => {
    fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${stock.ticker}&token=${process.env.REACT_APP_FINNHUB_API_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => setLiveCompanyData(data));
  }, [stock.ticker]);

  useEffect(() => {
    if (livePriceData) {
      const calculatedVals = calculateProfitLoss(stock.orders, livePriceData.c);
      calculatedVals.ticker = stock.ticker;
  
      setCalculatedValsList((prevList) => {
        let updatedList = [...prevList];
        let foundMatches = false;
  
        updatedList = updatedList.map((item) => {
          if (item.ticker === stock.ticker) {
            foundMatches = true;
            return calculatedVals; // Replace existing data
          } else {
            return item;
          }
        });
  
        if (!foundMatches) {
          updatedList.push(calculatedVals); // Add new data
        }
  
        return updatedList;
      });
    }
  }, [livePriceData, stock.orders, stock.ticker, setCalculatedValsList]);


  if (!liveCompanyData || !livePriceData) {
    return "Loading...";
  }

  const { logo } = liveCompanyData;
  const { profitLoss, isProfit, totalShares, currentTotalValue } = calculateProfitLoss(stock.orders, livePriceData.c);


  return (
    <StyledLink to="/stocks">
      <StockListInternalContainer>
      <PortfolioDisplayContainer onClick={() => handleStockClick(stock.ticker)}>
        <CompanyInfo>
          <StockTicker>{stock.ticker}</StockTicker>
          <StockName>{liveCompanyData.name}</StockName>
          <StockCurrentPrice>${livePriceData.c}</StockCurrentPrice>
          <PriceChangePercent value={livePriceData.dp}>{livePriceData.dp !== undefined ? ` (${livePriceData.dp.toFixed(2)}%)` : ""}</PriceChangePercent>

        </CompanyInfo>
        <Logo src={logo} alt="company logo" />
        <PerformanceInfo>
          <StockTotalShares>{totalShares} Shares</StockTotalShares>
          <StockTotalValue>Total value: ${currentTotalValue.toFixed(2)}</StockTotalValue>
          <ProfitOrLoss isProfit={isProfit}>${Math.abs(profitLoss).toFixed(2)}</ProfitOrLoss>
        </PerformanceInfo>

      </PortfolioDisplayContainer>
      </StockListInternalContainer>
    </StyledLink>
  );
};


const Logo = styled.img`
  width: 10%;
  height: 10%;
  border-radius: 50%;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.1);
  }
`;


const PortfolioDisplayContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  padding: 20px;
  flex: 1;
  min-width: 15rem;
  width: 95%;  
  
  
  &:hover {
    background-color: #DFE1E6;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  }

  
  `;

  const StockListInternalContainer = styled.div`
  background-color: #DFE1E6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin: 10px 20px 0px 20px;
  padding: 1px 1px 1px 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
  `;
  
  const CompanyInfo = styled.div`
    width: 25%;
  `;
  
  const StockName = styled.h3`
    font-size: 20px;
  `;
  
  const StockTicker = styled.p`
    font-size: 15px;
  `;
  
  const StockTotalShares = styled.p`
    font-size: 15px;
  `;
  
  const StockCurrentPrice = styled.p`
    display: inline;
    font-size: 15px;
  `;
  
  const PriceChangePercent = styled.p`
    display: inline;
    color: ${props => (props.value > 0 ? 'green' : 'red')};
    font-size: 15px;
    font-weight: bold;
    `

  const StockTotalValue = styled.p``;
  
  
  const PerformanceInfo = styled.div`
    width: 25%;
  `;
  
  const ProfitOrLoss = styled.p`
    color: ${(props) => (props.isProfit ? "green" : "red")};
    font-size: 20px;
    font-weight: bold;
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
  `;




export default StockItem;



