import React, { useEffect, useState } from "react";
import styled from "styled-components";
import calculateProfitLoss from "../services/CalculateProfitOrLoss";

const StockItem = ({ stock }) => {
  const [livePriceData, setLivePriceData] = useState(null);
  const [liveCompanyData, setLiveCompanyData] = useState(null);

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
    font-size: 15px;
  `;

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
    color: ${props => (props.isProfit ? 'green' : 'red')};
    font-size: 20px;
    font-weight: bold;
    `;

  useEffect(() => {
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
    )
      .then((res) => res.json())
      .then((data) => setLivePriceData(data));
  }, []);

  useEffect(() => {
    fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${stock.ticker}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
    )
      .then((res) => res.json())
      .then((data) => setLiveCompanyData(data));
  }, []);

  if (!liveCompanyData || !livePriceData) {
    return "Loading...";
  }

  const { logo } = liveCompanyData;

  const caluculatedVals = calculateProfitLoss(stock.orders, livePriceData.c);

  const { profitLoss, isProfit, totalCost, totalRevenue, currentTotalValue } = caluculatedVals;

  return (
    <StockItemDiv>
        <CompanyInfo>
            <StockTicker>{stock.ticker}</StockTicker>
            <StockName>{liveCompanyData.name}</StockName>
            <StockCurrentPrice>Current price: {livePriceData.c}</StockCurrentPrice>
        </CompanyInfo>
            <Logo src={logo} alt="company logo" />
        <PerformanceInfo>
            <StockTotalShares>{stock.totalShares.toFixed(2)} Shares</StockTotalShares>
            <StockTotalValue>Total value: {currentTotalValue.toFixed(2)}</StockTotalValue>
            <ProfitOrLoss isProfit={isProfit}>{profitLoss.toFixed(2)}</ProfitOrLoss>
        </PerformanceInfo>
    </StockItemDiv>
  );
};

export default StockItem;
