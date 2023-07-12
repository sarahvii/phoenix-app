import React from "react";
import StockItem from "./StockItem";

const StockList = ({ portfolioStocks }) => {
  return (
    <>
      {/* map through portfolioStocks and create a StockItem for each one */}
      {portfolioStocks.map((stock) => {
        return <StockItem stock={stock} />;
      })}
    </>
  );
};

export default StockList;
