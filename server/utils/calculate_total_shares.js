const calculateTotalShares = stock => {
    let totalShares = 0;
    stock.orders.forEach(order => {
      if (order.type === "buy") {
        totalShares += order.sharesQuantity;
      } else {
        totalShares -= order.sharesQuantity;
      }
    });
    return totalShares;
  };

  module.exports = calculateTotalShares;
