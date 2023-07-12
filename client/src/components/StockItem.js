import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

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

  const StockTotalValue = styled.p`
  `;

  const Logo = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    `;

  useEffect(() => {
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
    )
      .then((res) => res.json())
      .then((data) => setLivePriceData(data));
  }, []);

  useEffect(() => {
    fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${stock.ticker}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
    )
        .then((res) => res.json())
        .then((data) => setLiveCompanyData(data));
    }, []);

    if (!liveCompanyData) {
        return ("Loading...")
      }

    const {logo} = liveCompanyData;

  return (
    <StockItemDiv>
        <Logo src={logo} alt="company logo" />
        <StockTicker>{stock.ticker}</StockTicker>
        <StockName>{liveCompanyData.name}</StockName>
        <StockTotalShares>{stock.totalShares}</StockTotalShares>
        <StockCurrentPrice>{"Current Price: " + livePriceData.c}</StockCurrentPrice>

    </StockItemDiv>
    
  );
};

export default StockItem;
