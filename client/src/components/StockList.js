import React from "react";
import StockItem from "./StockItem";

const StockList = ({ portfolioStocks, setSelectedStock }) => {

    const handleStockClick = (ticker) => {
        setSelectedStock(ticker);
        console.log("clicked ticker", ticker);
    }

  return (
    <>
      {/* map through portfolioStocks and create a StockItem for each one */}
      {portfolioStocks.map((stock) => {
        if (stock.totalShares <= 0){
            return null;
        }
        else{
            return <StockItem stock={stock} handleStockClick={handleStockClick} />
        }
      })}
    </>
  );
};

export default StockList;
