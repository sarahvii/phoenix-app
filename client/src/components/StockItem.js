import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

const StockItem = ({ stock }) => {
  const [livePriceData, setLivePriceData] = useState(null);

  const StockItemDiv = styled.div`
    border: 5px solid black;
    margin: 10px;
    padding: 10px;
  `;

  const StockName = styled.h3``;

  const StockTicker = styled.p``;

  const StockTotalShares = styled.p``;

  useEffect(() => {
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
    )
      .then((res) => res.json())
      .then((data) => setLivePriceData(data));
  }, []);

  return (
    <StockItemDiv>
        <h3>{stock.ticker}</h3>
        <p>{stock.stockName}</p>
        <p>{stock.totalShares}</p>
        <p>{"Current Price: " + livePriceData.c}</p>
    </StockItemDiv>
    
  );
};

export default StockItem;
