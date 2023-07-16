import React, { useState } from 'react';

const BuyPanel = ({ currentPrice, stockName, stockTicker }) => {
  const [shares, setShares] = useState(0);

  const handleSharesChange = (event) => {
    setShares(event.target.value);
  };

  const handleStockTrade = async (event, type) => {
    event.preventDefault();
    const action = type === 'buy' ? 'buying' : 'selling';
    console.log(action, 'stock');
    // console.log('shares', shares);
    // console.log('currentPrice', currentPrice);
    // console.log('stockName', stockName);
    // console.log('stockTicker', stockTicker);

    const order = {
      sharesQuantity: parseInt(shares),
      date: new Date().toISOString().slice(0, 10),
      pricePerShare: currentPrice,
      type: type,
    };

    const data = {
      stockName: stockName,
      ticker: stockTicker,
      order: order,
    };

    try {
      const response = await fetch('http://localhost:9000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Stock', action, 'successfully');
        // Add any success handling here
      } else {
        console.error('Failed to', action, 'stock');
        // Add any error handling here
      }
    } catch (error) {
      console.error('Error while', action, 'stock:', error);
      // Add any error handling here
    }
  };

  return (
    <>
      <form id="buy_form">
        <label>
          Amount to buy:
          <input
            type="number"
            placeholder="0"
            name="shares"
            value={shares}
            onChange={handleSharesChange}
          />
        </label>
        <button type="submit" onClick={(e) => handleStockTrade(e, 'buy')}>
          Buy Stock
        </button>
        <button type="submit" onClick={(e) => handleStockTrade(e, 'sell')}>
          Sell Stock
        </button>
      </form>
    </>
  );
};

export default BuyPanel;
