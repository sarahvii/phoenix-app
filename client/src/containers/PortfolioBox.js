import React from "react";
import PieChart from "../components/PieChart";
import StockList from "../components/StockList";
import NewsPanel from "../components/NewsPanel";

const PortfolioBox = () => {
    return ( 
        <>
        <h2>PortfolioBox</h2>
        <PieChart/>
        <StockList/>
        <NewsPanel/>
        </>
     );
}
 
export default PortfolioBox;