import React from "react";
import StockItem from "./StockItem";

const StockList = ({ portfolioStocks }) => {
  return (
    <>
      {/* map through portfolioStocks and create a StockItem for each one */}
      {portfolioStocks.map((stock) => {
        if (stock.totalShares <= 0){
            return null;
        }
        else{
            return <StockItem stock={stock}/>
        }
      })}
    </>
  );
};

export default StockList;
