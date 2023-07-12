import React from "react";
import PieChart from "../components/PieChart";
import StockList from "../components/StockList";
import NewsPanel from "../components/NewsPanel";

const PortfolioBox = ({portfolioStocks}) => {
    return ( 
        <>
        <h2>PortfolioBox</h2>
        <PieChart/>
        <StockList portfolioStocks={portfolioStocks}/>
        <NewsPanel/>
        </>
     );
}
 
export default PortfolioBox;