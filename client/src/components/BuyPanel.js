import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioContext from '../services/PortfolioContext';


const BuyPanel = ({currentPrice, stockName, stockTicker}) => {

  const [shares, setShares] = useState(0);
  const { portfolioData, setPortfolioData, shouldRefresh, setShouldRefresh } = useContext(PortfolioContext);
  const navigate = useNavigate();

  // useEffect(() => {   // added useEffect
  //   if (shouldRefresh) {
  //     fetchUpdatedPortfolioData();
  //     setShouldRefresh(false);
  //   }
  // }, [shouldRefresh]);

  useEffect(() => {
    setShouldRefresh(true);
  }, []); //added

  const handleSharesChange = (event) => {
    setShares(event.target.value);
  }

  // const fetchUpdatedPortfolioData = async () => {  // added fetch
  //   try {
  //     const response = await fetch('http://localhost:9000/api/orders');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setPortfolioData(data);
  //     }
  //     else {
  //       console.error('Failed to fetch updated portfolio data');
  //     }
  //   } catch (error) {
  //     console.error('Error while fetching updated porfolio data:', error);
  //   }
  // }

  const handleBuyStock = async (event) => {
    event.preventDefault();
    console.log("buying stock");
    console.log("shares", shares);
    console.log("currentPrice", currentPrice);
    console.log("stockName", stockName);
    console.log("stockTicker", stockTicker);
  
    const order = {
      sharesQuantity: parseInt(shares),
      date: new Date().toISOString().slice(0, 10),
      pricePerShare: currentPrice,
      type: "buy"
    };
  
    const data = {
      stockName: stockName,
      ticker: stockTicker,
      order: order
    };
  
    try {
      const response = await fetch("http://localhost:9000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        console.log("Stock bought successfully");
        setPortfolioData(data); // added
        setShouldRefresh(true); // added
        navigate("/portfolio")
        
        // Add any success handling here
      } else {
        console.error("Failed to buy stock");
        // Add any error handling here
      }
    } catch (error) {
      console.error("Error while buying stock:", error);
      // Add any error handling here
    }
  };
  
  const handleSellStock = async (event) => {
    event.preventDefault();
    console.log("selling stock");
    console.log("shares", shares);
    console.log("currentPrice", currentPrice);
    console.log("stockName", stockName);
    console.log("stockTicker", stockTicker);
  
    const order = {
      sharesQuantity: shares,
      date: new Date().toISOString().slice(0, 10),
      pricePerShare: currentPrice,
      type: "sell"
    };
  
    const data = {
      stockName: stockName,
      ticker: stockTicker,
      order: order
    };
  
    try {
      const response = await fetch("http://localhost:9000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        console.log("Stock sold successfully");
        setPortfolioData(data); // added
        setShouldRefresh(true); // added
        navigate("/portfolio")
        // Add any success handling here
      } else {
        console.error("Failed to sell stock");
        // Add any error handling here
      }
    } catch (error) {
      console.error("Error while selling stock:", error);
      // Add any error handling here
    }
  };
  

  return (
    <>
        <form id="buy_form">
            <label>Amount to buy:
                <input 
                type="number" 
                placeholder="0"
                name="shares" 
                value={shares}
                onChange={handleSharesChange}
                /> 
            </label>
            <button type="submit" onClick={handleBuyStock}>Buy Stock</button>
            <button type="submit" onClick={handleSellStock}>Sell Stock</button>
        </form>
    </>
  );
}

export default BuyPanel
