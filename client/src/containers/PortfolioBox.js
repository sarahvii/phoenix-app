import React from "react";
import PieChart from "../components/PieChart";
import StockList from "../components/StockList";
import NewsPanel from "../components/NewsPanel";

const PortfolioBox = ({portfolioStocks, setSelectedStock}) => {
    return ( 
        <>
        <h2>PortfolioBox</h2>
        <PieChart portfolioStocks={portfolioStocks}/>
        <StockList portfolioStocks={portfolioStocks} setSelectedStock={setSelectedStock}/>
        <NewsPanel containerType="portfolio" portfolioStocks={portfolioStocks}/>
        </>
     );
}
 
export default PortfolioBox;