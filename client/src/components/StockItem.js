import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import calculateProfitLoss from "../services/CalculateProfitOrLoss";
import {StockContext} from "../services/StockContext";
import { Link } from "react-router-dom";


const StockItem = ({ stock, handleStockClick, handleCalculatedValues }) => {
  const [livePriceData, setLivePriceData] = useState(null);
  const [liveCompanyData, setLiveCompanyData] = useState(null);

  const { setCalculatedValsList } = useContext(StockContext);

  useEffect(() => {
    fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`)
      .then((res) => res.json())
      .then((data) => setLivePriceData(data));
  }, [stock.ticker]);

  useEffect(() => {
    fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${stock.ticker}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
    )
      .then((res) => res.json())
      .then((data) => setLiveCompanyData(data));
  }, [stock.ticker]);

  useEffect(() => {
    if (livePriceData) {
      const calculatedVals = calculateProfitLoss(stock.orders, livePriceData.c);
      calculatedVals.ticker = stock.ticker;
      setCalculatedValsList((prevList) => [...prevList, calculatedVals]);
    }
  }, [livePriceData, stock.orders, setCalculatedValsList]);

  if (!liveCompanyData || !livePriceData) {
    return "Loading...";
  }

  const { logo } = liveCompanyData;
  const { profitLoss, isProfit, totalShares, currentTotalValue } = calculateProfitLoss(stock.orders, livePriceData.c);



  return (
    <StyledLink to="/stocks">
      <StockItemDiv onClick={() => handleStockClick(stock.ticker)}>
        <CompanyInfo>
          <StockTicker>{stock.ticker}</StockTicker>
          <StockName>{liveCompanyData.name}</StockName>
          <StockCurrentPrice>${livePriceData.c}</StockCurrentPrice><PriceChangePercent value={livePriceData.dp}> ({livePriceData.dp.toFixed(2)}%)  </PriceChangePercent>
        </CompanyInfo>
        <Logo src={logo} alt="company logo" />
        <PerformanceInfo>
          <StockTotalShares>{totalShares} Shares</StockTotalShares>
          <StockTotalValue>Total value: ${currentTotalValue.toFixed(2)}</StockTotalValue>
          <ProfitOrLoss isProfit={isProfit}>${Math.abs(profitLoss).toFixed(2)}</ProfitOrLoss>
        </PerformanceInfo>
      </StockItemDiv>
    </StyledLink>
  );
};


  const StockItemDiv = styled.div`
    border: 5px solid black;
    margin: 10px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
  
  const Logo = styled.img`
    width: 10%;
    height: 10%;
    border-radius: 50%;
  `;
  
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



