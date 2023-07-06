import React from "react";
import StockItem from "./StockItem";

const StockList = () => {
    return ( 
        <>
        <p>List of stocks in portfolio</p>
        <StockItem/>
        <StockItem/>
        <StockItem/>
        </>
     );
}
 
export default StockList;