import React from "react";
import BuyPanel from "../components/BuyPanel";
import NewsPanel from "../components/NewsPanel";

const StockBox = () => {
    return ( 
        <>
        <h2>StockBox</h2>
        <p>Individual stock details here</p>
        <BuyPanel />
        <NewsPanel />
        </>
     );
}
 
export default StockBox;