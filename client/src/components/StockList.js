import React from "react";
import StockItem from "./StockItem";

const StockList = ({ portfolioStocks, setSelectedStock, handleCalculatedValues, toggleWatchList }) => {
  const handleStockClick = (ticker) => {
    setSelectedStock(ticker);
    console.log("clicked ticker", ticker);
  };

  return (
    <>
      {portfolioStocks.map((stock) => {
        if (stock.totalShares <= 0) {
          return null;
        } else {
          return (
            <StockItem
              stock={stock}
              handleStockClick={handleStockClick}
              handleCalculatedValues={handleCalculatedValues}
              toggleWatchList={toggleWatchList}
            />
          );
        }
      })}
    </>
  );
};

export default StockList;
