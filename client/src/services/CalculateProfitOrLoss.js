const calculateProfitLoss = (orders, currentPrice) => {
    let totalShares = 0; // Total shares for each stock
    let totalCost = 0; // Total cost of buying shares
    let totalRevenue = 0; // Total revenue from selling shares
  
    for (const order of orders) {

      if (order.type === 'buy') {

        totalShares += order.sharesQuantity; 
        totalCost += order.sharesQuantity * order.pricePerShare; // Add the cost of buying the shares
      } else if (order.type === 'sell') {

        const sellShares = order.sharesQuantity; // Number of shares being sold
        const sellPrice = order.pricePerShare; // Price per share for the sell order
  
        if (totalShares >= sellShares) {
          totalShares -= sellShares; 
          totalRevenue += sellShares * sellPrice; // Add the revenue from selling the shares
        } else {
          totalRevenue += totalShares * sellPrice; // Add the revenue from selling all remaining shares
          totalShares = 0; // Set total shares to 0 as all shares have been sold
        }
      }
    }
  
    const currentTotalValue = totalShares * currentPrice; 
    const profitLoss = currentTotalValue - totalCost; 
    const isProfit = profitLoss > 0; 
  
    return {
      profitLoss,
      isProfit,
      totalShares,
      totalCost,
      totalRevenue,
      currentTotalValue,
    };
  };
  
  export default calculateProfitLoss;
  