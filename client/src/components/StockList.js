import React from "react";
import StockItem from "./StockItem";
import styled from "styled-components";

const StockList = ({ portfolioStocks, setSelectedStock, handleCalculatedValues }) => {
  const handleStockClick = (ticker) => {
    setSelectedStock(ticker);
    console.log("clicked ticker", ticker);
  };

  return (
    <>
      <Title>Owned Stocks</Title>
      {portfolioStocks.map((stock) => {
        if (stock.totalShares <= 0) {
          return null;
        } else {
          return (
            <StockItem
              key={stock.ticker}
              stock={stock}
              handleStockClick={handleStockClick}
              handleCalculatedValues={handleCalculatedValues}
            />
          );
        }
      })}
    </>
  );
};

const Title = styled.h2`
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export default StockList;
