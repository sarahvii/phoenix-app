import React, { useState, useEffect } from "react";

import BuyPanel from "../components/BuyPanel";
import NewsPanel from "../components/NewsPanel";

const StockBox = ({selectedStock}) => {

    const [livePriceData, setLivePriceData] = useState(null);
    const [liveCompanyData, setLiveCompanyData] = useState(null);
  
  
    useEffect(() => {
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${selectedStock}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
      )
        .then((res) => res.json())
        .then((data) => setLivePriceData(data));
        console.log("live price data in StockBox", livePriceData);
    }, [selectedStock]);
  
    useEffect(() => {
      fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${selectedStock}&token=cim0421r01qucvvrg00gcim0421r01qucvvrg010`
      )
        .then((res) => res.json())
        .then((data) => setLiveCompanyData(data));
        console.log("live company data in StockBox", liveCompanyData);
    }, [selectedStock]);
  
    if (!liveCompanyData || !livePriceData) {
      return "Loading...";
    }
  
    const { logo } = liveCompanyData;

    return ( 
        <>
        <h2>StockBox</h2>
        <p>{liveCompanyData.name}</p>
        <p>{selectedStock}</p>
        <BuyPanel />
        <NewsPanel containerType="stock" />
        </>
     );
}
 
export default StockBox;